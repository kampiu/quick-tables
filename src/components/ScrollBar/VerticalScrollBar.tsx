import React, { forwardRef } from "react"
import { useMemoizedFn } from "ahooks"
import styles from "./VerticalScrollBar.module.less"

export interface VerticalScrollBarProps {
	height: number
	maxHeight: number
	onVerticalScroll: (scrollTop: number) => void
}

const VerticalScrollBar = forwardRef<HTMLDivElement, VerticalScrollBarProps>(
	({ height, maxHeight, onVerticalScroll }, ref) => {
		const onScroll = useMemoizedFn((event) => {
			onVerticalScroll(event.target?.scrollTop)
		})
		return (
			<div
				className={styles.scrollContainer}
				style={{
					height,
				}}
				onScroll={onScroll}
				ref={ref}
			>
				<div
					className={styles.scrollBar}
					style={{
						height: maxHeight,
					}}
				/>
			</div>
		)
	},
)

export default VerticalScrollBar
