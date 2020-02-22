import {
	AppleGetSearchResponse,
	AppleGetSearchQueryArgs
} from "../../../types/graphql"
import appStore from "app-store-scraper"
import { Resolvers } from "../../../types/resolvers"
import genres from "../../../data/googleGenres.json"
import AppleApp from "../../../entities/AppleApp"
import { cleanNullArg } from "../../../utils/cleanNullArg"

function mapAsync(array, callbackfn) {
	return Promise.all(array.map(callbackfn))
}

async function filterAsync(array, callbackfn) {
	const filterMap = await mapAsync(array, callbackfn)
	return array.filter((value, index) => filterMap[index])
}

const resolvers: Resolvers = {
	Query: {
		AppleGetSearch: async (
			_,
			args: AppleGetSearchQueryArgs,
			__
		): Promise<AppleGetSearchResponse> => {
			try {
				const { category, language, country } = args
				const appStoreResult: [AppleApp] = await appStore.search({
					term: args.searchWords,
					num: 100,
					page: 1,
					country: args.country,
					lang: args.language,
					throttle: 10
				})

				const appStoreRevisedResult: [AppleApp] | any[] = []
				await filterAsync(appStoreResult, async (app) => {
					const id = app.id
					const getFullDetailApp: AppleApp = await appStore.app({
						id
					})
					const reviews = getFullDetailApp.reviews
					const score = getFullDetailApp.score
					const genreId = getFullDetailApp.primaryGenre
					const description = getFullDetailApp.description
					getFullDetailApp.language = language
					getFullDetailApp.country = country
					getFullDetailApp.category = category
					if (reviews == null || reviews! < 1000 || score! < 3.5) {
						return false
					} else {
						const summaryResult = genres.summary[
							`${category}`
						].some((substr) => description?.includes(substr))
						if (summaryResult) {
							return true
						}
						const genresResult = genres.genreId[`${category}`].map(
							(item) => {
								if (genreId.includes(item)) {
									return true
								} else {
									return false
								}
							}
						)
						if (genresResult.includes(true)) {
							return false
						} else {
							const appleApp = await AppleApp.findOne({
								id
							})
							if (appleApp) {
								const notNull: any = cleanNullArg(appleApp)
								await AppleApp.update({ id }, { ...notNull })
							} else {
								await AppleApp.create({
									...getFullDetailApp
								}).save()
							}
							appStoreRevisedResult.push(getFullDetailApp)
							return true
						}
					}
				})

				if (appStoreResult) {
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
