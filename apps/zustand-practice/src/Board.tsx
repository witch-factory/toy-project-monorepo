import Square from "./Square";
import {
	calculateStatus,
	calculateTurns,
	calculateWinner,
} from "./useGameStore";

type Props = {
	xIsNext: boolean;
	squares: string[];
	onPlay: (nextSquares: string[]) => void;
};

export default function Board({ xIsNext, squares, onPlay }: Props) {
	const winner = calculateWinner(squares);
	const turns = calculateTurns(squares);
	const status = calculateStatus(winner, turns, xIsNext ? "X" : "O");

	function handleClick(i: number) {
		if (squares[i] || winner) return;
		const nextSquares = squares.slice();
		nextSquares[i] = xIsNext ? "X" : "O";
		onPlay(nextSquares);
	}

	return (
		<>
			<div style={{ marginBottom: "0.5rem" }}>{status}</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gridTemplateRows: "repeat(3, 1fr)",
					width: "calc(3 * 2.5rem)",
					height: "calc(3 * 2.5rem)",
					border: "1px solid #999",
				}}
			>
				{squares.map((value, index) => (
					<Square
						key={index}
						value={value}
						onSquareClick={() => handleClick(index)}
					/>
				))}
			</div>
		</>
	);
}
