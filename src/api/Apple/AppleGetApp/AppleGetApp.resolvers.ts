import {
	AppleGetAppQueryArgs,
	AppleGetAppResponse
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"
import AppleApp from "../../../entities/AppleApp"
import appStore from "app-store-scraper"

const resolvers: Resolvers = {
	Query: {
		AppleGetApp: async (
			_,
			args: AppleGetAppQueryArgs,
			__
		): Promise<AppleGetAppResponse> => {
			const {
				category,
				language,
				country,
				searchCountry,
				dataCount
			} = args
			const revisedAppleApp: AppleApp[] = []
			let currentDataCount = 0
			try {
				const appleApp: AppleApp[] = await AppleApp.find({
					category,
					language,
					country
				})
				const startCount = currentDataCount + dataCount - 10
				for (const app of appleApp) {
					if (
						currentDataCount >= startCount &&
						currentDataCount <= dataCount - 1
					) {
						try {
							const appId = app.appId
							const aApp: AppleApp = await appStore.app({
								appId,
								searchCountry
							})
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
