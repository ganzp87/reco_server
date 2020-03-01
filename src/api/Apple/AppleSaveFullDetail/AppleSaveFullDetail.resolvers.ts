import appStore from "app-store-scraper"
import {
	AppleSaveFullDetailResponse,
	AppleSaveFullDetailQueryArgs
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
	Query: {
		AppleSaveFullDetail: async (
			_,
			arg: AppleSaveFullDetailQueryArgs
		): Promise<AppleSaveFullDetailResponse> => {
			const { id } = arg
			try {
				const appStoreResult = await appStore.app({
					id,
					throttle: 10,
					country: "us",
					ratings: true
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
