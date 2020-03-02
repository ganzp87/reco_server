import {
	AppleSavePopularResponse,
	AppleSavePopularQueryArgs
} from "../../../types/graphql"
import appStore from "app-store-scraper"
import { Resolvers } from "../../../types/resolvers"
import genres from "../../../raw/googleGenres.json"
import AppleApp from "../../../entities/AppleApp"
import AppleTopAppList from "../../AppleTopAppList"

// https://apps.apple.com/kr/genre/ios-%EC%9D%8C%EC%8B%9D-%EB%B0%8F-%EC%9D%8C%EB%A3%8C/id6023
// 위의 링크에서 받아오는 정보인데.. 비정제된 데이터가 많아 사용 x
const resolvers: Resolvers = {
	Query: {
		AppleSavePopular: async (
			_,
			args: AppleSavePopularQueryArgs,
			__
		): Promise<AppleSavePopularResponse> => {
			try {
				const { category, country } = args
				const appStoreRevisedResult: [AppleApp] | any[] = []
				const topApp = await AppleTopAppList(country, "food-drink")
				console.log(topApp)
				await topApp!.forEach(async (el) => {
					const id = el.id
					const getFullDetailApp: AppleApp = await appStore.app({
						id,
						ratings: true,
						lang: args.language,
						country,
						throttle: 10
					})
					const ratings = getFullDetailApp.ratings
					const reviews = getFullDetailApp.reviews
					const score = getFullDetailApp.score
					const primaryGenre = getFullDetailApp.primaryGenre
					const description = getFullDetailApp.description
					getFullDetailApp.country = country
					getFullDetailApp.category = category
					// const languages = getFullDetailApp.languages
					// const langCheck = languages.some((lang) => {
					// 	return lang.toLowerCase() === language
					// })
					// if (!langCheck) return
					if (score > 3.5) {
						if (ratings < 1000 && reviews < 1000) {
							return
						} else {
							const summaryResult = genres.summary[
								`${category}`
							].some((substr) => description?.includes(substr))
							if (summaryResult) {
								return
							}
							const genresResult = genres.genreId[
								`${category}`
							].map((item) => {
								if (primaryGenre.includes(item)) {
									return true
								} else {
									return false
								}
							})
							if (!genresResult.includes(true)) {
								return false
							} else {
								const appleApp:
									| AppleApp
									| undefined = await AppleApp.findOne({
									id
								})
								if (
									appleApp?.country === country &&
									appleApp.category === category
								) {
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
											country: getFullDetailApp.country,
											category: getFullDetailApp.category,
											languages:
												getFullDetailApp.languages,
											developer:
												getFullDetailApp.developer,
											score: getFullDetailApp.score,
											ratings,
											reviews: getFullDetailApp.reviews,
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
								return
							}
						}
					} else {
						return false
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
