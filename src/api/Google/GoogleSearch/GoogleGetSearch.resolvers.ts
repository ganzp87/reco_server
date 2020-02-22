import {
	GoogleGetSearchResponse,
	GoogleGetSearchQueryArgs
} from "../../../types/graphql"
import gplay from "google-play-scraper"
import { Resolvers } from "../../../types/resolvers"
import genres from "../../../raw/googleGenres.json"
import GoogleApp from "../../../entities/GoogleApp"
// import { cleanNullArg } from "../../../utils/cleanNullArg"
// import { getConnection } from "typeorm"

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
				const { category, language, country } = args
				const gPlayResult: [GoogleApp] = await gplay.search({
					term: args.searchWords,
					num: 250,
					lang: args.language,
					country,
					throttle: 10
				})

				const gPlayRevisedResult: [GoogleApp] | any[] = []
				await filterAsync(
					gPlayResult,
					async (app: { appId: any; genre: string | string[] }) => {
						const appId = app.appId
						const getFullDetailApp: GoogleApp = await gplay.app({
							appId
						})
						const installs = getFullDetailApp.minInstalls
						const reviews = getFullDetailApp.reviews
						const scoreText = getFullDetailApp.scoreText
						const summary = getFullDetailApp.summary
						const genreId = getFullDetailApp.genreId!.split("_")[0]
						getFullDetailApp.language = language
						getFullDetailApp.country = country
						getFullDetailApp.category = category
						if (
							installs! < 100000 ||
							reviews == null ||
							reviews! < 1000 ||
							scoreText! < "3.5"
						) {
							return false
						} else {
							const summaryResult = genres.summary[
								`${category}`
							].some((substr) => summary?.includes(substr))
							if (summaryResult) {
								return true
							}
							const genresResult = genres.genreId[
								`${category}`
							].map((item) => {
								if (genreId.includes(item)) {
									return true
								} else {
									return false
								}
							})

							if (genresResult.includes(true)) {
								return false
							} else {
								const googleApp:
									| GoogleApp
									| undefined = await GoogleApp.findOne({
									appId
								})
								if (
									googleApp?.country === country &&
									googleApp.language === language &&
									googleApp.category === category
								) {
									await GoogleApp.update(
										{
											appId,
											country: googleApp.country,
											language: googleApp.language,
											category: googleApp.category
										},
										{
											title: getFullDetailApp.title,
											url: getFullDetailApp.url,
											description:
												getFullDetailApp.description,
											summary: getFullDetailApp.summary,
											installs: getFullDetailApp.installs,
											icon: getFullDetailApp.icon,
											score: getFullDetailApp.score,
											scoreText:
												getFullDetailApp.scoreText,
											reviews: getFullDetailApp.reviews,
											ratings: getFullDetailApp.ratings,
											screenshots:
												getFullDetailApp.screenshots,
											genre: getFullDetailApp.genre,
											genreId: getFullDetailApp.genreId,
											comments: getFullDetailApp.comments
										}
									)
								} else {
									await GoogleApp.create({
										...getFullDetailApp
									}).save()
								}
								gPlayRevisedResult.push(getFullDetailApp)
								return true
							}
						}
					}
				)

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
