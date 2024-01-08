import type {QuickTable} from "@/QuickTable";
import _ from "lodash";
import {useMemo} from "react";

interface ScrollColumnsProps {
	columns: Array<QuickTable.TableColumn>
	scrollStateX: number
	tableWidth: number
}

export default function useScrollColumns({columns, scrollStateX, tableWidth}: ScrollColumnsProps) {
	// start scroll X
	const startScrollX = scrollStateX
	// end scroll X
	const endScrollX = scrollStateX + tableWidth

	const scrollColumns = useMemo(() => {
		const scrollColumnsParams: Array<QuickTable.TableColumn> = []
		if (startScrollX < endScrollX) {
			const columnsWidth = columns.reduce((result, column) => {
				result.push((column.width || 0) + result[result.length - 1] || 0)
				return result
			}, [] as Array<number>)

			for (let i = 0, len = columnsWidth.length; i < len; i++) {
				const columnWidth = columnsWidth[i]
				if (columnWidth > endScrollX) {
					// scrollColumnsParams.push(columns[i])
					break
				}
				if (_.inRange(columnWidth, startScrollX - (columns[i].width || 0), endScrollX)) {
					scrollColumnsParams.push(columns[i])
				}
			}
		}
		return scrollColumnsParams
	}, [columns, scrollStateX, tableWidth])


	return {
		scrollColumns,
	}
}
