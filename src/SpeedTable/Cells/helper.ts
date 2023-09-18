// 获取字符串16进制
function getWholeChar(str: string, i: number): string | false {
	const code = str.charCodeAt(i)

	if (isNaN(code)) {
		return "" // 不存在
	}
	if (code < 0xd800 || code > 0xdfff) {
		return str.charAt(i)
	}

	// 可以将最后一个十六进制更改为0xDB7F，以将高私有代理视为单个字符
	if (code >= 0xd800 && code <= 0xdbff) {
		if (str.length <= i + 1) {
			throw new Error("无效转译")
		}
		const next = str.charCodeAt(i + 1)
		if (next < 0xdc00 || next > 0xdfff) {
			throw new Error("无效转译")
		}
		return str.charAt(i) + str.charAt(i + 1)
	}

	if (i === 0) {
		throw new Error("无效转译")
	}
	const prev = str.charCodeAt(i - 1)

	// 可以将最后一个十六进制更改为0xDB7F，以将高私有代理视为单个字符。
	if (prev < 0xd800 || prev > 0xdbff) {
		throw new Error("无效转译")
	}

	// 可以将低代理作为已经处理过的一对中的第二个组件传递
	return false
}

/**
 * 将字符串除以用户感知的单个单位
 * @param {string} textString
 * @return {Array<*>}
 */
export function graphemeSplit(textString: string): Array<string> {
	let i = 0
	let chr = null
	const graphemes: Array<string> = []
	for (i = 0, chr; i < textString.length; i++) {
		chr = getWholeChar(textString, i)
		const result = chr
		if (result) {
			graphemes.push(result)
		}
	}
	return graphemes
}

export default {
	graphemeSplit,
}
