import React from "react";
import styled from "styled-components";
import { useMyContext } from "../context/context";
import SquareItem from "./SquareItem";

const BoardMap = ({ gap = "10px" }) => {
	const { numX, numY, allSquaresArray } = useMyContext();
	// let square = Array.from({length:300},(e,i)=>(i))
	// for (let i = 0; i < 300; i++) {
	// 	square[i] = i;
	// }
	// const startIndex = Math.floor(Math.random() * 100);
	// console.log(startIndex, "startindex");
	const gap2 = "15px";
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
		/* width: 1400px; */
		display: grid;
		gap: 5px;
		grid-template-columns: repeat(20, 1fr);
		width: max-content;
		border: 5px solid green;
		padding: 10px;
		background-color: grey;
	}
`;
export default BoardMap;
