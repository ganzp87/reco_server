import dotenv from "dotenv"
dotenv.config()
import app from "./app"
import { createConnection } from "typeorm"
import { Options } from "graphql-yoga"
import connectionOptions from "./ormConfig"
// import detector from "./utils/detector"
// import bodyTranslator from "./utils/bodyTranslator"
// import executeTranslator from "./utils/executeTranslator"

const PORT: number | string = process.env.PORT || 4000
const PLAYGROUND_ENDPOINT: string = "/playground"
const GRAPHQL_ENDPOINT: string = "/graphql"

const appOptions: Options = {
	port: PORT,
	playground: PLAYGROUND_ENDPOINT,
	endpoint: GRAPHQL_ENDPOINT
}

const handleAppStart = () => console.log(`Listening on port ${PORT}`)

createConnection(connectionOptions)
	.then(() => {
		app.start(appOptions, handleAppStart)
		// executeTranslator()
		// detector("Et maintenant que l’été approche")
		// bodyTranslator("Et maintenant que l’été approche", "ko")
	})
	.catch((error) => console.log(error))
