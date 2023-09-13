import Snowflake from "snowflake-id"

const snowflake = new Snowflake({
	mid: 1024,
	offset: (2020 - 1970) * 31536000 * 1000,
})

/** 获取唯一key */
export const createUnionKey = () => snowflake.generate().toString()

/** 当前时间 */
const now =
	typeof performance === "object" && typeof performance!.now === "function"
		? () => performance!.now()
		: () => Date.now()

export type TimeoutID = {
	id: number
}

/**
 * 取消截流器
 * @param timeoutID
 */
export function cancelTimeout(timeoutID: TimeoutID) {
	window.cancelAnimationFrame(timeoutID.id)
}

/**
 * 基于RAF创建截流器
 */
export function requestTimeout(callback: () => void, delay: number): TimeoutID {
	const start = now()

	const timeoutID = {
		id: window.requestAnimationFrame(function tick() {
			if (now() - start >= delay) {
				callback.call(null)
			} else {
				timeoutID.id = window.requestAnimationFrame(tick)
			}
		}),
	}

	return timeoutID
}
