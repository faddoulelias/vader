import { useState } from "react";

interface CompanyData {
	companyName: string;
	negative: number;
	neutral: number;
	positive: number;
	compound: number;
}

interface CompanyTableProps {
	data: CompanyData[];
}

interface TableData {
	companyName: string;
	ranking: number;
	negative: number;
	neutral: number;
	positive: number;
	compound: number;
}

const columns: string[] = [
	"Ranking",
	"Company Name",
	"Negative",
	"Neutral",
	"Positive",
	"Overall",
];
type ColumnName =
	| "Ranking"
	| "Company Name"
	| "Negative"
	| "Neutral"
	| "Positive"
	| "Overall";

function rankCompanies(data: CompanyData[]): TableData[] {
	// Sort companies by compound score and assign a ranking
	const sortedData = data.sort((a, b) => b.compound - a.compound);
	const rankedData = sortedData.map((company, index) => ({
		...company,
		ranking: index + 1,
	}));
	return rankedData;
}

function CompanyTable(props: CompanyTableProps) {
	const [sortedColumn, setSortedColumn] = useState<ColumnName | null>(null);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
	const data = rankCompanies(props.data);

	const onHeaderClick = (clickedColumn: ColumnName) => {
		if (sortedColumn === clickedColumn) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortDirection("asc");
			setSortedColumn(clickedColumn);
		}
	};

	return (
		<div className="table-container">
			<table>
				<thead>
					<tr>
						{columns.map((column) => (
							<th
								key={column}
								onClick={() => onHeaderClick(column as ColumnName)}
							>
								{column}
								{sortedColumn === column && (
									<span>{sortDirection === "asc" ? "▲" : "▼"}</span>
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data
						.sort((a, b) => {
							if (sortedColumn === "Ranking") {
								return sortDirection === "asc"
									? a.ranking - b.ranking
									: b.ranking - a.ranking;
							} else if (sortedColumn === "Company Name") {
								return sortDirection === "asc"
									? a.companyName.localeCompare(b.companyName)
									: b.companyName.localeCompare(a.companyName);
							} else if (sortedColumn === "Negative") {
								return sortDirection === "asc"
									? a.negative - b.negative
									: b.negative - a.negative;
							} else if (sortedColumn === "Neutral") {
								return sortDirection === "asc"
									? a.neutral - b.neutral
									: b.neutral - a.neutral;
							} else if (sortedColumn === "Positive") {
								return sortDirection === "asc"
									? a.positive - b.positive
									: b.positive - a.positive;
							} else if (sortedColumn === "Overall") {
								return sortDirection === "asc"
									? a.compound - b.compound
									: b.compound - a.compound;
							}
							return 0;
						})
						.map((row) => (
							<tr key={row.companyName}>
								<td>{row.ranking}</td>
								<td>{row.companyName}</td>
								<td>{row.negative.toFixed(2)}</td>
								<td>{row.neutral.toFixed(2)}</td>
								<td>{row.positive.toFixed(2)}</td>
								<td>{row.compound.toFixed(2)}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default CompanyTable;
