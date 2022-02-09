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
	} = useMyContext();

	// ==========================
	const [continueGo, setContinueGo] = useState(false);
	// ==========================
	useEffect(() => {
		//   first;
		let myInterval;
		if (run && !allVisited) {
			// if (run && !allVisited) {
			myInterval = setInterval(() => {
				// move();
				moveALL();
			}, 0);
		}
		// while (run) {
		// moveNext();
		// }

		return () => {
			//     second;
			clearInterval(myInterval);
		};
	}, [run]);

	// ==========================

	// ==========================
	// console.log(test1, loading, error);
	// ==========================
	// ==========================
	// ==========================
	// ==========================
	// ==========================
	// ==========================
	// ==========================
	return (
		<Wrapper>
			leftbar
			<button onClick={move}> move</button>
			<button onClick={moveALL}> moveALL</button>
			<button onClick={moveForward}> moveForward</button>
			<button onClick={() => setRun()}> run </button>{" "}
			{run ? "on" : "off"}
			<button onClick={reset}>reset</button>
			<button onClick={showCorrectPath}>show correct path</button>
			<button onClick={drawWalls}>draw walls</button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	border: 1px solid red;
	display: flex;
	flex-direction: column;
`;
export default LeftControlBar;
