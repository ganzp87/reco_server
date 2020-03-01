import {
	AppleSaveTopListResponse,
	AppleSaveTopListQueryArgs
} from "../../../types/graphql"
import appStore from "app-store-scraper"
import { Resolvers } from "../../../types/resolvers"
import AppleApp from "../../../entities/AppleApp"
import AppleConstants from "../shared/AppleConstants"

const resolvers: Resolvers = {
	Query: {
		AppleSaveTopList: async (
			_,
			args: AppleSaveTopListQueryArgs,
			__
		): Promise<AppleSaveTopListResponse> => {
			try {
				const { appleCategory, appleCollection, country } = args
				// const collection = `${
				// 	appStore.collection[`${appleCollection}`]
				// }`
				// const category = appStore.category[`${appleCategory}`]

				console.log(appleCategory, appleCollection)
				// const appStoreRevisedResult: [AppleApp] | any[] = []
				const getFullDetailApp: AppleApp[] = await appStore.list({
					collection: AppleConstants.collection.TOP_FREE_MAC,
					category: AppleConstants.category.FOOD_AND_DRINK,
					country,
					num: 200,
					fullDetail: true
				})

				if (getFullDetailApp) {
					return {
						appleApps: getFullDetailApp,
						error: null
					}
				} else {
					return {
						appleApps: null,
						error: "Cant Find appleApps"
					}
				}
			} catch (error) {
				return {
					appleApps: null,
					error: error.message
				}
			}
		}
	}
}

export default resolvers
