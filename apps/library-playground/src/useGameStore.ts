import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useGameStore = create(
	combine(
		{ history: [Array(9).fill(null)], xIsNext: true, currentMove: 0 },
		(set) => {
			return {
				setHistory: (
					newHistory: string[][] | ((prevHistory: string[][]) => string[][]),
				) =>
					set((state) => ({
						history:
							typeof newHistory === "function"
								? newHistory(state.history)
								: newHistory,
					})),
				setXIsNext: (next: boolean | ((prev: boolean) => boolean)) => {
					set((state) => ({
						xIsNext: typeof next === "function" ? next(state.xIsNext) : next,
					}));
				},
				setCurrentMove: (move: number | ((prev: number) => number)) =>
					set((state) => ({
						currentMove:
							typeof move === "function" ? move(state.currentMove) : move,
					})),
			};
		},
	),
);

export function calculateWinner(squares: string[]) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}

	return null;
}

// 남은 턴 수 세기
export function calculateTurns(squares: string[]) {
	return squares.filter((square) => !square).length;
}

export function calculateStatus(
	winner: string | null,
	turns: number,
	player: string,
) {
	if (!winner && !turns) return "Draw";
	if (winner) return `Winner ${winner}`;
	return `Next player: ${player}`;
}
