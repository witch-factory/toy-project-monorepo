import Board from "./Board";
import { useGameStore } from "./useGameStore";

function App() {
	const { history, setHistory, currentMove, setCurrentMove } = useGameStore();

	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	const handlePlay = (nextSquares: string[]) => {
		const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	};

	function jumpTo(nextMove: number) {
		setCurrentMove(nextMove);
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				fontFamily: "monospace",
			}}
		>
			<div>
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div style={{ marginLeft: "1rem" }}>
				<ol>
					{history.map((squares, index) => {
						const description =
							index > 0 ? `Go to move #${index}` : "Go to game start";

						return (
							<li key={index}>
								<button type="button" onClick={() => jumpTo(index)}>
									{description}
								</button>
							</li>
						);
					})}
				</ol>
			</div>
		</div>
	);
}

export default App;
