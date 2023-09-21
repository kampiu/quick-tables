/**
 * 内部图标尺寸
 * @type {number}
 */
export const ICON_SIZE = 20

/**
 * 标签的配置
 * @type {{VERTICAL_MARGIN: number, PADDING: number, HORIZONTAL_MARGIN: number, HEIGHT: number}}
 */
export const TAG_CONFIG = {
	/** 标签高度 */
	HEIGHT: 20,

	/** 标签内部的文本padding */
	PADDING: 10,

	/** 多个标签的水平间距 */
	HORIZONTAL_MARGIN: 4,

	/** 多个标签的垂直间距 */
	VERTICAL_MARGIN: 4,
}

/**
 * 成员、创建、更新人标签配置
 * @type {{VERTICAL_MARGIN: number, PADDING: number, HORIZONTAL_MARGIN: number, HEIGHT: number}}
 */
export const MEMBER_TAG_CONFIG = {
	/** 标签高度 */
	HEIGHT: 20,

	/** 标签内部的文本padding */
	PADDING: 4,

	/** 多个标签的水平间距 */
	HORIZONTAL_MARGIN: 4,

	/** 多个标签的垂直间距 */
	VERTICAL_MARGIN: 4,

	/** 用户头像大小 */
	ICON_SIZE: 14,

	/** TAG左边内边距 */
	TAG_LEFT_WIDTH: 4,

	/** TAG右边内边距 */
	TAG_RIGHT_WIDTH: 8,

	/** TAG中间内边距 */
	TAG_CENTER_WIDTH: 2,
}

/**
 * 颜色配置
 * @type {{ss: string}}
 */
export const Color = {
	text: "#262626",
}

/**
 * 画布中的字体
 * @type {string}
 */
// export const Font = "'Segoe UI', Roboto, 'Helvetica Neue', Arial, \n'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
export const Font =
	"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei UI, Microsoft YaHei, Source Han Sans CN, sans-serif"

/** 字体在单元格内部的Padding */
export const TextPaddingWidth = 6

export const PixelRatio = Math.max(window.devicePixelRatio, 2)
