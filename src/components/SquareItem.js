import React from "react";
import styled from "styled-components";
import { useMyContext } from "../context/context";

const SquareItem = (props) => {
	const { index, startIndex, isStart, isEnd, isCurrent, isVisited, isPath } =
		props;
	// console.log(props);
	// console.log(startIndex, "each start");
	const { numX, numY, drawCorrectPath } = useMyContext();
	const rightWall = startIndex;
	const bottomWall = startIndex;
	// let square = [];
	// for (let i = 0; i < numX; i++) {
	// 	square.push(<li>{i}</li>);
	// }

	const handleClick = () => {
		console.log(index);
	};
	const getBGColor = () => {
		let color = "rgba(0, 0, 0, 0.3)";

		if (isPath && drawCorrectPath && (!isStart || !isEnd))
			return (color = "yellow");

		if (isVisited) color = "grey";
		if (isStart) color = "red";
		if (isEnd) color = "green";
		if (isCurrent) color = "yellow";
		return color;
	};

	return (
		<Wrapper
			onClick={handleClick}
			startIndex={startIndex}
			rightWall={rightWall}
			bottomWall={bottomWall}
			color={getBGColor()}
			{...props}
		>
			{index}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	height: 20px;
	width: 20px;
	background-color: ${(props) => props.color};
	position: relative;

	&:after {
		position: absolute;
		content: "";
		top: 0;
		left: 100%;
		width: 3px;
		height: 100%;
		background-color: white;
		background-color: ${(props) =>
			// props.rightWall ? "black" : "transparent"};
			props.rightWall ? "black" : "grey"};
	}
	&:before {
		position: absolute;
		content: "";
		top: 100%;
		left: 0%;
		width: 100%;
		height: 3px;
		background-color: rgba(0, 0, 0, 0.8);
		background-color: white;
		background-color: ${(props) =>
			// props.bottomWall ? "black" : "transparent"};
			props.bottomWall ? "black" : "grey"};
	}
`;
export default SquareItem;
