import { createUnionKey } from "@/utils"

export type DataItem = Record<string, string | number>

const DataSource: Array<DataItem> = Array.from({ length: 200 }, (i, j) => {
	const item: Record<string, number | string> = {
		id: createUnionKey(),
	}
	Array.from({ length: 20 }, (ii, jj) => {
		item[`key_${jj}`] = `${jj * j}`
		return ii
	})

	return item
})

export default DataSource
