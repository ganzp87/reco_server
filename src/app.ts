import { GraphQLServer } from "graphql-yoga"
import cors from "cors"
import helmet from "helmet"
import logger from "morgan"
import schema from "./schema"

class App {
	public app: GraphQLServer
	constructor() {
		this.app = new GraphQLServer({
			schema,
			context: (req) => {
				// context undefined 에러 발생 방지
				// context에 디폴트 값으로 null을 부여
				// connection에는 디폴트 값으로 비어있는 값 부여
				const { connection: { context = null } = {} } = req
				return {
					req: req.request,
					context
				}
			}
		})
		this.middlewares()
	}
	private middlewares = (): void => {
		this.app.express.use(cors())
		this.app.express.use(logger("dev"))
		this.app.express.use(helmet())
	}
}

export default new App().app
