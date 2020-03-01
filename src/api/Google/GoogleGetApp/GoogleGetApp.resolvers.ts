import {
	GoogleGetAppQueryArgs,
	GoogleGetAppResponse
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"
import GoogleApp from "../../../entities/GoogleApp"

const resolvers: Resolvers = {
	Query: {
		GoogleGetApp: async (
			_,
			args: GoogleGetAppQueryArgs,
			__
		): Promise<GoogleGetAppResponse> => {
			const { category, language, country } = args
			try {
				const googleApp: GoogleApp[] = await GoogleApp.find({
					category,
					language,
					country
				})
				return {
					googleApp,
					error: null
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
