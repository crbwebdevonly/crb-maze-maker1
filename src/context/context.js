import { useEffect } from "react";
import { createContext, useContext, useReducer, useState } from "react";
import {
	DRAW_WALLS,
	MOVE_ALL,
	MOVE_BACKWARD,
	MOVE_FORWARD,
	RESET,
	SET_ALL_VISITED,
	SET_FORWARD_AVAILABLE,
	SET_OPEN_NEIGHBOURS,
	SHOW_CORRECT_PATH,
	TOGGLE_RUN,
} from "./actions";
import { myReducer } from "./reducer";

const MyContext = createContext();

const generateInitialSquaresArray = () => {
	let out = Array.from({ length: 1200 }, (e, i) => ({
		index: i,
		isVisited: false,
		isCurrent: false,
		isStart: false,
		isEnd: false,
		isPath: false,
		allNeighboursIndex: [],
		rightWall: true,
		bottomWall: true,
		hasWalls: ["right"],
	}));

	out[0].isStart = true;
	// out[out.length - 1].isEnd = true;

	//fill all neighbours
	out = out.map((e2, i2) => {
		const n = 20;
		const max = out.length;
		// top
		const top = i2 - n;
		if (top > -1) {
			e2.allNeighboursIndex.push(top);
		}
		const right = i2 + 1;
		if (right < max && right % n !== 0) {
			e2.allNeighboursIndex.push(right);
		}
		const left = i2 - 1;
		if (left > -1 && (left + 1) % 20 !== 0) {
			e2.allNeighboursIndex.push(left);
		}
		const down = i2 + n;
		if (down < max) {
			e2.allNeighboursIndex.push(down);
		}
		return e2;
	});

	return out;
};

// const allSquaresArray = generateInitialSquaresArray();

// console.log(generateInitialSquaresArray());

const startIndex = 0;
// const endIndex = 299;

export const getInitialState = () => {
	let initialState = {
		allVisited: false,
		forwardMoveAvailable: true,
		openNeighboursIndex: [1, 20],
		run: false,
		loading: false,
		error: false,
		drawCorrectPath: false,
		numX: 20,
		numY: 20,
		startIndex,
		currentIndex: 0,
		travelledPathIndex: [],
		allTravelledPathIndex: [],
		allSquaresArray: generateInitialSquaresArray(),
	};
	return initialState;
};

export const MyContextProvider = ({ children }) => {
	// ==========================
	const [state, dispatch] = useReducer(myReducer, getInitialState());
	// ==========================
	// ==========================
	// const [myState, setMyState] = useState(getInitialState());
	// ==========================
	// ==========================
	useEffect(() => {
		//   first;
		const checkForward = () => {
			console.log("current index effect", state.currentIndex);
			const { currentIndex, allSquaresArray } = state;
			console.log("forward checker>", currentIndex);
			const { allNeighboursIndex } = allSquaresArray[currentIndex];
			const notVisitedNeighbours = allNeighboursIndex.filter(
				(e) => !allSquaresArray[e].isVisited
			);
			if (notVisitedNeighbours.length < 1) {
				console.log(
					"isMoveForwardAvailable --NO before dispatch from EFFECT",
					currentIndex
				);
				dispatch({ type: SET_FORWARD_AVAILABLE, payload: false });
			} else dispatch({ type: SET_FORWARD_AVAILABLE, payload: true });
		};
		//============
		//============
		const updateOpenNeighboursIndex = () => {
			const { currentIndex, allSquaresArray } = state;
			const { allNeighboursIndex } = allSquaresArray[currentIndex];
			const notVisitedNeighbours = allNeighboursIndex.filter(
				(e) => !allSquaresArray[e].isVisited
			);

			console.log(notVisitedNeighbours, "open neigh-effect");
			dispatch({
				type: SET_OPEN_NEIGHBOURS,
				payload: notVisitedNeighbours,
			});
		};
		//============
		//============
		const updateAllVisited = () => {
			const { allSquaresArray } = state;
			const isAllVisited = allSquaresArray.findIndex(
				(e) => e.isVisited === false
			);
			if (isAllVisited < 0) {
				dispatch({ type: SET_ALL_VISITED, payload: true });
				dispatch({ type: TOGGLE_RUN });
			}
		};
		//============
		//============
		//============
		updateAllVisited();
		updateOpenNeighboursIndex();
		checkForward();
		//============

		return () => {
			//     second;
		};
	}, [state.currentIndex]);

	// ==========================
	// ==========================
	useEffect(() => {
		//   first;

		return () => {
			//     second;
		};
	}, []);

	// ==========================
	// ==========================

	// ==========================
	const reset = () => {
		dispatch({ type: RESET });
	};
	// ==========================
	// ==========================
	const setRun = (value) => {
		dispatch({ type: TOGGLE_RUN });
	};

	// ==========================
	// ==========================
	const isMoveForwardAvailable = () => {
		const { currentIndex, allSquaresArray } = state;
		console.log("forward checker>", currentIndex);
		const { allNeighboursIndex } = allSquaresArray[currentIndex];
		const notVisitedNeighbours = allNeighboursIndex.filter(
			(e) => !allSquaresArray[e].isVisited
		);
		if (notVisitedNeighbours.length < 1) {
			console.log("isMoveForwardAvailable --NO from ", currentIndex);

			return false;
		} else if (notVisitedNeighbours.length > 0) {
			return true;
		}
		return false;
	};
	// ==========================
	// ==========================
	// ==========================
	const move = () => {
		moveForward();

		// const { currentIndex, allSquaresArray, allVisited, run } = myState;
		// if (allVisited) {
		// 	if (run) setRun(false);
		// 	return;
		// }
		// const { allNeighboursIndex } = allSquaresArray[currentIndex];
		// //
		// const notVisitedNeighbours = allNeighboursIndex.filter(
		// 	(e) => !allSquaresArray[e].isVisited
		// );
		// // console.log(notVisitedNeighbours, "not visited");
		// if (notVisitedNeighbours.length < 1) {
		// 	// console.log("move back");
		// 	moveBackward();
		// 	return;
		// }
		// moveForward();
	};

	// ==========================
	// ==========================
	const moveForward = () => {
		dispatch({ type: MOVE_FORWARD });
	};
	// ==========================
	// ==========================
	const moveBackward = () => {
		dispatch({ type: MOVE_BACKWARD });
	};
	// ==========================
	const moveALL = () => {
		dispatch({ type: MOVE_ALL });
	};
	// ==========================
	// ==========================
	const showCorrectPath = () => {
		dispatch({ type: SHOW_CORRECT_PATH });
	};
	// ==========================
	// ==========================
	const drawWalls = () => {
		dispatch({ type: DRAW_WALLS });
	};
	// ==========================
	// ==========================
	const contextValues = {
		...state,
		reset,
		setRun,
		move,
		moveForward,
		moveALL,
		showCorrectPath,
		drawWalls,
	};
	// ==========================
	// ==========================
	return (
		<MyContext.Provider value={contextValues}>
			{children}
		</MyContext.Provider>
	);
};
// ==========================
// ==========================
export const useMyContext = () => {
	return useContext(MyContext);
};
// ==========================END
// ==========================END
// ==========================END
// ==========================END
// ==========================END
// ==========================END
// ==========================END
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================

// const doDrawCorrectPath = () => {
// 	setMyState((prev) => {
// 		let updatedSquaresArray = [...prev.allSquaresArray];
// 		prev.travelledPathIndex.forEach((e) => {
// 			updatedSquaresArray[e.from].isPath = true;
// 			updatedSquaresArray[e.to].isPath = true;
// 		});

// 		return {
// 			...prev,
// 			allSquaresArray: updatedSquaresArray,
// 			drawCorrectPath: !prev.drawCorrectPath,
// 		};
// 	});
// };

// const updateAllVisited = () => {
// 	setMyState((prev) => {
// 		const newAllVisited = prev.allSquaresArray.find(
// 			(e) => !e.isVisited
// 		);
// 		if (!newAllVisited) {
// 			console.log("end All visited");
// 			return { ...prev, run: false };
// 		} else return prev;
// 	});
// };
// ==========================
// ==========================
// const moveBack = () => {
// 	setMyState((prev) => {
// 		const { currentIndex } = prev;
// 		if (prev.travelledPathIndex.length < 1) {
// 			console.log(
// 				"travellength =",
// 				prev.travelledPathIndex.length
// 			);
// 			console.log("move back END..nothing avilable to moveback");
// 			// setRun(false);
// 			return { ...prev, run: false };
// 		}
// 		let updatedPath = [...prev.travelledPathIndex];
// 		let lastMove = updatedPath.pop();
// 		console.log(lastMove, "lastMove");
// 		const nextIndex = lastMove.from;
// 		const updatedSquaresArray = prev.allSquaresArray.map((e, i) => {
// 			e.isCurrent = false;
// 			if (i === nextIndex) {
// 				e.isCurrent = true;
// 			}
// 			if (i === currentIndex) {
// 				e.isVisited = true;
// 			}

// 			return e;
// 		});
// 		return {
// 			...prev,
// 			currentIndex: nextIndex,
// 			travelledPathIndex: [...updatedPath],
// 			allSquaresArray: updatedSquaresArray,
// 		};
// 	});
// };
// ==========================
// ==========================
// ==========================
// ==========================
// const moveForward = () => {
// 	setMyState((prev) => {
// 		const { currentIndex } = prev;

// 		const { allNeighboursIndex } =
// 			prev.allSquaresArray[currentIndex];
// 		//
// 		const notVisitedNeighbours = allNeighboursIndex.filter(
// 			(e) => !prev.allSquaresArray[e].isVisited
// 		);
// 		console.log(notVisitedNeighbours, "not visited");
// 		if (notVisitedNeighbours.length < 1) {
// 			console.log("move back");
// 			moveBack();
// 			if (prev.travelledPathIndex.length < 1) {
// 				console.log(
// 					"travellength =",
// 					prev.travelledPathIndex.length
// 				);
// 				console.log("move back END");
// 				// setRun(false);
// 				return { ...prev, run: false };
// 			}
// 			let updatedPath = [...prev.travelledPathIndex];
// 			let lastMove = updatedPath.pop();
// 			console.log(lastMove, "lastMove");
// 			const nextIndex = lastMove.from;
// 			const updatedSquaresArray = prev.allSquaresArray.map(
// 				(e, i) => {
// 					if (i === currentIndex) {
// 						e.isVisited = true;
// 					}
// 					if (i === nextIndex) {
// 						e.isCurrent = true;
// 					} else e.isCurrent = false;
// 					return e;
// 				}
// 			);
// 			return {
// 				...prev,
// 				currentIndex: nextIndex,
// 				travelledPathIndex: [...updatedPath],
// 				allSquaresArray: updatedSquaresArray,
// 			};
// 		}
// 		//
// 		let nextIndex = Math.floor(
// 			Math.random() * notVisitedNeighbours.length
// 		);
// 		nextIndex = notVisitedNeighbours[nextIndex];
// 		console.log("currentIndex is ", currentIndex);
// 		console.log("moving from", currentIndex, "to", nextIndex);
// 		// console.log(currentIndex, nextIndex, allNeighboursIndex, "kk");
// 		const updatedSquaresArray = prev.allSquaresArray.map((e, i) => {
// 			if (i === currentIndex) {
// 				e.isVisited = true;
// 			}
// 			if (i === nextIndex) {
// 				e.isCurrent = true;
// 			} else e.isCurrent = false;
// 			return e;
// 		});
// 		//
// 		let updatedPath = [...prev.travelledPathIndex];
// 		updatedPath.push({ from: currentIndex, to: nextIndex });
// 		//
// 		return {
// 			...prev,
// 			currentIndex: nextIndex,
// 			travelledPathIndex: [...updatedPath],
// 			allSquaresArray: updatedSquaresArray,
// 		};
// 	});
// };
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// ==========================
// const moveNext0 = () => {
// 	const { currentIndex } = myState;
// 	const { allNeighboursIndex } = myState.allSquaresArray[currentIndex];
// 	let nextIndex = Math.floor(Math.random() * allNeighboursIndex.length);
// 	nextIndex = allNeighboursIndex[nextIndex];
// 	console.log("currentIndex is ", currentIndex);
// 	console.log("moving from", currentIndex, "to", nextIndex);
// 	console.log(currentIndex, nextIndex, allNeighboursIndex, "kk");
// 	const updatedSquaresArray = myState.allSquaresArray.map((e, i) => {
// 		if (i === currentIndex) {
// 			e.isVisited = true;
// 		}
// 		if (i === nextIndex) {
// 			e.isCurrent = true;
// 		} else e.isCurrent = false;
// 		return e;
// 	});

// 	setMyState({
// 		...myState,
// 		currentIndex: nextIndex,

// 		allSquaresArray: updatedSquaresArray,
// 	});
// 	// while (myState.currentIndex !== myState.endIndex) {
// 	// 	moveNext();
// 	// }
// };
// const moveNext = () => {
// 	setMyState((prev) => {
// 		const { currentIndex } = prev;

// 		// const newAllVisited = prev.allSquaresArray.find(
// 		// 	(e) => !e.isVisited
// 		// );
// 		// if (!newAllVisited) {
// 		// 	console.log("end All visited");
// 		// 	return { ...prev, run: false };
// 		// }
// 		// console.log(newAllVisited, "newallviisted");
// 		const { allNeighboursIndex } =
// 			prev.allSquaresArray[currentIndex];
// 		//
// 		const notVisitedNeighbours = allNeighboursIndex.filter(
// 			(e) => !prev.allSquaresArray[e].isVisited
// 		);
// 		console.log(notVisitedNeighbours, "not visited");
// 		if (notVisitedNeighbours.length < 1) {
// 			console.log("move back");
// 			if (prev.travelledPathIndex.length < 1) {
// 				console.log(
// 					"travellength =",
// 					prev.travelledPathIndex.length
// 				);
// 				console.log("move back END");
// 				// setRun(false);
// 				return { ...prev, run: false };
// 			}
// 			let updatedPath = [...prev.travelledPathIndex];
// 			let lastMove = updatedPath.pop();
// 			console.log(lastMove, "lastMove");
// 			const nextIndex = lastMove.from;
// 			const updatedSquaresArray = prev.allSquaresArray.map(
// 				(e, i) => {
// 					if (i === currentIndex) {
// 						e.isVisited = true;
// 					}
// 					if (i === nextIndex) {
// 						e.isCurrent = true;
// 					} else e.isCurrent = false;
// 					return e;
// 				}
// 			);
// 			return {
// 				...prev,
// 				currentIndex: nextIndex,
// 				travelledPathIndex: [...updatedPath],
// 				allSquaresArray: updatedSquaresArray,
// 			};
// 		}
// 		//
// 		let nextIndex = Math.floor(
// 			Math.random() * notVisitedNeighbours.length
// 		);
// 		nextIndex = notVisitedNeighbours[nextIndex];
// 		console.log("currentIndex is ", currentIndex);
// 		console.log("moving from", currentIndex, "to", nextIndex);
// 		// console.log(currentIndex, nextIndex, allNeighboursIndex, "kk");
// 		const updatedSquaresArray = prev.allSquaresArray.map((e, i) => {
// 			if (i === currentIndex) {
// 				e.isVisited = true;
// 			}
// 			if (i === nextIndex) {
// 				e.isCurrent = true;
// 			} else e.isCurrent = false;
// 			return e;
// 		});
// 		//
// 		let updatedPath = [...prev.travelledPathIndex];
// 		updatedPath.push({ from: currentIndex, to: nextIndex });
// 		//
// 		return {
// 			...prev,
// 			currentIndex: nextIndex,
// 			travelledPathIndex: [...updatedPath],
// 			allSquaresArray: updatedSquaresArray,
// 		};
// 	});
// };
// ==========================
// ==========================
// const moveNext_WORKING = () => {
// 	setMyState((prev) => {
// 		console.log("travellength =", prev.travelledPathIndex.length);
// 		const { currentIndex } = prev;
// 		// if (prev.allSquaresArray[currentIndex].isEnd) {
// 		// 	console.log("end 299 reached");
// 		// 	return { ...prev, run: false };
// 		// }
// 		const newAllVisited = prev.allSquaresArray.find(
// 			(e) => !e.isVisited
// 		);
// 		if (!newAllVisited) {
// 			console.log("end All visited");
// 			return { ...prev, run: false };
// 		}
// 		console.log(newAllVisited, "newallviisted");
// 		const { allNeighboursIndex } =
// 			prev.allSquaresArray[currentIndex];
// 		//
// 		const notVisitedNeighbours = allNeighboursIndex.filter(
// 			(e) => !prev.allSquaresArray[e].isVisited
// 		);
// 		console.log(notVisitedNeighbours, "not visited");
// 		if (notVisitedNeighbours.length < 1) {
// 			console.log("move back");
// 			if (prev.travelledPathIndex.length < 1) {
// 				console.log(
// 					"travellength =",
// 					prev.travelledPathIndex.length
// 				);
// 				console.log("move back END");
// 				// setRun(false);
// 				return { ...prev, run: false };
// 			}
// 			let updatedPath = [...prev.travelledPathIndex];
// 			let lastMove = updatedPath.pop();
// 			console.log(lastMove, "lastMove");
// 			const nextIndex = lastMove.from;
// 			const updatedSquaresArray = prev.allSquaresArray.map(
// 				(e, i) => {
// 					if (i === currentIndex) {
// 						e.isVisited = true;
// 					}
// 					if (i === nextIndex) {
// 						e.isCurrent = true;
// 					} else e.isCurrent = false;
// 					return e;
// 				}
// 			);
// 			return {
// 				...prev,
// 				currentIndex: nextIndex,
// 				travelledPathIndex: [...updatedPath],
// 				allSquaresArray: updatedSquaresArray,
// 			};
// 		}
// 		//
// 		let nextIndex = Math.floor(
// 			Math.random() * notVisitedNeighbours.length
// 		);
// 		nextIndex = notVisitedNeighbours[nextIndex];
// 		console.log("currentIndex is ", currentIndex);
// 		console.log("moving from", currentIndex, "to", nextIndex);
// 		// console.log(currentIndex, nextIndex, allNeighboursIndex, "kk");
// 		const updatedSquaresArray = prev.allSquaresArray.map((e, i) => {
// 			if (i === currentIndex) {
// 				e.isVisited = true;
// 			}
// 			if (i === nextIndex) {
// 				e.isCurrent = true;
// 			} else e.isCurrent = false;
// 			return e;
// 		});
// 		//
// 		let updatedPath = [...prev.travelledPathIndex];
// 		updatedPath.push({ from: currentIndex, to: nextIndex });
// 		//
// 		return {
// 			...prev,
// 			currentIndex: nextIndex,
// 			travelledPathIndex: [...updatedPath],
// 			allSquaresArray: updatedSquaresArray,
// 		};
// 	});
// };
// ==========================
