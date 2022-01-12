import LeftControlBar from "./components/LeftControlBar";
import Navbar from "./components/Navbar";
import SquareItem from "./components/SquareItem";

function App() {
	return (
		<div className="container">
			<Navbar />
			<LeftControlBar />
			<SquareItem />
		</div>
	);
}

export default App;
