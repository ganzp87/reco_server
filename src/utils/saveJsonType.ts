import GoogleApp from "../entities/GoogleApp"

function uniqBy(a, key) {
	const seen = {}
	return a.filter((item) => {
		const k = key(item)
		return seen.hasOwnProperty(k) ? false : (seen[k] = true)
	})
}

export const saveJsonType = (
	newData: GoogleApp,
	fetchedData: string,
	country: string,
	category: string
) => {
	const { title, url, description, summary, comments } = newData
	const newDataObj = {
		title,
		url,
		description,
		summary,
		comments,
		country,
		category
	}
	const parsedFetchedData = JSON.parse(fetchedData)
	const parsedFetchedDataUniq = uniqBy(parsedFetchedData, JSON.stringify)
	let i = 0
	for (const item of parsedFetchedDataUniq) {
		let parsedItem
		try {
			parsedItem = JSON.parse(item)
		} catch (error) {
			parsedItem = item
		}
		parsedFetchedDataUniq[i] = parsedItem
		i++
	}
	if (!parsedFetchedDataUniq.includes(newDataObj)) {
		parsedFetchedDataUniq.push(newDataObj)
	}
	const parsedFetchedDataUniqq = uniqBy(parsedFetchedData, JSON.stringify)
	return JSON.stringify(parsedFetchedDataUniqq)
}

export const saveFirstJsonType = (
	newData: GoogleApp,
	country: string,
	category: string
) => {
	const { title, url, description, summary, comments } = newData
	const newDataObj = {
		title,
		url,
		description,
		summary,
		comments,
		country,
		category
	}
	return JSON.stringify(newDataObj)
}
