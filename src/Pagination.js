import React from "react";
import styled from "styled-components";

const PageSpan = styled.span`
	color: white;
	cursor: pointer;
`;

const Pagination = ({ count, perPage, setPageOffset }) => {
	const pages = Math.floor(Number(count.count_name) / Number(perPage));
	let pagesArray = [];
	for (let index = 0; index <= pages; index++) {
		pagesArray.push(index);
	}
	return (
		<div style={{ maxWidth: 800 }}>
			{pagesArray.map(v => (
				<a id={v} key={v} onClick={e => setPageOffset(v * perPage)}>
					<PageSpan>{v} | </PageSpan>
				</a>
			))}
		</div>
	);
};

export default Pagination;
