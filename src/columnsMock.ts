import {QuickTable} from "./QuickTable"

const Columns: Array<QuickTable.TableColumn> = Array.from({length: 20}, (i, j) => ({
	id: `id_${j}`,
	type: QuickTable.TableColumnType.Text,
	width: 200,
	title: `标题_${j}`,
	dataIndex: `key_${j}`,
}))

export default Columns
