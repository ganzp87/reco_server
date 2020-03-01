import {
	GoogleSaveSearchAllQueryArgs,
	GoogleSaveSearchAllResponse
} from "../../../types/graphql"
import gplay from "google-play-scraper"
import { Resolvers } from "../../../types/resolvers"
import GoogleApp from "../../../entities/GoogleApp"
import {
	translatedCategories,
	googleCountries,
	googleGenre
} from "../../../raw/GlobalConstants"

function mapAsync(array, callbackfn) {
	return Promise.all(array.map(callbackfn))
}

async function filterAsync(array, callbackfn) {
	const filterMap = await mapAsync(array, callbackfn)
	return array.filter((value, index) => filterMap[index])
}

const updateAppInfo = async (
	gPlayRevisedResult,
	app: GoogleApp,
	language,
	country,
	category
) => {
	const appId = app.appId
	const reviews = app.reviews
	const score = app.score
	const primaryGenre = app.genreId
	const description = app.description
	const ratings = app.ratings
	app.language = language
	app.country = country
	app.category = category
	if (score > 3.5) {
		if (reviews < 500 && ratings < 500) {
			return false
		} else {
			const summaryResult = googleGenre.summary[
				`${category}`
			].some((substr) => description?.includes(substr))
			if (summaryResult) {
				return false
			}
			const googleGenreResult = googleGenre.genreId[`${category}`].map(
				(item) => {
					if (primaryGenre.includes(item)) {
						return true
					} else {
						return false
					}
				}
			)
			if (!googleGenreResult.includes(true)) {
				return false
			} else {
				const googleApp:
					| GoogleApp
					| undefined = await GoogleApp.findOne({
					appId,
					country: app.country,
					language: app.language,
					category: app.category
				})
				if (googleApp) {
					await GoogleApp.update(
						{
							appId,
							country: googleApp.country,
							language: googleApp.language,
							category: googleApp.category
						},
						{
							title: app.title,
							url: app.url,
							description: app.description,
							summary: app.summary,
							installs: app.installs,
							icon: app.icon,
							score: app.score,
							scoreText: app.scoreText,
							reviews: app.reviews,
							ratings: app.ratings,
							screenshots: app.screenshots,
							genre: app.genre,
							genreId: app.genreId,
							comments: app.comments
						}
					)
				} else {
					await GoogleApp.create({
						...app
					}).save()
				}
				gPlayRevisedResult.push(app)
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
	let appStoreResult: GoogleApp[] = []
	const appIdContainer: any[] = []
	const gPlayRevisedResult: [GoogleApp] | any[] = []
	try {
		appStoreResult = await gplay.search({
			term: searchWords,
			num: 250,
			lang: language,
			country,
			throttle: 10,
			fullDetail: true
		})
		searchTotalcounts = searchTotalcounts + appStoreResult.length
		console.log(
			`\n\n🚀  searching ${searchWords} in ${country}, ${language} ===>>> search : ${appStoreResult.length} / total search : ${searchTotalcounts}\n\n\n`
		)
		await new Promise((r) => setTimeout(r, 2000))
		await filterAsync(appStoreResult, async (app) => {
			const appId = app.appId
			if (appIdContainer.includes(appId)) {
				console.log(appId)
				return false
			} else {
				appIdContainer.push(appId)
				try {
					return await updateAppInfo(
						gPlayRevisedResult,
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
		return gPlayRevisedResult
	} catch (error) {
		console.log(
			"\n\n\n  ❌❌❌ appStore Search Error : There are no apps\n\n"
		)
		await new Promise((r) => setTimeout(r, 1000))
		return gPlayRevisedResult
	}
}

const resolvers: Resolvers = {
	Query: {
		GoogleSaveSearchAll: async (
			_,
			args: GoogleSaveSearchAllQueryArgs,
			__
		): Promise<GoogleSaveSearchAllResponse> => {
			const { category } = args
			const searchContainer: string[] = []
			let searchCount: number = 0
			try {
				let gPlayRevisedResult: GoogleApp[] = []
				const translateList = translatedCategories
				for (const key in translateList) {
					if (translateList.hasOwnProperty(key)) {
						const categoryKey = key
						if (category !== undefined) {
							if (category === categoryKey) {
								const categoryValue = translateList[key]
								for (const lang in categoryValue) {
									if (categoryValue.hasOwnProperty(lang)) {
										for (const countryKey in googleCountries) {
											if (
												googleCountries.hasOwnProperty(
													countryKey
												) &&
												countryKey === lang
											) {
												const searchWordsGroup =
													categoryValue[lang]
												const subCountry =
													googleCountries[countryKey]
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
															gPlayRevisedResult = await searchFn(
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
									for (const countryKey in googleCountries) {
										if (
											googleCountries.hasOwnProperty(
												countryKey
											) &&
											countryKey === lang
										) {
											const searchWordsGroup =
												categoryValue[lang]
											const subCountry =
												googleCountries[countryKey]
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
														// console.log(
														// 	searchContainer
														// )
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
														gPlayRevisedResult = await searchFn(
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
				if (gPlayRevisedResult) {
					return {
						googleApp: gPlayRevisedResult,
						error: null
					}
				} else {
					return {
						googleApp: null,
						error: "Cant find that search result"
					}
				}
			} catch (error) {
				return {
					googleApp: null,
					error: error.message
				}
			}
		}
	}
}

export default resolvers
