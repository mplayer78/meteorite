import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./Search";
import Table from "./Table";
import styled, { createGlobalStyle } from "styled-components";

const HeaderDiv = styled.div`
	width: 100vw;

	background: #4051b5;
	color: white;
	font-size: 1.4em;
	padding: 10px;
`;

const Page = styled.div`
	width: 100vw;
	height: 100vh;
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
  }
`;

function App() {
	const nasaUrl = "https://data.nasa.gov/resource/gh4g-9sfh.json";

	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(
		url => {
			async function fetchAsync() {
				let response = await fetch(
					`${nasaUrl}?$where=lower(name) like '%25${search || ""}%25'`
				);
				let data = await response.json();
				return data;
			}

			fetchAsync()
				.then(data => setData(data))
				.catch(reason => console.log(reason.message));
		},
		[search]
	);

	return (
		<div className="App">
			<GlobalStyle />
			<Page>
				<HeaderDiv>Meteorite Explorer</HeaderDiv>
				<Search setSearch={setSearch} />
				<Table data={data} />
			</Page>
		</div>
	);
}

export default App;
