import React from "react";
import { StyledButton } from "./Search";

const Sort = props => {
	return (
		<div>
			<StyledButton label="true">Sort By:</StyledButton>
			{[":id", "name", "year", "recclass", "mass"].map((v, i) => (
				<StyledButton key={v} id={v} onClick={e => props.setOrder(v)}>
					{v === "reclass" ? "class" : v}
				</StyledButton>
			))}
		</div>
	);
};

export default Sort;
