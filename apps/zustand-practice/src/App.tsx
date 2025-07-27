import "./App.css";
import { create } from "zustand";

type BearState = {
	bears: number;
	increasePopulation: () => void;
	removeAllBears: () => void;
	updateBears: (newBears: number) => void;
};

const useStore = create<BearState>((set) => ({
	bears: 0,
	increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
	removeAllBears: () => set({ bears: 0 }),
	updateBears: (newBears) => set({ bears: newBears }),
}));

function App() {
	const bears = useStore((state) => state.bears);
	const increasePopulation = useStore((state) => state.increasePopulation);

	return (
		<div className="card">
			<button type="button" onClick={increasePopulation}>
				There are {bears} bears in the zoo
			</button>
		</div>
	);
}

export default App;
