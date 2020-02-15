import appStore from "app-store-scraper"
import { AppleGetFullDetailResponse } from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
	Query: {
		AppleGetFullDetail: async (): Promise<AppleGetFullDetailResponse> => {
			try {
				const appStoreResult = await appStore.app({
					id: "553834731"
				})
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
