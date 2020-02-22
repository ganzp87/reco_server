const privateResolver = (resolverFunction) => async (
	parent,
	args,
	context,
	info
) => {
	const resolved = await resolverFunction(parent, args, context, info)
	return resolved
}

export default privateResolver
