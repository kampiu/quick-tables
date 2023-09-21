import type {Context} from "konva/lib/Context";
import type {Font} from "@/QuickTable/Cells/base/types";
import {Color} from "../constans"
import Rect from "./rect"
import Text from "./text"

/**
 * 单元格 元数据
 * @typedef {Object} WrapTextProps
 * @property {number} x X轴坐标开始
 * @property {number} y Y轴坐标开始
 * @property {number} width 列宽度
 * @property {number} height 单元格高度
 * @property {string} url 图片URL
 */
export interface LabelProps {
	/** 单元格X坐标 */
	x: number
	/** 单元格Y坐标 */
	y: number
	/** 单元格宽度 */
	width: number
	/** 单元格高度 */
	height: number
	/** 绘制的文本内容 */
	text: string
	/** 是否圆角 */
	radius?: boolean
	/** 背景颜色 */
	background?: string
	/** 字体颜色 */
	color?: string
	/** 字号大小 */
	fontSize: number
	/** 字体内容左右排版 */
	textAlign: Font.TextAlign
	/** 字体内容上下排版 */
	verticalAlign: string
	/** 字体粗细 */
	fontWeight: Font.FontWeight
}

/**
 * 标签绘制
 * @param ctx canvas 实例，对应konva-context
 * @param {WrapTextProps} evt
 * @constructor
 */
export default function Label(ctx: Context, props: LabelProps) {

	const {
		x,
		y,
		width,
		height,
		text,
		radius,
		background,
		color = Color.text,
		fontSize = 14,
		textAlign = "center",
		verticalAlign = "middle",
		fontWeight = "normal",
	} = props

	Rect(ctx, {
		x,
		y,
		width,
		height,
		radius,
		fill: background,
	})

	Text(ctx, {
		x: x + width / 2,
		y: y + height - (height - fontSize) / 2 - 2,
		text,
		fillStyle: color,
		fontSize,
		textAlign,
		verticalAlign,
		fontWeight,
	})

	return {
		width,
		height,
	}

}
