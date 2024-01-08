import type {QuickTable} from "@/QuickTable";
import _ from "lodash";
import {useMemo} from "react";

interface ScrollColumnsProps {
	dataSource: Array<QuickTable.TableRecord>
	scrollStateY: number
	tableHeight: number
}

export default function useScrollDataSource({dataSource, scrollStateY, tableHeight}: ScrollColumnsProps) {
	// start scroll X
	const startScrollX = scrollStateY
	// end scroll X
	const endScrollX = scrollStateY + tableHeight

	const scrollDataSource = useMemo(() => {
		const scrollDataSourceParams: Array<QuickTable.TableRecord> = []
		if (startScrollX < endScrollX) {

			for (let i = 0, len = dataSource.length; i < len; i++) {
				const dataSourceItemHeight = i * 32
				if (dataSourceItemHeight > endScrollX) {
					break
				}
				if (_.inRange(dataSourceItemHeight, startScrollX - 32, endScrollX)) {
					scrollDataSourceParams.push(dataSource[i])
				}
			}
		}
		return scrollDataSourceParams
	}, [dataSource, scrollStateY, tableHeight])


	return {
		scrollDataSource,
	}
}
