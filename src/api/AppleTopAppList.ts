import axios from "axios"
import cheerio from "cheerio"

const AppleTopAppList = async (country, category) => {
	try {
		const html = await axios.get(
			`https://apps.apple.com/${country}/genre/ios-${category}/id6023`
		)
		const appList: any[] = []
		const $ = cheerio.load(html!.data)
		const $bodyList = $("div#selectedcontent")
			.children("div.column")
			.children("ul")
			.children("li")

		$bodyList.each(function(i, elem) {
			const url = $(elem)
				.find("a")
				.attr("href")
			const id = url.split("id")[1]

			appList[i] = {
				title: $(elem).text(),
				url: $(elem)
					.find("a")
					.attr("href"),
				id,
				rank: i
			}
		})

		return appList
	} catch (error) {
		return error
	}
}

export default AppleTopAppList
