import {
	AppleGetAppQueryArgs,
	AppleGetAppResponse
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"
import AppleApp from "../../../entities/AppleApp"

const resolvers: Resolvers = {
	Query: {
		AppleGetApp: async (
			_,
			args: AppleGetAppQueryArgs,
			__
		): Promise<AppleGetAppResponse> => {
			const { category, language, country } = args
			try {
				const appleApp: AppleApp[] = await AppleApp.find({
					category,
					language,
					country
				})
				return {
					appleApp,
					error: null
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
