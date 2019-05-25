import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
	border-color: white;
	background-color: white;
	max-width: 1000px;
`;

const StyledHeader = styled.tr`
	background-color: #ffb563;
	margin: 20px;
	font-weight: 700;
`;

const StyledRow = styled.tr`
	background-color: ${props => (props.greyColor ? "#FAFAFA" : "white")};
`;

const RowContents = ({ data, header }) => {
	return header ? (
		<>
			<td>ID</td>
			<td>Name</td>
			<td>Year</td>
			<td>Name Type</td>
			<td>Class</td>
			<td>Mass</td>
			<td>Latitude</td>
			<td>Longitude</td>
		</>
	) : (
		<>
			<td>{data.id}</td>
			<td>{data.name}</td>
			<td>{/\d\d\d\d/.exec(data.year)}</td>
			<td>{data.nametype}</td>
			<td>{data.recclass}</td>
			<td>{parseFloat(data.mass).toFixed(0) || "Unknown"}</td>
			<td>{data.reclat}</td>
			<td>{data.reclong}</td>
		</>
	);
};

const Table = ({ data }) => {
	return (
		<>
			<StyledTable>
				<StyledHeader>
					<RowContents data={data[0]} header />
				</StyledHeader>
				{!data ? (
					<h1 style={{ color: "white" }}>Loading...</h1>
				) : (
					data.map((val, ind) =>
						ind % 2 ? (
							<StyledRow>
								<RowContents data={val} />
							</StyledRow>
						) : (
							<StyledRow greyColor>
								<RowContents data={val} />
							</StyledRow>
						)
					)
				)}
			</StyledTable>
		</>
	);
};

export default Table;
