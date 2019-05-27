import React, { useState } from "react";
import styled from "styled-components";

const SearchBox = styled.div`
	background-color: white;
	padding: 5px;
	max-width: 300px;
	margin: 10px;
`;

export const StyledButton = styled.button`
	background: ${props =>
		props.label ? "hsl(231, 48%, 80%)" : "hsl(231, 48%, 48%)"};
	border-radius: 2px;
	display: inline-block;
	cursor: pointer;
	color: #282c34;
	font-size: 1.2rem;
	font-weight: bold;
	padding: 8px 30px;
	border: 0px;
	margin: 3px;
	:hover {
		background: ${props =>
			props.label ? "hsl(231, 48%, 80%)" : "hsl(231, 55%, 55%)"};
	}
	:active {
		position: relative;
		top: 1px;
	}
`;

const StyledInput = styled.input`
	border: none;
	border-bottom: 2px solid #282c34;
	outline: none;
	::after {
		content: "";
		width: 100%;
		border-bottom: solid 1px #fff;
		position: absolute;
		left: 0;
		top: 50%;
		z-index: 1;
	}
`;

const Search = props => {
	const [value, setValue] = useState("");
	return (
		<SearchBox>
			<form
				onSubmit={e => {
					e.preventDefault();
					props.setSearch(value);
				}}
			>
				<label>
					<StyledInput
						onChange={e => setValue(e.target.value)}
						value={value}
						placeholder="Enter Search Terms"
					/>
					<StyledButton type="submit">SEARCH</StyledButton>
				</label>
			</form>
		</SearchBox>
	);
};

export default Search;
