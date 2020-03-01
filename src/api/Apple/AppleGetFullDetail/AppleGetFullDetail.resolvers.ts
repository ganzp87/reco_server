import {
	AppleGetFullDetailResponse,
	AppleGetFullDetailQueryArgs
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"
import AppleApp from "../../../entities/AppleApp"
import appStore from "app-store-scraper"

const resolvers: Resolvers = {
	Query: {
		AppleGetFullDetail: async (
			_,
			arg: AppleGetFullDetailQueryArgs
		): Promise<AppleGetFullDetailResponse> => {
			const { appId, country } = arg
			try {
				const commentsContainer: any = []
				const appStoreResult: AppleApp = await appStore.app({
					appId,
					country,
					ratings: true
				})
				const appReviews = await appStore.reviews({
					appId,
					sort: appStore.sort.HELPFUL,
					country,
					page: 1
				})
				for (const comment of appReviews) {
					commentsContainer.push(comment.text)
				}
				// const appStoreResult:
				// 	| AppleApp
				// 	| undefined = await AppleApp.findOne({
				// 	appId,
				// 	country,
				// 	language,
				// 	category
				// })
				appStoreResult.comments = commentsContainer
				if (appStoreResult) {
					return {
						appleApp: appStoreResult,
						error: null
					}
				} else {
					return {
						appleApp: null,
						error: "Cant get full detail of the app"
					}
				}
			} catch (error) {
				return {
					appleApp: null,
					error: error.message
				}
			}
		}
	}
}

export default resolvers
