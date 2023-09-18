export interface Column {
	/** 列ID */
	id: string
	/** 列类型 */
	type: string
	/** 列标题 */
	label?: string
	/** 列宽度 */
	width?: number
	/** 列排序下标 */
	index?: number
}

export interface DataSourceItem {
	/** 行ID */
	id: string
	/** 行数据 */
	[key: string]: any
}
