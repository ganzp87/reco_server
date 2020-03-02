import gplay from "google-play-scraper"
import {
	GoogleGetAppQueryArgs,
	GoogleGetAppResponse,
	LangContainer
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"
import GoogleApp from "../../../entities/GoogleApp"
import { getRepository } from "typeorm"
// import detector from "../../../utils/detector"

const resolvers: Resolvers = {
	Query: {
		GoogleGetApp: async (
			_,
			args: GoogleGetAppQueryArgs,
			__
		): Promise<GoogleGetAppResponse> => {
			const {
				category,
				language,
				searchCountry,
				myLanguage,
				dataCount
			} = args
			const revisedGoogleApp: GoogleApp[] = []
			let currentDataCount = 0
			const findingLangCountry: LangContainer = {
				language,
				country: searchCountry,
				category
			}
			try {
				const googleApp: GoogleApp[] = await getRepository(GoogleApp)
					.createQueryBuilder("google_app")
					.where("google_app.langCountry ilike :langCountry", {
						langCountry:
							"%" + `${JSON.stringify(findingLangCountry)}` + "%"
					})
					.getMany()

				const startCount = currentDataCount + dataCount - 10
				for (const app of googleApp) {
					if (
						currentDataCount >= startCount &&
						currentDataCount <= dataCount - 1
					) {
						try {
							const appId = app.appId
							let gApp: GoogleApp
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

							// 원하는 국가 언어로 존재하는지 검색
							try {
								gApp = await gplay.app({
									appId,
									lang: myLanguage,
									country: searchCountry
								})
							} catch (error) {
								// 영어로 존재하는지 검색
								try {
									gApp = await gplay.app({
										appId,
										lang: "en",
										country: "us"
									})
								} catch (error) {
									// 본래 국가 언어로 검색
									gApp = await gplay.app({
										appId,
										lang: language,
										country: searchCountry
									})
								}
							}
							if (gApp) {
								revisedGoogleApp.push(gApp)
							}
						} catch (error) {
							console.log(error)
						}
					}
					currentDataCount = currentDataCount + 1
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
