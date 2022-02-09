import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMyContext } from "../context/context";

// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================

// ==========================
// ==========================
const LeftControlBar = () => {
	// ==========================
	// ==========================
	// ==========================
	const {
		test1,
		loading,
		error,
		move,
		reset,
		run,
		setRun,
		doDrawCorrectPath,
		allVisited,
		moveForward,
		forwardMoveAvailable,
		moveALL,
		showCorrectPath,
		drawWalls,
          toggleShowIndex
	} = useMyContext();

	// ==========================
	// ==========================
	useEffect(() => {
		//   first;
		let myInterval;
		if (run && !allVisited) {
			myInterval = setInterval(() => {
				moveALL();
			}, 0);
		}

		return () => {
			//     second;
			clearInterval(myInterval);
		};
	}, [run]);

	// ==========================

	// ==========================
	// ==========================
	// ==========================
	// ==========================
	// ==========================
	// ==========================
	// ==========================
	// ==========================
	return (
		<Wrapper>
			{/* <button onClick={move}> move</button> */}
			{/* <button onClick={moveALL}> moveALL</button> */}
			{/* <button onClick={moveForward}> moveForward</button> */}
			<button onClick={() => setRun()}> run </button>{" "}
			{run ? "run-on" : "run-off"}
			<button onClick={reset}>reset</button>
			<button onClick={showCorrectPath} disabled={!allVisited}>
				show correct path
			</button>
			<button onClick={drawWalls} disabled={!allVisited}>
				draw walls
			</button>
			<button onClick={toggleShowIndex}>show Index</button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	border: 1px solid red;
	display: flex;
	flex-direction: column;

	button {
		padding: 10px;
		background-color: rgba(120, 137, 36, 0.6);
		font-size: 1.2rem;

		&:hover {
			filter: brightness(0.7);
		}
		&:disabled {
			cursor: not-allowed;
		}
	}
`;
export default LeftControlBar;
