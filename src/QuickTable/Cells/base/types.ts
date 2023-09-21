/** 字体 */
export namespace Font {

	/** 字体 */
	export const FontFamily = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Source Han Sans CN, sans-serif"

	/** 字体粗细 */
	export type FontWeight =
		100
		| 200
		| 300
		| 400
		| 500
		| 600
		| 700
		| 800
		| 900
		| "normal"
		| "bold"
		| "bolder"
		| "lighter"
		| "initial"
		| "inherit"
		| "unset"
		| "revert"

	/** 字体内容左右排版 */
	export type TextAlign = CanvasTextAlign

}
