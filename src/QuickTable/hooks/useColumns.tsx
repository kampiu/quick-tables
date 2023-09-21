import { useMemo } from "react"
import type { QuickTable } from "../types"

export interface ColumnsHookProps {
	columns: Array<QuickTable.TableColumn>
}

export default function useColumns(props: ColumnsHookProps) {
	// 处理columns类型数据格式判断
	// 包装columns数据，使其拥有自己内部需要处理的数据

	const columns = useMemo(() => {
		if (!Array.isArray(props?.columns)) {
			return []
		}
		let x: number = 0
		return props?.columns.map((item, index) => {
			const c = {
				...item,
				index,
				width: item.width || 200,
				x,
			}
			x += c.width

			return c
		})
	}, [props?.columns])

	const allColumnsWidth: number = useMemo(
		() => columns.reduce((result, column) => result + column.width, 0),
		[columns],
	)

	return {
		columns,
		allColumnsWidth,
	}
}
