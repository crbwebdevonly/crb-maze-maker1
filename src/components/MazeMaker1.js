import React from "react";
import styled from "styled-components";
import BoardMap from "./BoardMap";
import LeftControlBar from "./LeftControlBar";
import Navbar from "./Navbar";
import SquareItem from "./SquareItem";

const MazeMaker1 = () => {
	return (
		<Wrapper>
			{/* MazeMaker1 */}
			{/* <Navbar /> */}
			<div className="main">
				<div className="left">
					<LeftControlBar />
				</div>
				<div className="right">
					<BoardMap />
				</div>
			</div>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	border: 1px solid red;
	.main {
		display: flex;
	}
	.left {
		flex: 1;
	}
	.right {
		flex: 6;
		border: 2px solid blue;
	}
`;
export default MazeMaker1;
