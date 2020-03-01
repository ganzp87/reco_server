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

const bodyTranslator = async (body, language) => {
	const options = {
		method: "POST",
		baseUrl: endpoint,
		url: "translate",
		qs: {
			"api-version": "3.0",
			to: language
		},
		headers: {
			"Ocp-Apim-Subscription-Key": subscriptionKey,
			"Content-type": "application/json",
			"X-ClientTraceId": uuidv4().toString()
		},
		body: [
			{
				text: `${body}`
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
			console.log(translateList[lang])
		}
	}
	// console.log(response)
	return translateList
}

export default bodyTranslator
