import gplay from "google-play-scraper"
import {
	GoogleGetFullDetailResponse,
	GoogleGetFullDetailQueryArgs
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"
import GoogleApp from "../../../entities/GoogleApp"

interface Comment {
	text: string
}

const resolvers: Resolvers = {
	Query: {
		GoogleGetFullDetail: async (
			_,
			args: GoogleGetFullDetailQueryArgs
		): Promise<GoogleGetFullDetailResponse> => {
			try {
				const { appId, country, language } = args
				// const gPlayResult:
				// 	| GoogleApp
				// 	| undefined = await GoogleApp.findOne({
				// 	appId,
				// 	country,
				// 	language,
				// 	category
				// })
				const gPlayResult: GoogleApp = await gplay.app({
					appId,
					lang: language,
					country
				})
				const comments: Comment[] = await gplay.reviews({
					appId,
					lang: language,
					country,
					sort: gplay.sort.NEWEST,
					num: 10
				})
				const commentsContainer: any = []
				for (const comment of comments) {
					commentsContainer.push(comment.text)
				}
				gPlayResult.comments = commentsContainer
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
