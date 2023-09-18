import React, { forwardRef } from "react"
import { useMemoizedFn } from "ahooks"
import styles from "./HorizontalScrollBar.module.less"

export interface HorizontalScrollBarProps {
	maxWidth: number
	onHorizontalScroll: (scrollLeft: number) => void
}

const HorizontalScrollBar = forwardRef<HTMLDivElement, HorizontalScrollBarProps>(
	({ maxWidth, onHorizontalScroll }, ref) => {
		const onScroll = useMemoizedFn((event) => {
			onHorizontalScroll(event.target.scrollLeft)
		})
		return (
			<div className={styles.scrollContainer} onScroll={onScroll} ref={ref}>
				<div
					className={styles.scrollBar}
					style={{
						width: maxWidth,
					}}
				/>
			</div>
		)
	},
)

export default HorizontalScrollBar
