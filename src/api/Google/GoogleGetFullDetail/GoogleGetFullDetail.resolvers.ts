import {
	GoogleGetFullDetailResponse,
	GoogleGetFullDetailQueryArgs
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"
import GoogleApp from "../../../entities/GoogleApp"

const resolvers: Resolvers = {
	Query: {
		GoogleGetFullDetail: async (
			_,
			args: GoogleGetFullDetailQueryArgs
		): Promise<GoogleGetFullDetailResponse> => {
			try {
				const { appId, country, language, category } = args
				const gPlayResult:
					| GoogleApp
					| undefined = await GoogleApp.findOne({
					appId,
					country,
					language,
					category
				})
				if (gPlayResult) {
					return {
						googleApp: gPlayResult,
						error: null
					}
				} else {
					return {
						googleApp: null,
						error: "Cant get full detail of the app"
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
