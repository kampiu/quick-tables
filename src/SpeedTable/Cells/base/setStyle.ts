import type { Context } from "konva/lib/Context"
import { Font } from "../constans"

export default function setStyle(ctx: Context, evt) {
	const fontWeight = evt.fontWeight || "normal"
	const fontSize = evt.fontSize || 14

	ctx.font = "".concat(fontWeight, " ").concat(fontSize, "px ").concat(Font)

	if (evt.fillStyle) {
		ctx.fillStyle = evt.fillStyle
	}

	if (evt.strokeStyle) {
		ctx.strokeStyle = evt.strokeStyle
	}
}
