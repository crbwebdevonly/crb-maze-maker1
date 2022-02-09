import {
	DRAW_WALLS,
	MARK_END,
	MOVE_ALL,
	MOVE_BACKWARD,
	MOVE_FORWARD,
	RESET,
	SET_ALL_VISITED,
	SET_FORWARD_AVAILABLE,
	SET_OPEN_NEIGHBOURS,
	SHOW_CORRECT_PATH,
	SHOW_INDEX,
	STOP,
	TOGGLE_RUN,
} from "./actions";
import { getInitialState } from "./context";

export const myReducer = (state, action) => {
	// let initialState = {
	// 	allVisited: false,
	// forwardMoveAvailable:true,
	// openNeighboursIndex: [],
	// 	run: false,
	// 	loading: false,
	// 	error: false,
	// 	drawCorrectPath: false,
	// 	numX: 20,
	// 	numY: 20,
	// 	startIndex,
	// 	currentIndex: startIndex,
	// 	travelledPathIndex: [],
	// 	allSquaresArray: generateInitialSquaresArray(),
	// };
	if (action.type === RESET) {
		return getInitialState();
	}
	if (action.type === TOGGLE_RUN) {
		return { ...state, run: !state.run };
	}
	if (action.type === STOP) {
		return { ...action.payload };
	}
	if (action.type === SHOW_INDEX) {
		return { ...state, showIndex: !state.showIndex };
	}
	if (action.type === MARK_END) {
		return { ...action.payload };
	}
	if (action.type === SET_ALL_VISITED) {
		return { ...state, allVisited: action.payload };
	}
	if (action.type === SET_OPEN_NEIGHBOURS) {
		return { ...state, openNeighboursIndex: action.payload };
	}
	if (action.type === SET_FORWARD_AVAILABLE) {
		return { ...state, forwardMoveAvailable: action.payload };
	}
	if (action.type === MOVE_FORWARD) {
		if (!state.forwardMoveAvailable) {
			console.log("reducer- MOVE_FORWARD- is false");
			return state;
		}
		//
		//============
		const { currentIndex, allSquaresArray, allVisited, run } = state;
		const { allNeighboursIndex } = allSquaresArray[currentIndex];
		const notVisitedNeighbours = allNeighboursIndex.filter(
			(e) => !allSquaresArray[e].isVisited
		);
		//
		let nextIndex = Math.floor(
			Math.random() * notVisitedNeighbours.length
		);
		nextIndex = notVisitedNeighbours[nextIndex];
		console.log("moving from", currentIndex, "to", nextIndex);
		const updatedSquaresArray = allSquaresArray.map((e, i) => {
			if (i === currentIndex) {
				e.isVisited = true;
			}
			if (i === nextIndex) {
				e.isCurrent = true;
			} else e.isCurrent = false;
			return e;
		});
		//
		let updatedPath = [...state.travelledPathIndex];
		updatedPath.push({ from: currentIndex, to: nextIndex });
		//
		return {
			...state,
			currentIndex: nextIndex,
			travelledPathIndex: [...updatedPath],
			allSquaresArray: updatedSquaresArray,
		};
		//============
	}
	if (action.type === MOVE_BACKWARD) {
		//============
		let updatedPath = [...state.travelledPathIndex];
		let lastMove = updatedPath.pop();
		console.log(lastMove, "lastMove");
		const nextIndex = lastMove.from;
		const updatedSquaresArray = state.allSquaresArray.map((e, i) => {
			if (i === state.currentIndex) {
				e.isVisited = true;
			}
			if (i === nextIndex) {
				e.isCurrent = true;
			} else e.isCurrent = false;
			return e;
		});

		//============
		//============
		return {
			...state,
			currentIndex: nextIndex,
			travelledPathIndex: [...updatedPath],
			allSquaresArray: updatedSquaresArray,
		};
		//============
	}
	//============
	//============
	//============
	if (action.type === MOVE_ALL) {
		const {
			currentIndex,
			allSquaresArray,
			allVisited,
			run,
			forwardMoveAvailable,
			allTravelledPathIndex,
		} = state;
		// 1-check/set  all visited....
		if (allVisited) return state;
		let updatedALLTravelPath = [...allTravelledPathIndex];
		// 2-check if forward aviailable....
		if (forwardMoveAvailable) {
			//============
			// const { currentIndex, allSquaresArray, allVisited, run } = state;
			const { allNeighboursIndex } = allSquaresArray[currentIndex];
			const notVisitedNeighbours = allNeighboursIndex.filter(
				(e) => !allSquaresArray[e].isVisited
			);
			//
			let nextIndex = Math.floor(
				Math.random() * notVisitedNeighbours.length
			);
			nextIndex = notVisitedNeighbours[nextIndex];
			// console.log("moving from", currentIndex, "to", nextIndex);
			const updatedSquaresArray = allSquaresArray.map((e, i) => {
				if (i === currentIndex) {
					e.isVisited = true;
				}
				if (i === nextIndex) {
					e.isVisited = true;
					e.isCurrent = true;
				} else e.isCurrent = false;
				return e;
			});
			//
			let updatedPath = [...state.travelledPathIndex];
			updatedPath.push({ from: currentIndex, to: nextIndex });
			updatedALLTravelPath.push({ from: currentIndex, to: nextIndex });
			//
			return {
				...state,
				currentIndex: nextIndex,
				travelledPathIndex: [...updatedPath],
				allSquaresArray: updatedSquaresArray,
				allTravelledPathIndex: updatedALLTravelPath,
			};
			//============
		}

		// 3-else-move  backward....
		//============moveback begin
		//============
		let updatedPath = [...state.travelledPathIndex];
		let lastMove = updatedPath.pop();
		// console.log(lastMove, "lastMove");
		const nextIndex = lastMove.from;
		const updatedSquaresArray = state.allSquaresArray.map((e, i) => {
			if (i === state.currentIndex) {
				e.isVisited = true;
			}
			if (i === nextIndex) {
				e.isCurrent = true;
			} else e.isCurrent = false;
			return e;
		});

		//============
		//============
		return {
			...state,
			currentIndex: nextIndex,
			travelledPathIndex: [...updatedPath],
			allSquaresArray: updatedSquaresArray,
		};
		//============
		//============moveback end
	}
	//============
	//============
	//============
	if (action.type === SHOW_CORRECT_PATH) {
		const {
			allSquaresArray,
			allVisited,
			travelledPathIndex,
			drawCorrectPath,
		} = state;
		if (!allVisited) {
			return state;
		}
		if (drawCorrectPath) {
			return {
				...state,
				drawCorrectPath: false,
			};
		}
		let updatedSquaresArray = [...allSquaresArray];
		travelledPathIndex.map((e) => {
			updatedSquaresArray[e.from].isPath = true;
			updatedSquaresArray[e.to].isPath = true;
		});

		return {
			...state,
			allSquaresArray: updatedSquaresArray,
			drawCorrectPath: true,
		};
	}
	//============
	//============
	//============
	if (action.type === DRAW_WALLS) {
		// remove rightwall/bottomwall
		const {
			allSquaresArray,
			allVisited,
			travelledPathIndex,
			allTravelledPathIndex,
		} = state;
		if (!allVisited) {
			return state;
		}
		let updatedSquaresArray = [...allSquaresArray];

		allTravelledPathIndex.forEach((e) => {
			const diff = e.to - e.from;
			if (diff === 1) {
				// right
				updatedSquaresArray[e.from].rightWall = false;
			}
			if (diff === 20) {
				// down
				updatedSquaresArray[e.from].bottomWall = false;
			}
			if (diff === -20) {
				// up
				updatedSquaresArray[e.to].bottomWall = false;
			}
			if (diff === -1) {
				// left
				updatedSquaresArray[e.to].rightWall = false;
			}
		});

		return { ...state, allSquaresArray: updatedSquaresArray };
	}
	//============
	//============
	//============
	//============

	return state;
};
