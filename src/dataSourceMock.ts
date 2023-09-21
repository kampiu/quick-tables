import {createUnionKey} from "@/utils"
import type {QuickTable} from "./QuickTable"

const DataSource: Array<QuickTable.TableRecord> = Array.from({length: 200}, (i, j) => {
	const item: QuickTable.TableRecord = {
		id: createUnionKey(),
	}
	// 有序生成20列对应的行数据
	Array.from({length: 20}, (ii, jj) => {
		item[`id_${j}`] = `${jj * j}`
		return ii
	})

	return item
})

export default DataSource
