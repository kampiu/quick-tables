import React from "react"
import QuickTable from "./QuickTable"
import DataSource from "./dataSourceMock"
import Columns from "./columnsMock"

function App() {
	return (
		<div>
			<QuickTable
				width={800}
				height={800}
				dataSource={DataSource}
				columns={Columns}
			/>
		</div>
	)
}

export default App
