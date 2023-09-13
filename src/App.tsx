import React from "react"
import SpeedTable from "@/SpeedTable"
import DataSource from "./dataSourceMock"
import Columns from "./columnsMock"
import type { DataItem } from "./dataSourceMock"

// console.log("columns", Columns)
// console.log("dataSource", DataSource)
function App() {
	return (
		<div>
			<SpeedTable<DataItem>
				width={1200}
				height={800}
				dataSource={DataSource}
				columns={Columns}
			/>
		</div>
	)
}

export default App
