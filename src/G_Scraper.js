import memoize from "memoizee"
const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const gplay = require("google-play-scraper")

const termToSearch = "맛집"
const fn = async (termToSearch) => {
	await gplay.search({
		term: termToSearch,
		num: 10
	})
}
memoized = memoize(fn)
memoized(termToSearch)

app.listen(port, () => console.log(`Listening on port: ${port}`))
