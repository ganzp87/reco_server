import gplay from "google-play-scraper"
import {
	GoogleGetAppQueryArgs,
	GoogleGetAppResponse
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"
import GoogleApp from "../../../entities/GoogleApp"
import { googleCountries } from "../../../raw/GlobalConstants"
// import detector from "../../../utils/detector"

const resolvers: Resolvers = {
	Query: {
		GoogleGetApp: async (
			_,
			args: GoogleGetAppQueryArgs,
			__
		): Promise<GoogleGetAppResponse> => {
			const { category, language, country, dataCount } = args
			const revisedGoogleApp: GoogleApp[] = []
			let currentDataCount = 0
			try {
				for (const key in googleCountries) {
					if (googleCountries.hasOwnProperty(key)) {
						const countries: string[] = googleCountries[key]
						if (countries.includes(country)) {
							const googleApp: GoogleApp[] = await GoogleApp.find(
								{
									category,
									language: key,
									country
								}
							)
							// console.log(
							// 	`변환 전 googleApp 수 : ${googleApp.length}`
							// )

							const startCount = currentDataCount + dataCount - 10
							for (const app of googleApp) {
								if (
									currentDataCount >= startCount &&
									currentDataCount <= dataCount - 1
								) {
									try {
										const appId = app.appId
										const gApp: GoogleApp = await gplay.app(
											{
												appId,
												lang: language
											}
										)
										//// 언어 감지 기능인데 나중에 추가 ( 현재 너무 느림 ) //////
										// const summary = gApp.summary.slice(0, 20)
										// const detectedSummaryLanguage: string = await detector(
										// 	summary
										// )
										// console.log(
										// 	`${summary}  ===>>>  ` +
										// 		detectedSummaryLanguage
										// )
										// gApp.summaryLanguage = detectedSummaryLanguage
										if (gApp) {
											revisedGoogleApp.push(gApp)
										}
									} catch (error) {
										console.log(error)
									}
								}
								currentDataCount = currentDataCount + 1
							}
						}
					}
				}

				return {
					googleApp: revisedGoogleApp,
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
