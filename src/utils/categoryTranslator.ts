import { searchWords } from "../raw/GlobalConstants"
import { language } from "../raw/GlobalConstants"
import util from "util"
import request from "request"
import uuidv4 from "uuid/v4"
const requestPromise = util.promisify(request)

const KEY_VAR = "TRANSLATOR_TEXT_SUBSCRIPTION_KEY"
if (!process.env.subscriptionKey) {
	throw new Error(
		"Please set/export the following environment variable: " + KEY_VAR
	)
}
const ENDPOINT_VAR = "TRANSLATOR_TEXT_ENDPOINT"
if (!process.env.endpoint) {
	throw new Error(
		"Please set/export the following environment variable: " + ENDPOINT_VAR
	)
}
const subscriptionKey = process.env.subscriptionKey
const endpoint = process.env.endpoint

const categoryTranslator = async (category) => {
	const searchWordList: string[] = searchWords[category]
	const languageList: string[] = language
	const options = {
		method: "POST",
		baseUrl: endpoint,
		url: "translate",
		qs: {
			"api-version": "3.0",
			to: languageList
		},
		headers: {
			"Ocp-Apim-Subscription-Key": subscriptionKey,
			"Content-type": "application/json",
			"X-ClientTraceId": uuidv4().toString()
		},
		body: [
			{
				text: `${searchWordList}`
			}
		],
		json: true
	}

	const translateList = {}
	const response = await requestPromise(options)
	for (const res of response.body) {
		for (const ress of res.translations) {
			const transText = ress.text
			const lang = ress.to
			translateList[lang] = transText
			translateList[lang] = translateList[lang]
				.replace(/\s/g, "")
				.split(",")
		}
	}
	return translateList
}

export default categoryTranslator
