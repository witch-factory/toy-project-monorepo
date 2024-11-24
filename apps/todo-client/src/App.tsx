import { useState } from "react";
import { subtract } from "@toy-monorepo/shared";

// 이후에 DB의 auto increment ID로 대체할 예정
type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodoValue, setNewTodoValue] = useState<string>("");

	const addTodo = (e: React.FormEvent) => {
		e.preventDefault();
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
			<h1>할 일 목록</h1>
			<h2>{subtract(1, 2)}</h2>
			<form onSubmit={addTodo} className="todo-form" aria-label="Add Todo Form">
				<label htmlFor="new-todo" className="sr-only">
					새로운 할 일
				</label>
				<input
					id="new-todo"
					type="text"
					value={newTodoValue}
					onChange={(e) => setNewTodoValue(e.target.value)}
					placeholder="Add a new task"
					className="todo-input"
					aria-label="New Task Input"
				/>
				<button className="todo-add-button" type="submit">
					추가
				</button>
			</form>
			<ul className="todo-list" aria-live="polite">
				{todos.map((todo) => (
					<li key={todo.id} className="todo-item">
						<div className="todo-container">
							<input
								id={`todo-${todo.id}`}
								type="checkbox"
								checked={todo.completed}
								onChange={() => toggleTodo(todo.id)}
								className="todo-checkbox"
								aria-labelledby={`todo-label-${todo.id}`}
							/>
							<label
								id={`todo-label-${todo.id}`}
								htmlFor={`todo-${todo.id}`}
								className={`todo-text ${todo.completed ? "completed" : ""}`}
							>
								{todo.text}
							</label>
						</div>
						<button
							type="button"
							onClick={() => deleteTodo(todo.id)}
							className="todo-delete-button"
							aria-label={`Delete ${todo.text}`}
						>
							삭제
						</button>
					</li>
				))}
			</ul>
		</main>
	);
}

export default App;
