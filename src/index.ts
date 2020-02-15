import app from "./app"
import { Options } from "graphql-yoga"

// const termToSearch = "맛집"
// gplay.app({ appId: "com.google.android.apps.translate" }).then(console.log)

const PORT: number | string = process.env.PORT || 4000
const PLAYGROUND_ENDPOINT: string = "/playground"
const GRAPHQL_ENDPOINT: string = "/graphql"
// const SUBSCRIPTION: string = "/subscription"

const appOptions: Options = {
	port: PORT,
	playground: PLAYGROUND_ENDPOINT,
	endpoint: GRAPHQL_ENDPOINT
}

const handleAppStart = () => console.log(`Listening on port ${PORT}`)

app.start(appOptions, handleAppStart)
