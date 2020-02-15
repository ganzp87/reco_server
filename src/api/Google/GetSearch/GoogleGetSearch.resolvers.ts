import {
	GoogleGetSearchResponse,
	GoogleGetSearchQueryArgs,
	GoogleApp
} from "../../../types/graphql"
import gplay from "google-play-scraper"
import { Resolvers } from "../../../types/resolvers"
import genres from "../../../data/genres.json"

function mapAsync(array, callbackfn) {
	return Promise.all(array.map(callbackfn))
}

async function filterAsync(array, callbackfn) {
	const filterMap = await mapAsync(array, callbackfn)
	return array.filter((value, index) => filterMap[index])
}

const resolvers: Resolvers = {
	Query: {
		GoogleGetSearch: async (
			_,
			args: GoogleGetSearchQueryArgs,
			__
		): Promise<GoogleGetSearchResponse> => {
			try {
				const gPlayResult: [GoogleApp] = await gplay.search({
					term: args.searchWords,
					num: 20,
					lang: args.language,
					country: args.country
				})

				//#region  ////////// Adding Installs, Reviews ////////////
				// let i = 0
				// for (const app of gPlayResult) {
				// 	const appId = app.appId
				// 	const getFullDetailApp = await gplay.app({
				// 		appId
				// 	})
				// 	const installs = getFullDetailApp.minInstalls
				// 	const reviews = getFullDetailApp.reviews
				// 	if (
				// 		installs < 100000 ||
				// 		reviews == null ||
				// 		reviews! < 1000
				// 	) {
				// 		// delete gPlayResult[key]
				// 	} else {
				// 		const result = genres.food.map((item) => {
				// 			if (app.genre?.includes(item)) {
				// 				return true
				// 			} else {
				// 				return false
				// 			}
				// 		})
				// 		if (result.includes(true)) {
				// 			// delete gPlayResult[key]
				// 		}
				// 		gPlayResult[i].installs = installs
				// 		gPlayResult[i].reviews = reviews
				// 		console.log(installs, reviews)
				// 		i = i + 1
				// 	}
				// }
				//#endregion

				const gPlayRevisedResult: [GoogleApp] = await filterAsync(
					gPlayResult,
					async (app) => {
						const appId = app.appId
						const getFullDetailApp = await gplay.app({
							appId
						})
						const installs = getFullDetailApp.minInstalls
						const reviews = getFullDetailApp.reviews
						const scoreText = getFullDetailApp.scoreText
						if (
							installs < 100000 ||
							reviews == null ||
							scoreText == null ||
							reviews! < 1000
						) {
							return false
						} else {
							const result = genres.food.map((item) => {
								if (app.genre?.includes(item)) {
									return true
								} else {
									return false
								}
							})
							if (result.includes(true)) {
								return false
							} else {
								// console.log(installs, reviews, scoreText)
								return true
							}
						}
					}
				)
				// console.log(gPlayRevisedResult)
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
