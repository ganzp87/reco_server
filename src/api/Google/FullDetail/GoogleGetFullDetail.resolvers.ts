import gplay from "google-play-scraper"
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
				const gPlayResult: GoogleApp = await gplay.app({
					appId: args.appId,
					throttle: 10
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