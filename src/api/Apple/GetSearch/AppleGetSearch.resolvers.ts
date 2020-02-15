import {
	AppleGetSearchResponse,
	AppleGetSearchQueryArgs,
	AppleApp
} from "../../../types/graphql"
import appStore from "app-store-scraper"
import { Resolvers } from "../../../types/resolvers"
import genres from "../../../data/genres.json"

const resolvers: Resolvers = {
	Query: {
		AppleGetSearch: async (
			_,
			args: AppleGetSearchQueryArgs,
			__
		): Promise<AppleGetSearchResponse> => {
			try {
				const appStoreResult: AppleApp[] = await appStore.search({
					term: args.searchWords,
					num: 100,
					page: 1,
					country: args.country,
					lang: args.language
				})

				const appStoreRevisedResult = appStoreResult.filter((app) => {
					const result = genres.food.map((item) => {
						if (app.genres?.includes(item)) {
							return true
						} else {
							return false
						}
					})
					if (result.includes(true)) {
						return false
					}
					// console.log(result)
					if (app.reviews == null || app.score == null) {
						return false
					} else {
						if (app.reviews! < 5000) {
							return false
						} else {
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
