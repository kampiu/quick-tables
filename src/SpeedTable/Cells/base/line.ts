import type { Context } from "konva/lib/Context"

export interface LineOptions {
	x: number
	y: number
	width?: number
	height?: number
	points: Array<number>
	closed?: boolean
	stroke?: string
}

export default function Line(ctx: Context, evt: LineOptions) {
	const { x, y, points, stroke, closed } = evt

	ctx.save()

	ctx.beginPath()
	if (stroke) {
		ctx.strokeStyle = stroke
	}
	ctx.lineWidth = 1
	ctx.translate(x, y)
	ctx.moveTo(points[0], points[1])
	for (let l = 2; l < points.length; l += 2) {
		ctx.lineTo(points[l], points[l + 1])
	}

	if (closed) {
		ctx.closePath()
	}
	ctx.stroke()
	ctx.restore()
}
