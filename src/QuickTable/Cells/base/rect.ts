import type {Context} from "konva/lib/Context";

/**
 * 单元格 元数据
 * @typedef {Object} WrapTextProps
 * @property {number} x X轴坐标开始
 * @property {number} y Y轴坐标开始
 * @property {number} width 列宽度
 * @property {number} height 单元格高度
 * @property {number} radius 图片URL
 * @property {string} fill 图片URL
 */
export interface RectProps {
	/** 单元格X坐标 */
	x: number
	/** 单元格Y坐标 */
	y: number
	/** 单元格宽度 */
	width: number
	/** 单元格高度 */
	height: number
	/** 字体下划线描述 */
	textDecoration: string
	/** 矩形是否有圆角 */
	radius?: boolean
	/** 背景颜色 */
	fill?: string | CanvasGradient | CanvasPattern
}

/**
 * 多行文本绘制
 * @param {Context} ctx canvas上下文，对应konva-context
 * @param {RectProps} props
 * @constructor
 */
export default function Rect(ctx: Context, props: RectProps) {

	const {
		x,
		y,
		width,
		height,
		radius = false,
		fill,
	} = props

	ctx.beginPath()

	if (fill) {
		ctx.fillStyle = fill
	}

	// 宽度控制，考虑到左右两边弧度，需要减去对应距离
	const TagWidth = x + width - height / 2
	const TagX = x + height / 2

	if (radius) {
		ctx.moveTo(TagX, y)

		ctx.lineTo(TagWidth, y)

		ctx.arc(TagWidth, y + height / 2, height / 2, 1.5 * Math.PI, .5 * Math.PI)

		ctx.lineTo(TagX, y + height)

		ctx.arc(TagX, y + height / 2, height / 2, .5 * Math.PI, 1.5 * Math.PI)
	} else {
		ctx.moveTo(x, y)
		ctx.lineTo(x + width, y)
		ctx.lineTo(x + width, y + height)
		ctx.lineTo(x, y + height)
		ctx.lineTo(x, y)
	}

	ctx.fill()
	ctx.closePath()

}
