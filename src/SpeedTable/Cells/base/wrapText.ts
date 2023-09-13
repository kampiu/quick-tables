import type { Context } from "konva/lib/Context"
import { Color } from "../constans"
import { graphemeSplit } from "../helper"
import Line from "./line"
import setStyle from "./setStyle"
import getByteWidth from "./byteWidthCache"

/**
 * 单元格 元数据
 * @typedef {Object} WrapTextProps
 * @property {number} x X轴坐标开始
 * @property {number} y Y轴坐标开始
 * @property {number} width 列宽度
 * @property {number} height 单元格高度
 * @property {string} url 图片URL
 */

export interface WrapTextOptions {
	x: number
	y: number
	width: number
	height: number
	maxWidth: number
	text: string
	lineHeight: number
	maxRow: number
	fontSize: number
	fillStyle: string
	textAlign: string
	verticalAlign: string
	fontWeight: number
	textDecoration: string
}

/**
 * 多行文本绘制
 * @param ctx canvas 实例，对应konva-context
 * @param {WrapTextProps} evt
 * @constructor
 */
export default function WrapText(ctx: Context, evt: WrapTextOptions) {
	const {
		x,
		y,
		text,
		height,
		maxWidth,
		lineHeight,
		maxRow = 1,
		fontSize = 14,
		fillStyle = Color.text,
		textAlign = "left",
		verticalAlign = "top",
		fontWeight = "normal",
		textDecoration = "none",
	} = evt

	// 字体居中位置
	const fontMiddle = verticalAlign === "top" ? fontSize / 2 : fontSize

	const textMeta = graphemeSplit(text)

	// 获取省略绘制
	const ellipsisChar = "..."
	const ellipsisWidth = getByteWidth(ctx, ellipsisChar)

	let byteOffsetX = 0 // 字节X轴偏移
	let byteOffsetY = y // 字节Y轴偏移
	let line = 1

	// ctx.textAlign = textAlign
	setStyle(ctx, { fillStyle, fontWeight, fontSize })

	// 先计算字符串总宽度，如果小于最大宽度则直接渲染
	const str = textMeta.join("").replaceAll(/[\n\r]/g, " ")
	const totalWidth = getByteWidth(ctx, str)

	if (totalWidth <= maxWidth) {
		ctx.fillText(str, x, byteOffsetY + fontMiddle)
		if (textDecoration === "underline") {
			Line(ctx, {
				x: x + byteOffsetX,
				y: byteOffsetY + fontMiddle + 3.5,
				points: [0, 0, totalWidth, 0],
				closed: false,
				stroke: fillStyle,
			})
		}

		return
	}

	for (let i = 0, len = textMeta.length; i < len; i++) {
		const TextChar = textMeta[i] // 获取字符串单元
		const isInvalidByte = ["\n", "\r"].includes(TextChar) // 判断是否换行：无效字符串单元
		const byte = isInvalidByte ? " " : TextChar // 实际绘制的字符串单元

		// TODO 缺少边界条件判断
		const byteWidth = isInvalidByte ? 0 : getByteWidth(ctx, byte)

		// 当且仅当宽度不够时候换行(计算预留的省略符号)
		// 调整更新版本：当且仅当当前是最大行数时候，处理省略
		if (line === maxRow) {
			// 达到最大绘制行数时，进行省略号绘制判断
			// 这里应该是判断剩余字符串绘制内容宽度够不够，不够就省略够就绘制
			if (byteOffsetX + ellipsisWidth + byteWidth > maxWidth) {
				ctx.fillText(ellipsisChar, x + byteOffsetX, byteOffsetY + fontMiddle)
				break
			}
		} else if (byteOffsetX + Math.ceil(byteWidth) > maxWidth) {
			line += 1
			byteOffsetY += lineHeight
			byteOffsetX = 0

			// 当且仅当高度也不够的时候停止绘制文字
			if (byteOffsetY + lineHeight - y > height) {
				break
			}
		}

		ctx.fillText(byte, x + byteOffsetX, byteOffsetY + fontMiddle, fontSize)

		if (textDecoration === "underline") {
			Line(ctx, {
				x: x + byteOffsetX,
				y: byteOffsetY + fontMiddle + 3.5,
				points: [0, 0, byteWidth, 0],
				closed: false,
				stroke: fillStyle,
			})
		}

		// ctx.moveTo(byteOffsetX, byteOffsetY + fontMiddle + 10)
		// ctx.lineTo(byteOffsetX + 10, byteOffsetY + fontMiddle + 10)

		// if (textDecoration === "underline") {
		// 	ctx.moveTo(byteOffsetX, byteOffsetY + fontMiddle)
		// 	ctx.lineTo(byteOffsetX + 10, byteOffsetY + fontMiddle)
		// }
		byteOffsetX += byteWidth
	}
}
