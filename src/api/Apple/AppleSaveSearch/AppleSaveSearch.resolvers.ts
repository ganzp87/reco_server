import {
	AppleSaveSearchResponse,
	AppleSaveSearchQueryArgs
} from "../../../types/graphql"
import appStore from "app-store-scraper"
import { Resolvers } from "../../../types/resolvers"
import AppleApp from "../../../entities/AppleApp"
import { appleGenre } from "../../../raw/GlobalConstants"

function mapAsync(array, callbackfn) {
	return Promise.all(array.map(callbackfn))
}

async function filterAsync(array, callbackfn) {
	const filterMap = await mapAsync(array, callbackfn)
	return array.filter((value, index) => filterMap[index])
}

const resolvers: Resolvers = {
	Query: {
		AppleSaveSearch: async (
			_,
			args: AppleSaveSearchQueryArgs,
			__
		): Promise<AppleSaveSearchResponse> => {
			try {
				const { category, country } = args
				const appStoreResult: [AppleApp] = await appStore.search({
					term: args.searchWords,
					num: 100,
					page: 1,
					country,
					lang: args.language,
					throttle: 10
				})
				const appIdContainer: any[] = []
				const appStoreRevisedResult: [AppleApp] | any[] = []
				await filterAsync(appStoreResult, async (app) => {
					const id = app.id
					if (appIdContainer.includes(id)) {
						console.log(id)
						return false
					} else {
						appIdContainer.push(id)
						const getFullDetailApp: AppleApp = await appStore.app({
							id,
							country,
							lang: args.language,
							ratings: true
						})
						const reviews = getFullDetailApp.reviews
						const score = getFullDetailApp.score
						const primaryGenre = getFullDetailApp.primaryGenre
						const description = getFullDetailApp.description
						const ratings = getFullDetailApp.ratings
						getFullDetailApp.country = country
						getFullDetailApp.category = category
						// console.log(getFullDetailApp.title, primaryGenre)
						if (score > 3.5) {
							if (reviews < 500 && ratings < 500) {
								return false
							} else {
								const summaryResult = appleGenre.summary[
									`${category}`
								].some((substr) =>
									description?.includes(substr)
								)
								if (summaryResult) {
									return true
								}
								const appleGenreResult = appleGenre.primaryGenre[
									`${category}`
								].map((item) => {
									if (primaryGenre.includes(item)) {
										return true
									} else {
										return false
									}
								})
								if (!appleGenreResult.includes(true)) {
									return false
								} else {
									const appleApp = await AppleApp.findOne({
										id
									})
									if (appleApp) {
										await AppleApp.update(
											{
												id,
												country: appleApp.country,
												category: appleApp.category
											},
											{
												title: getFullDetailApp.title,
												url: getFullDetailApp.url,
												description:
													getFullDetailApp.description,
												icon: getFullDetailApp.icon,
												country:
													getFullDetailApp.country,
												category:
													getFullDetailApp.category,
												languages:
													getFullDetailApp.languages,
												developer:
													getFullDetailApp.developer,
												score: getFullDetailApp.score,
												ratings:
													getFullDetailApp.ratings,
												reviews:
													getFullDetailApp.reviews,
												currentVersionReviews:
													getFullDetailApp.currentVersionReviews,
												screenshots:
													getFullDetailApp.screenshots,
												genres: getFullDetailApp.genres,
												primaryGenre:
													getFullDetailApp.primaryGenre
											}
										)
									} else {
										await AppleApp.create({
											...getFullDetailApp
										}).save()
									}
									appStoreRevisedResult.push(getFullDetailApp)
									return true
								}
							}
						} else {
							return false
						}
					}
				})

				if (appStoreRevisedResult) {
					return {
						appleApps: appStoreRevisedResult,
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
