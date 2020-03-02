import {
	AppleGetAppQueryArgs,
	AppleGetAppResponse,
	LangContainer
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"
import AppleApp from "../../../entities/AppleApp"
import appStore from "app-store-scraper"
import { getRepository } from "typeorm"

const resolvers: Resolvers = {
	Query: {
		AppleGetApp: async (
			_,
			args: AppleGetAppQueryArgs,
			__
		): Promise<AppleGetAppResponse> => {
			const {
				category,
				searchCountry,
				myLanguageCountry,
				dataCount
			} = args
			const revisedAppleApp: AppleApp[] = []
			let currentDataCount = 0
			const findingLangCountry: LangContainer = {
				country: searchCountry,
				category
			}
			try {
				const appleApp: AppleApp[] = await getRepository(AppleApp)
					.createQueryBuilder("appple_app")
					.where("appple_app.langCountry ilike :langCountry", {
						langCountry:
							"%" + `${JSON.stringify(findingLangCountry)}` + "%"
					})
					.getMany()
				const startCount = currentDataCount + dataCount - 10
				for (const app of appleApp) {
					if (
						currentDataCount >= startCount &&
						currentDataCount <= dataCount - 1
					) {
						try {
							const appId = app.appId
							let aApp: AppleApp

							// 원하는 국가 언어로 존재하는지 검색
							try {
								aApp = await appStore.app({
									appId,
									country: myLanguageCountry
								})
							} catch (error) {
								// 영어로 존재하는지 검색
								try {
									aApp = await appStore.app({
										appId,
										country: "us"
									})
								} catch (error) {
									// 본래 국가 언어로 검색
									aApp = await appStore.app({
										appId,
										country: searchCountry
									})
								}
							}
							if (aApp) {
								revisedAppleApp.push(aApp)
							}
						} catch (error) {
							console.log(error)
						}
					}
					currentDataCount = currentDataCount + 1
				}
				return {
					appleApp: revisedAppleApp,
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
