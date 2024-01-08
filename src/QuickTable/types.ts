export namespace QuickTable {
	/** 表格中列类型 */
	export const enum TableColumnType {
		/** 文本类型列 */
		Text = "text",
		/** 图片类型列 */
		Image = "image"
	}

	/** 表格 - 列类型 */
	export interface TableColumn {
		/** 列ID */
		id: string
		/** 列类型 */
		type: TableColumnType
		/** 列标题 */
		label?: string
		/** 列宽度 */
		width?: number
		/** 列排序下标 */
		index?: number
		/** X轴位置 */
		x?: number
	}

	/** 表格 - 行类型 */
	export interface TableRecord {
		/** 行ID */
		id: string
		/** Y轴位置 */
		y?: number

		/** 行数据 */
		[key: string]: any
	}

}
