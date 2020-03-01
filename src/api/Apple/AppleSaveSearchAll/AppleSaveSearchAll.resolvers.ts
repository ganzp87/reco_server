import {
	AppleSaveSearchAllResponse,
	AppleSaveSearchQueryArgs
} from "../../../types/graphql"
import appStore from "app-store-scraper"
import { Resolvers } from "../../../types/resolvers"
import {
	appleCountries,
	translatedCategories
} from "../../../raw/GlobalConstants"
import genres from "../../../raw/AppleGenres.json"
import AppleApp from "../../../entities/AppleApp"
// import executeTranslator from "../../../utils/executeTranslator"

function mapAsync(array, callbackfn) {
	return Promise.all(array.map(callbackfn))
}

async function filterAsync(array, callbackfn) {
	const filterMap = await mapAsync(array, callbackfn)
	return array.filter((value, index) => filterMap[index])
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
			const summaryResult = genres.summary[`${category}`].some((substr) =>
				description?.includes(substr)
			)
			if (summaryResult) {
				return false
			}
			const genresResult = genres.primaryGenre[`${category}`].map(
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
				const appleApp = await AppleApp.findOne({
					id
				})
				if (appleApp) {
					await AppleApp.update(
						{
							id,
							country: appleApp.country,
							language: appleApp.language,
							category: appleApp.category
						},
						{
							title: app.title,
							url: app.url,
							description: app.description,
							icon: app.icon,
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
					await AppleApp.create({
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
					// const getFullDetailApp: AppleApp = await appStore.app({
					// 	id,
					// 	country,
					// 	lang: language,
					// 	ratings: true
					// })
					return await updateAppInfo(
						appStoreRevisedResult,
						app,
						language,
						country,
						category
					)
				} catch (error) {
					console.log(`❌❌❌ appStore Revised Error`)
					failureSearchThings.push(
						`Failure search things ==>> category : ${category}, searchWords : ${searchWords}, country : ${country}, language : ${language} `
					)
					await new Promise((r) => setTimeout(r, 1000))
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

const resolvers: Resolvers = {
	Query: {
		AppleSaveSearchAll: async (
			_,
			arg: AppleSaveSearchQueryArgs
		): Promise<AppleSaveSearchAllResponse> => {
			const { category } = arg
			const searchContainer: string[] = []
			let searchCount: number = 0
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
														if (
															searchContainer.includes(
																`${category}${language}${country}${searchWords}`
															)
														) {
															console.log(
																`Already searched : ${category}/${language}/${country}/${searchWords}`
															)
														} else {
															searchContainer.push(
																`${category}${language}${country}${searchWords}`
															)
															searchCount++
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
													if (
														searchContainer.includes(
															`${categoryKey} / ${language} / ${country} / ${searchWords}`
														)
													) {
														console.log(
															`Already searched : ${categoryKey} / ${language} / ${country} / ${searchWords}`
														)
													} else {
														searchContainer.push(
															`${categoryKey} / ${language} / ${country} / ${searchWords}`
														)
														searchCount++
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
