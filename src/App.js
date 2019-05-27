import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import "./App.css";
import Search from "./Search";
import Table from "./Table";
import Pagination from "./Pagination";
import Sort from "./Sort";

const HeaderDiv = styled.div`
	width: 100vw;

	background: #4051b5;
	color: white;
	font-size: 1.6em;
	padding: 20px;
	font-weight: 600;
	margin-bottom: 20px;
`;

const Page = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const PageInner = styled.div`
	max-width: 1000px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #282C34;
    display: flex;
    flex-direction: column;
    align-items: center;
		font-family: 'Nunito Sans', sans-serif;
  }
`;

function App() {
	const nasaUrl = "https://data.nasa.gov/resource/gh4g-9sfh.json";

	const [dataList, setDataList] = useState([]);
	const [search, setSearch] = useState("");
	const [pageCount, setPageCount] = useState({});
	const [perPage, setPerPage] = useState(1000);
	const [pageOffset, setPageOffset] = useState(0);
	const [order, setOrder] = useState(":id");

	const formattedSearch = [...search]
		.map(v => (v === "!" || v === "#" || v === "$" ? "" : v.toLowerCase()))
		.join("");

	useEffect(
		url => {
			async function fetchAsync() {
				let data = {};
				let response = await fetch(
					`${nasaUrl}?$where=lower(name) like '%25${formattedSearch ||
						""}%25'&$limit=${perPage}&$offset=${pageOffset}&$order=${order}`
				);
				data.list = await response.json();
				let dataCount = await fetch(
					`${nasaUrl}?$where=lower(name) like '%25${formattedSearch ||
						""}%25'&$select=count(name)`
				);
				data.dataCount = await dataCount.json();
				console.log(data.dataCount[0]);
				return data;
			}

			fetchAsync()
				.then(data => setPageCount(data.dataCount[0]))
				.catch(reason => console.log(reason.message));

			fetchAsync()
				.then(data => setDataList(data.list))
				.catch(reason => console.log(reason.message));
		},
		[formattedSearch, pageOffset, perPage, order]
	);

	return (
		<div className="App">
			<GlobalStyle />
			<Page>
				<HeaderDiv>Meteorite Explorer!</HeaderDiv>
				<PageInner>
					<Search setSearch={setSearch} />
					<Sort setOrder={setOrder} />
					<Pagination
						count={pageCount}
						perPage={perPage}
						setPageOffset={setPageOffset}
					/>
					<Table data={dataList} />
				</PageInner>
			</Page>
		</div>
	);
}

export default App;
