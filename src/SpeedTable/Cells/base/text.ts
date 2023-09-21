import type {Context} from "konva/lib/Context";
import type {Font} from "@/SpeedTable/Cells/base/types";
import {Color} from "../constans"
import setStyle from "./setStyle"

/**
 * 单元格 元数据
 * @typedef {Object} WrapTextProps
 * @property {number} x X轴坐标开始
 * @property {number} y Y轴坐标开始
 * @property {number} width 列宽度
 * @property {number} height 单元格高度
 * @property {string} url 图片URL
 */
export interface TextProps {
	/** 单元格X坐标 */
	x: number
	/** 单元格Y坐标 */
	y: number
	/** 绘制的文本内容 */
	text: string
	/** 字号大小 */
	fontSize: number
	/** 字体颜色 */
	fillStyle: string
	/** 字体内容左右排版 */
	textAlign: Font.TextAlign
	/** 字体内容上下排版 */
	verticalAlign: string
	/** 字体粗细 */
	fontWeight: Font.FontWeight
}

/**
 * 多行文本绘制
 * @param ctx canvas 实例，对应konva-context
 * @param {TextProps} props
 * @constructor
 */
export default function Text(ctx: Context, props: TextProps) {

	const {
		x,
		y,
		text,
		fontSize = 14,
		fillStyle = Color.text,
		textAlign = "left",
		verticalAlign = "top",
		fontWeight = "normal",
	} = props

	// TODO: 下划线绘制
	// if(textDecoration === "underline"){
	// 	var g = Ln(this.ctx,a,h);
	// 	this.line({x:t,y:n+.5,points:[0,o,g,o],stroke:l})
	// }

	// let renderText = text
	// if (ellipsis && maxWidth > 0) {
	// 	// 获取省略绘制
	// 	const ellipsisChar = "..."
	// 	const ellipsisWidth = ctx.measureText(ellipsisChar).width
	//
	// 	const renderTextCount = Math.ceil((maxWidth - ellipsisWidth) / fontSize)
	// 	renderText = text.substring(renderTextCount, text.length) + ellipsisChar
	// }
	// console.log("----???----", maxWidth, ellipsis, renderText)

	const height = verticalAlign === "top" ? fontSize / 2 : 0
	setStyle(ctx, {fillStyle, fontSize, fontWeight})

	ctx.textAlign = textAlign

	ctx.fillText(text, x, y + height)

}
