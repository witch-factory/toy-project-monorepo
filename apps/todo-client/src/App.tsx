import { useState } from "react";

// 이후에 DB의 auto increment ID로 대체할 예정
type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodoValue, setNewTodoValue] = useState<string>("");

	const addTodo = () => {
		if (newTodoValue.trim()) {
			setTodos([
				...todos,
				{ id: Date.now(), text: newTodoValue, completed: false },
			]);
			setNewTodoValue("");
		}
	};

	const toggleTodo = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	};

	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<main className="todo-app">
			<h1>Todo List</h1>
			<input
				type="text"
				value={newTodoValue}
				onChange={(e) => setNewTodoValue(e.target.value)}
				placeholder="Add a new task"
				className="todo-input"
			/>
			<button onClick={addTodo} className="todo-add-button" type="button">
				Add
			</button>
			<ul className="todo-list">
				{todos.map((todo) => (
					<li key={todo.id} className="todo-item">
						<span
							onKeyDown={() => toggleTodo(todo.id)}
							onClick={() => toggleTodo(todo.id)}
							className={`todo-text ${todo.completed ? "completed" : ""}`}
						>
							{todo.text}
						</span>
						<button
							type="button"
							onClick={() => deleteTodo(todo.id)}
							className="todo-delete-button"
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</main>
	);
}

export default App;
