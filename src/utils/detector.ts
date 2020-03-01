import util from "util"
import request from "request"
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

const detector = async (body) => {
	const options = {
		method: "POST",
		baseUrl: endpoint,
		url: "detect",
		qs: {
			"api-version": "3.0"
		},
		headers: {
			"Ocp-Apim-Subscription-Key": subscriptionKey,
			"Content-type": "application/json"
		},
		body: [
			{
				text: `${body}`
			}
		],
		json: true
	}

	const response = await requestPromise(options)
	return response.body[0].language
}

export default detector
