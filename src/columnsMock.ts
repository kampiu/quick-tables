import type { Column } from "@/SpeedTable"

const Columns: Array<Column> = Array.from({ length: 20 }, (i, j) => ({
	width: 200,
	title: `标题_${j}`,
	dataIndex: `key_${j}`,
}))

export default Columns
