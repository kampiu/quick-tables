import type { Context } from "konva/lib/Context"
import renderCellText from "./renderCellText"

/**
 * 单元格 元数据
 * @typedef {Object} CellMeta
 * @property {string} sheetId 当前子表ID（暂时用于处理查找引用）
 * @property {string} viewId 当前视图ID
 * @property {number} x X轴坐标开始
 * @property {number} y Y轴坐标开始
 * @property {number} width 列宽度
 * @property {number} height 单元格高度
 * @property {number} rowHeight 行高
 * @property {any} cellValue 单元格数据
 * @property {string} columnId 列ID
 * @property {string} rowId 行ID
 * @property {Record<string, any>} row 行数据
 * @property {Record<string, any>} column 列数据
 * @property {boolean} isFirstColumn 是否首列 （特殊绘制处理）
 * @property {Record<string, any>} relationSource 单双向关联的数据源
 * @property {boolean} isGroup 是否为分组内部的绘制(暂时是因为复选框的居中以及靠左居中)
 */

// TODO: 按道理这里是需要扩展固定column、row的断言
export interface CellOptions<CellValue> {
	x: number
	y: number
	width: number
	height: number
	rowHeight: number
	cellValue: CellValue
	columnId: string
	rowId: string
	row: Record<string, any>
	column: Record<string, any>
}

/**
 * 单元格内容绘制
 * @param ctx canvas 实例，对应konva-context
 * @param {CellMeta} CellMeta 绘制单元格的位置元数据
 */
const renderCellContext = <CellValue>(ctx: Context, CellMeta: CellOptions<CellValue>) => {
	renderCellText(ctx, CellMeta)
}

export default renderCellContext
