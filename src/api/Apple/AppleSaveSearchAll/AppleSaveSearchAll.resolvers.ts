import {
	AppleSaveSearchAllResponse,
	AppleSaveSearchQueryArgs,
	// JSON,
	LangContainer
} from "../../../types/graphql"
import appStore from "app-store-scraper"
import { Resolvers } from "../../../types/resolvers"
import {
	appleCountries,
	translatedCategories,
	appleGenre
} from "../../../raw/GlobalConstants"
import AppleApp from "../../../entities/AppleApp"

function mapAsync(array, callbackfn) {
	return Promise.all(array.map(callbackfn))
}

async function filterAsync(array, callbackfn) {
	const filterMap = await mapAsync(array, callbackfn)
	return array.filter((value, index) => filterMap[index])
}

function uniqBy(a, key) {
	const seen = {}
	return a.filter((item) => {
		const k = key(item)
		return seen.hasOwnProperty(k) ? false : (seen[k] = true)
	})
}

const updateAppInfo = async (
	appStoreRevisedResult,
	app: AppleApp,
	language,
	country,
	category
) => {
	const id = app.id
	const reviews = app.reviews
	const score = app.score
	const primaryGenre = app.primaryGenre
	const description = app.description
	// const ratings = app.ratings
	app.language = language
	app.country = country
	app.category = category
	if (score > 3.5) {
		if (reviews < 500) {
			return false
		} else {
			const summaryResult = appleGenre.summary[
				`${category}`
			].some((substr) => description?.includes(substr))
			if (summaryResult) {
				return false
			}
			const genresResult = appleGenre.primaryGenre[`${category}`].map(
				(item) => {
					if (primaryGenre.includes(item)) {
						return true
					} else {
						return false
					}
				}
			)
			if (!genresResult.includes(true)) {
				return false
			} else {
				let langcountryListString: string
				const langCountryContainer = new Array()
				const thisLangCountry: LangContainer = {
					language,
					country,
					category
				}
				langCountryContainer.push(thisLangCountry)

				const appleApp: AppleApp | undefined = await AppleApp.findOne({
					id
				})
				if (appleApp) {
					// console.log("uniqBy-1")
					langcountryListString = appleApp.langCountry
					// console.log(langcountryListString)
					const parsedContainer = JSON.parse(langcountryListString)
					const langcountryListUniqq = uniqBy(
						parsedContainer,
						JSON.stringify
					)
					// console.log(langcountryListUniqq)
					let i = 0
					for (const item of langcountryListUniqq) {
						let parsedItem
						try {
							parsedItem = JSON.parse(item)
						} catch (error) {
							parsedItem = item
						}
						langcountryListUniqq[i] = parsedItem
						i++
					}
					// console.log(langcountryListUniqq)

					for (const item of langcountryListUniqq) {
						let parsedItem
						try {
							parsedItem = JSON.parse(item)
						} catch (error) {
							parsedItem = item
						}
						if (!langCountryContainer.includes(parsedItem)) {
							// console.log(appleApp.title, parsedItem)
							langCountryContainer.push(item)
						}
					}
					const langcountryListUniq = uniqBy(
						langCountryContainer,
						JSON.stringify
					)
					// console.log("uniqBy-2")
					// console.log(langcountryListUniq)
					await AppleApp.update(
						{
							id
						},
						{
							title: app.title,
							url: app.url,
							description: app.description,
							icon: app.icon,
							langCountry: JSON.stringify(langcountryListUniq),
							country: app.country,
							language: app.language,
							category: app.category,
							languages: app.languages,
							developer: app.developer,
							score: app.score,
							ratings: app.ratings,
							reviews: app.reviews,
							currentVersionReviews: app.currentVersionReviews,
							screenshots: app.screenshots,
							genres: app.genres,
							primaryGenre: app.primaryGenre
						}
					)
				} else {
					const langcountryListUniq = uniqBy(
						langCountryContainer,
						JSON.stringify
					)
					await AppleApp.create({
						langCountry: JSON.stringify(langcountryListUniq),
						...app
					}).save()
				}
				appStoreRevisedResult.push(app)
				return true
			}
		}
	} else {
		return false
	}
}

const failureSearchThings: string[] = []
let searchTotalcounts: number = 0

const searchFn = async (category, language, country, searchWords) => {
	let appStoreResult: AppleApp[] = []
	const appIdContainer: any[] = []
	const appStoreRevisedResult: [AppleApp] | any[] = []
	try {
		appStoreResult = await appStore.search({
			term: searchWords,
			num: 100,
			page: 1,
			country,
			lang: language
		})
		searchTotalcounts = searchTotalcounts + appStoreResult.length
		console.log(
			`\n\n🚀  searching ${searchWords} in ${country}, ${language} ===>>> search : ${appStoreResult.length} / total search : ${searchTotalcounts}\n\n\n`
		)
		await new Promise((r) => setTimeout(r, 2000))
		await filterAsync(appStoreResult, async (app) => {
			const id = app.id
			if (appIdContainer.includes(id)) {
				return false
			} else {
				appIdContainer.push(id)
				try {
					return await updateAppInfo(
						appStoreRevisedResult,
						app,
						language,
						country,
						category
					)
				} catch (error) {
					console.log(`❌❌❌ appStore Revised Error : ${error}`)
					failureSearchThings.push(
						`Failure search things ==>> category : ${category}, searchWords : ${searchWords}, country : ${country}, language : ${language} `
					)
					// await new Promise((r) => setTimeout(r, 1000))
					return false
				}
			}
		})
		return appStoreRevisedResult
	} catch (error) {
		console.log(
			"\n\n\n  ❌❌❌ appStore Search Error : There are no apps\n\n"
		)
		await new Promise((r) => setTimeout(r, 1000))
		return appStoreRevisedResult
	}
}

let searchCount: number = 0
let beforeSearchCount: number = 0
let searchContainer: string = ""

const resolvers: Resolvers = {
	Query: {
		AppleSaveSearchAll: async (
			_,
			arg: AppleSaveSearchQueryArgs
		): Promise<AppleSaveSearchAllResponse> => {
			const { category } = arg
			try {
				let appStoreRevisedResult: AppleApp[] = []
				const translateList = translatedCategories
				for (const key in translateList) {
					if (translateList.hasOwnProperty(key)) {
						const categoryKey = key
						if (category !== undefined) {
							if (category === categoryKey) {
								const categoryValue = translateList[key]
								for (const lang in categoryValue) {
									if (categoryValue.hasOwnProperty(lang)) {
										for (const countryKey in appleCountries) {
											if (
												appleCountries.hasOwnProperty(
													countryKey
												) &&
												countryKey === lang
											) {
												const searchWordsGroup =
													categoryValue[lang]
												const subCountry =
													appleCountries[countryKey]
												for (const searchWords of searchWordsGroup) {
													for (const country of subCountry) {
														const language = lang
														const searchThing = `/${category}/${language}/${country}/${searchWords}`
														if (
															searchContainer.includes(
																searchThing
															)
														) {
															console.log(
																`Already searched : ${category}/${language}/${country}/${searchWords}`
															)
														} else {
															searchContainer =
																searchContainer +
																searchThing
															beforeSearchCount = searchCount
															searchCount++
															if (
																searchCount >
																beforeSearchCount
															) {
																console.log(
																	"\n\n\n",
																	"Searching... ",
																	category,
																	language,
																	country,
																	searchWords,
																	searchCount,
																	"\n\n"
																)
																appStoreRevisedResult = await searchFn(
																	category,
																	language,
																	country,
																	searchWords
																)
																console.log(
																	"Next country"
																)
															}
														}
													}
													console.log(
														"Next searchWord"
													)
												}
											}
										}
									}
								}
							} else {
								console.log("Next Category")
							}
						} else {
							const categoryValue = translateList[key]
							for (const lang in categoryValue) {
								if (categoryValue.hasOwnProperty(lang)) {
									for (const countryKey in appleCountries) {
										if (
											appleCountries.hasOwnProperty(
												countryKey
											) &&
											countryKey === lang
										) {
											const searchWordsGroup =
												categoryValue[lang]
											const subCountry =
												appleCountries[countryKey]
											for (const searchWords of searchWordsGroup) {
												for (const country of subCountry) {
													const language = lang
													const searchThing = `/${categoryKey}/${language}/${country}/${searchWords}`
													if (
														searchContainer.includes(
															searchThing
														)
													) {
														console.log(
															`Already searched : ${categoryKey}/${language}/${country}/${searchWords}`
														)
													} else {
														searchContainer =
															searchContainer +
															searchThing
														beforeSearchCount = searchCount
														searchCount++
														if (
															searchCount >
															beforeSearchCount
														) {
															console.log(
																"\n\n\n",
																"Searching... ",
																categoryKey,
																language,
																country,
																searchWords,
																searchCount,
																"\n\n"
															)
															appStoreRevisedResult = await searchFn(
																categoryKey,
																language,
																country,
																searchWords
															)
															console.log(
																"Next country"
															)
														}
													}
													console.log("Next country")
												}
												console.log("Next searchWord")
											}
										}
									}
								}
							}
						}
					}
				}
				console.log("⬇️ failure Search Things.... ⬇️")
				console.log(failureSearchThings)
				console.log("\n\n Finish Ssearch \n\n")
				if (appStoreRevisedResult) {
					return {
						appleApps: appStoreRevisedResult,
						error: null
					}
				} else {
					return {
						appleApps: null,
						error: "Cant Find appleApps"
					}
				}
			} catch (error) {
				return {
					appleApps: null,
					error: error.message
				}
			}
		}
	}
}

export default resolvers
