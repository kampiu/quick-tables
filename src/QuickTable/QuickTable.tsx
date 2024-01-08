import React, {useRef, memo, useEffect, useCallback, useMemo} from "react"
import {Stage, Layer, Rect, Shape, Group} from "react-konva"
import type Konva from "konva"
import {useMemoizedFn} from "ahooks"
import {VerticalScrollBar, HorizontalScrollBar} from "@/components/ScrollBar"
import useColumns from "@/QuickTable/hooks/useColumns"
import useDataSource from "@/QuickTable/hooks/useDataSource"
import _ from "lodash"
import styles from "./QuickTable.module.less"
import useScroller from "./hooks/useScroller"
import ScrollProvider from "./context/Scroller"
import useScrollColumns from "./hooks/useScrollColumns"
import type {QuickTable} from "./types"

export interface QuickTableProps {
	width: number
	height: number
	dataSource: Array<QuickTable.TableRecord>
	columns: Array<QuickTable.TableColumn>
}

function Table(props: QuickTableProps) {
	const {width: tableWidth, height: tableHeight} = props

	const StageRef = useRef<Konva.Stage>(null)

	const {columns, allColumnsWidth} = useColumns({columns: props?.columns || []})
	const {dataSource, allDataSourceHeight} = useDataSource({dataSource: props?.dataSource || []})

	/** 滚动元数据  */
	const {scrollState, isScrolling, onHorizontalScroll, onVerticalScroll} = useScroller({
		maxScrollHeight: allDataSourceHeight - tableHeight,
		maxScrollWidth: allColumnsWidth - tableWidth,
	})

	/** 当前区域显示的列 */
	const { scrollColumns } = useScrollColumns({columns, tableWidth, scrollStateX: scrollState.x})

	const ScrollContainerRef = useRef<HTMLDivElement>(null)
	const wheelingRef = useRef<number | null>(null)
	const verticalScrollRef = useRef<HTMLDivElement>({} as HTMLDivElement)
	const horizontalScrollRef = useRef<HTMLDivElement>({} as HTMLDivElement)

	const handleWheel = useMemoizedFn((event) => {
		event.preventDefault()

		if (wheelingRef.current) return
		const {deltaX, deltaY} = event

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


	const onClick = useCallback(() => {
		console.log("@")
	}, [])

	return (
		<div
			className={styles.table}
			ref={ScrollContainerRef}
			style={{width: tableWidth, height: tableHeight}}
		>
			<Stage width={tableWidth} height={tableHeight} ref={StageRef} listening={!isScrolling}>
				<ScrollProvider scrollStore={scrollState}>
					<Layer>
						<Group offsetY={scrollState.y} offsetX={scrollState.x}>
							<Rect x={100} y={100} width={100} height={100} fill="skyblue" onClick={onClick}/>
							<Shape
								sceneFunc={(context, shape) => {
									context.beginPath()
									context.strokeStyle = "rgba(15,23,42, 0.5)"
									// 横线
									for (
										let recordIndex = 0, recordCount = dataSource.length;
										recordIndex < recordCount;
										recordIndex++
									) {
										// 顶部线
										const HeaderLineStartPoint = 0
										const HeaderLineEndPoint = tableWidth
										context.moveTo(
											scrollState.x + HeaderLineStartPoint,
											recordIndex * 32 + 0.5,
										)
										context.lineTo(
											scrollState.x + HeaderLineEndPoint,
											recordIndex * 32 + 0.5,
										)
									}

									for (
										let i = 0, columnCount = columns.length;
										i < columnCount;
										i++
									) {
										const HeaderLineStartPoint = 0
										const HeaderLineEndPoint = tableHeight
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


									for (
										let recordIndex = 0, recordCount = dataSource.length;
										recordIndex < recordCount;
										recordIndex++
									) {
										for (
											let columnIndex = 0, columnCount = columns.length;
											columnIndex < columnCount;
											columnIndex++
										) {
											context.fillText("byte", columns[columnIndex].x + 10, dataSource[recordIndex].y - 10)
										}
									}

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
				maxHeight={allDataSourceHeight}
			/>
			<HorizontalScrollBar
				ref={horizontalScrollRef}
				onHorizontalScroll={onHorizontalScroll}
				maxWidth={allColumnsWidth}
			/>
		</div>
	)
}

export default memo(Table)
