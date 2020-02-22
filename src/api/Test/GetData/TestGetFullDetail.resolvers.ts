import {
	TestGetFullDetailMutationArgs,
	TestGetFullDetailResponse
} from "../../../types/graphql"
import { Resolvers } from "../../../types/resolvers"

const resolvers: Resolvers = {
	Mutation: {
		TestGetFullDetail: async (
			_,
			args: TestGetFullDetailMutationArgs
		): Promise<TestGetFullDetailResponse> => {
			try {
				return {
					result: `Hello ${args.name}`,
					error: null
				}
			} catch (error) {
				return {
					result: null,
					error: error.message
				}
			}
		}
	}
}

export default resolvers
