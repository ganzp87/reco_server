import categoryTranslator from "./categoryTranslator"
import { searchWords } from "../raw/GlobalConstants"

const categories = () => {
	const keyList: any[] = []
	Object.keys(searchWords).forEach((element) => {
		return keyList.push(element)
	})
	return keyList
}

const executeTranslator = async () => {
	const totalList = {}
	for (const subCategory of categories()) {
		const transTextResult = await categoryTranslator(subCategory)
		totalList[subCategory] = transTextResult
	}
	console.log(totalList)
	return totalList
}

export default executeTranslator
