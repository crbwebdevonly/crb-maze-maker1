import React from "react";
import styled from "styled-components";
import { useMyContext } from "../context/context";
import SquareItem from "./SquareItem";

const BoardMap = ({ gap = "10px" }) => {
	const { numX, numY, allSquaresArray } = useMyContext();
	//============
	return (
		<Wrapper gap3={10}>
			<div className="grid-container">
				{allSquaresArray.map((e, i) => (
					<SquareItem
						//
						key={i}
						{...e}
					/>
				))}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.grid-container {
		display: grid;
		gap: 1px;
		grid-template-columns: repeat(20, 1fr);
		width: max-content;
		padding: 10px;
		background-color: black;
	}
`;
export default BoardMap;
