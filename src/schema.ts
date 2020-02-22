import { makeExecutableSchema } from "graphql-tools"
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas"
import path from "path"
import { GraphQLServerLambda } from "graphql-yoga"

const allTypes: GraphQLServerLambda[] = fileLoader(
	path.join(__dirname, "./api/**/*.graphql")
)

const allResolvers: any[] = fileLoader(
	path.join(__dirname, "./api/**/*.resolvers.*")
)

const mergedTypes = mergeTypes(allTypes)
const mergedResolvers = mergeResolvers(allResolvers)

const schema = makeExecutableSchema({
	typeDefs: mergedTypes,
	resolvers: mergedResolvers
})

export default schema
