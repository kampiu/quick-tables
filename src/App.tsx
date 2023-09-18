import React from "react"
import SpeedTable from "@/SpeedTable"
import DataSource from "./dataSourceMock"
import Columns from "./columnsMock"

function App() {
	return (
		<div>
			<SpeedTable
				width={800}
				height={800}
				dataSource={DataSource}
				columns={Columns}
			/>
		</div>
	)
}

export default App
