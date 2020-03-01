import {
	AppleGetFullDetailResponse,
	AppleGetFullDetailQueryArgs
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"
import AppleApp from "../../../entities/AppleApp"

const resolvers: Resolvers = {
	Query: {
		AppleGetFullDetail: async (
			_,
			arg: AppleGetFullDetailQueryArgs
		): Promise<AppleGetFullDetailResponse> => {
			const { appId, country, language, category } = arg
			try {
				const appStoreResult:
					| AppleApp
					| undefined = await AppleApp.findOne({
					appId,
					country,
					language,
					category
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
