import React, { useRef, memo, useMemo, useEffect } from "react"
import { Stage, Layer, Rect, Shape, Group } from "react-konva"
import type Konva from "konva"
import { useMemoizedFn } from "ahooks"
import { VerticalScrollBar, HorizontalScrollBar } from "@/components/ScrollBar"
import useColumns from "@/SpeedTable/hooks/useColumns"
import styles from "./SpeedTable.module.less"
import useScroller from "./hooks/useScroller"
import ScrollProvider from "./context/Scroller"
import type { Column } from "./types"

export interface SpeedTableProps<ColumnValue extends Record<string, any>> {
	width: number
	height: number
	dataSource: Array<ColumnValue>
	columns: Array<Column>
}

function SpeedTable<ColumnValue>(props: SpeedTableProps<ColumnValue>) {
	const { width: tableWidth, height: tableHeight, dataSource = [] } = props

	const { columns, allColumnsWidth } = useColumns({ columns: props?.columns })
	const StageRef = useRef<Konva.Stage>(null)

	const MaxTableHeight = useMemo(() => dataSource.length * 32, [dataSource.length])

	/** 滚动元数据  */
	const { scrollState, isScrolling, onHorizontalScroll, onVerticalScroll } = useScroller({
		maxScrollHeight: MaxTableHeight - tableHeight,
		maxScrollWidth: allColumnsWidth - tableWidth,
	})

	const ScrollContainerRef = useRef<HTMLDivElement>(null)
	const wheelingRef = useRef<number | null>(null)
	const verticalScrollRef = useRef<HTMLDivElement>({} as HTMLDivElement)
	const horizontalScrollRef = useRef<HTMLDivElement>({} as HTMLDivElement)

	const handleWheel = useMemoizedFn((event) => {
		event.preventDefault()

		if (wheelingRef.current) return
		const { deltaX, deltaY } = event

		const StepY = 360
		const StepX = 360

		// 滚动方向重置以及滚动大小控制  按住 shift 时，调换滚轮方向
		const scrollTop = event.shiftKey
			? Math.max(Math.min(deltaX * 2, StepX), -StepX)
			: Math.max(Math.min(deltaY * 2, StepY), -StepY)
		const scrollLeft = event.shiftKey
			? Math.max(Math.min(deltaY * 2, StepY), -StepY)
			: Math.max(Math.min(deltaX * 2, StepX), -StepX)

		wheelingRef.current = window.requestAnimationFrame(() => {
			if (wheelingRef.current) {
				window.cancelAnimationFrame(wheelingRef.current)
			}
			wheelingRef.current = null

			if (verticalScrollRef.current) {
				const CacheY = verticalScrollRef.current?.scrollTop
				verticalScrollRef.current.scrollTop = CacheY + scrollTop
			}

			if (horizontalScrollRef.current) {
				const CacheX = horizontalScrollRef.current?.scrollLeft
				horizontalScrollRef.current.scrollLeft = CacheX + scrollLeft
			}
		})
	})

	useEffect(() => {
		const el = ScrollContainerRef.current
		el?.addEventListener("wheel", handleWheel, {
			passive: false,
		})
		return () => {
			el?.removeEventListener("wheel", handleWheel)
		}
	}, [])

	return (
		<div
			className={styles.table}
			ref={ScrollContainerRef}
			style={{ width: tableWidth, height: tableHeight }}
		>
			<Stage width={tableWidth} height={tableHeight} ref={StageRef} listening={!isScrolling}>
				<ScrollProvider scrollStore={scrollState}>
					<Layer>
						<Rect x={10} y={10} width={100} height={100} fill="pink" />
						<Group offsetY={scrollState.y} offsetX={scrollState.x}>
							<Rect x={100} y={100} width={100} height={100} fill="skyblue" />
							<Shape
								sceneFunc={(context, shape) => {
									context.beginPath()
									context.strokeStyle = "rgba(15,23,42, 0.5)"
									// 横线
									for (
										let i = 0, rowCount = dataSource.length;
										i < rowCount;
										i++
									) {
										// 顶部线
										const HeaderLineStartPoint = 0
										const HeaderLineEndPoint = tableWidth
										context.moveTo(
											scrollState.x + HeaderLineStartPoint,
											i * 32 + 0.5,
										)
										context.lineTo(
											scrollState.x + HeaderLineEndPoint,
											i * 32 + 0.5,
										)
									}

									for (
										let i = 0, columnCount = columns.length;
										i < columnCount;
										i++
									) {
										const HeaderLineStartPoint = 0
										const HeaderLineEndPoint = tableHeight
										context.fillText("byte", scrollState.y + 200 * i, 200)
										context.moveTo(
											i * 200 + 0.5,
											scrollState.y + HeaderLineStartPoint,
										)
										context.lineTo(
											i * 200 + 0.5,
											scrollState.y + HeaderLineEndPoint,
										)
									}
									context.stroke()

									context.closePath()
									context.strokeShape(shape)
								}}
							/>
						</Group>
					</Layer>
				</ScrollProvider>
			</Stage>
			<VerticalScrollBar
				ref={verticalScrollRef}
				onVerticalScroll={onVerticalScroll}
				height={tableHeight}
				maxHeight={MaxTableHeight}
			/>
			<HorizontalScrollBar
				ref={horizontalScrollRef}
				onHorizontalScroll={onHorizontalScroll}
				width={tableWidth}
				maxWidth={allColumnsWidth}
			/>
		</div>
	)
}

export default memo(SpeedTable)
