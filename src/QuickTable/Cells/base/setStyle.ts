import type {Context} from "konva/lib/Context"
import {Font} from "./types"

export interface SetStyleProps {
	/** 字体粗细 */
	fontWeight?: Font.FontWeight
	/** 字号大小 */
	fontSize?: number
	/** 填充的颜色 */
	fillStyle?: string | CanvasGradient | CanvasPattern
	/** 线段颜色 */
	strokeStyle?: string | CanvasGradient | CanvasPattern
}

export default function setStyle(ctx: Context, props: SetStyleProps) {
	const fontWeight = props?.fontWeight || "normal"
	const fontSize = props?.fontSize || 14

	ctx.font = "".concat(`${fontWeight}`, " ").concat(`${fontSize}`, "px ").concat(Font.FontFamily)

	if (props.fillStyle) {
		ctx.fillStyle = props.fillStyle
	}

	if (props.strokeStyle) {
		ctx.strokeStyle = props.strokeStyle
	}
}
