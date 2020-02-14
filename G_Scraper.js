const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const gplay = require("google-play-scraper")

const termToSearch = "맛집"
// gplay.app({ appId: "com.google.android.apps.translate" }).then(console.log)

app.get("/gPlay", async (req, res) => {
	const gPlayResult = await gplay.search({
		term: termToSearch,
		num: 3,
		country: "kr",
		lang: "kr"
	})
	// .then(console.log, console.log)
	// gplay.app({ appId: "com.nhn.android.nmap" }).then(console.log, console.log)
	console.log("gPlayResult : " + gPlayResult)
	// gPlayResult((res) => {
	// 	res.send({
	// 		appObject: result
	// 	})
	// 	console.log(res)
	// })
})

app.listen(port, () => console.log(`Listening on port: ${port}`))
