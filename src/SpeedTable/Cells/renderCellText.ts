import type { Context } from "konva/lib/Context"
import { TextPaddingWidth, Color } from "./constans"
import WrapText from "./base/wrapText"
import type { WrapTextOptions } from "./base/wrapText"
import type { CellOptions } from "./index"

// TODO: 所有字体的样式全部通过Provider的方式去拿
export default function renderCellText<CellValue>(
	ctx: Context,
	cellOptions: CellOptions<CellValue>,
) {
	const options: WrapTextOptions = {
		x: cellOptions.x + TextPaddingWidth,
		y: cellOptions.y + 6,
		width: cellOptions.width,
		height: cellOptions.height,
		text: typeof cellOptions.cellValue === "string" ? cellOptions.cellValue : "",
		lineHeight: 22,
		maxRow: 1,
		maxWidth: cellOptions.width - TextPaddingWidth * 2,
		textAlign: "left",
		fillStyle: Color.text,
		fontSize: 14,
		verticalAlign: "middle",
		textDecoration: "none",
		fontWeight: 400,
	}

	WrapText(ctx, options)
}
