import {
	GoogleSaveSearchQueryArgs,
	GoogleSaveSearchResponse
} from "../../../types/graphql"
import gplay from "google-play-scraper"
import { Resolvers } from "../../../types/resolvers"
import GoogleApp from "../../../entities/GoogleApp"
import { googleGenre } from "../../../raw/GlobalConstants"

function mapAsync(array, callbackfn) {
	return Promise.all(array.map(callbackfn))
}

async function filterAsync(array, callbackfn) {
	const filterMap = await mapAsync(array, callbackfn)
	return array.filter((value, index) => filterMap[index])
}

const resolvers: Resolvers = {
	Query: {
		GoogleSaveSearch: async (
			_,
			args: GoogleSaveSearchQueryArgs,
			__
		): Promise<GoogleSaveSearchResponse> => {
			try {
				const { category, language, country } = args
				const gPlayResult: [GoogleApp] = await gplay.search({
					term: args.searchWords,
					num: 250,
					lang: args.language,
					country,
					throttle: 10,
					fullDetail: true
				})
				const appIdContainer: any[] = []
				const gPlayRevisedResult: [GoogleApp] | any[] = []
				await filterAsync(gPlayResult, async (app: GoogleApp) => {
					const appId = app.appId
					if (appIdContainer.includes(appId)) {
						console.log(appId)
						return false
					} else {
						appIdContainer.push(appId)
						const installs = app.minInstalls
						const reviews = app.reviews
						const scoreText = app.scoreText
						const summary = app.summary
						const genreId = app.genreId
						app.language = language
						app.country = country
						app.category = category
						if (
							installs! < 100000 ||
							reviews == null ||
							reviews! < 1000 ||
							scoreText! < "3.5"
						) {
							return false
						} else {
							const summaryResult = googleGenre.summary[
								`${category}`
							].some((substr) => summary?.includes(substr))
							if (summaryResult) {
								return true
							}
							const googleGenreResult = googleGenre.genreId[
								`${category}`
							].map((item) => {
								if (genreId.includes(item)) {
									return true
								} else {
									return false
								}
							})
							if (!googleGenreResult.includes(true)) {
								return false
							} else {
								const googleApp:
									| GoogleApp
									| undefined = await GoogleApp.findOne({
									appId,
									country,
									language,
									category
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
					}
				})

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
