import {useMemo} from "react";
import type {QuickTable} from "../types"

export interface DataSourceHookProps {
	dataSource: Array<QuickTable.TableRecord>
}

export default function useDataSource(props: DataSourceHookProps) {

	const dataSource = useMemo(() => {
		if (!props.dataSource || !Array.isArray(props?.dataSource)) {
			return []
		}

		let y: number = 0
		return props.dataSource.map((record, index) => {
			const c = {
				...record,
				index,
				height: record.height || 32,
				y,
			}
			y += c.height

			return c
		})
	}, [props?.dataSource])


	const allDataSourceHeight: number = useMemo(
		() => dataSource.reduce((result, record) => result + record.height, 0),
		[dataSource],
	)

	return {
		dataSource,
		allDataSourceHeight,
	}
}
