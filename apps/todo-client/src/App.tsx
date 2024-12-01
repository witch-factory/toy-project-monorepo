import { useState } from "react";

// 이후에 DB의 auto increment ID로 대체할 예정
type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

function TodoApp() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodoValue, setNewTodoValue] = useState<string>("");
	// 편집중이 아니라면 null, 편집중이라면 해당 Todo의 ID
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editValue, setEditValue] = useState<string>("");

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

	// 편집 모드 시작
	const startEdit = (todo: Todo) => {
		setEditingId(todo.id);
		setEditValue(todo.text);
	};

	// 편집 저장
	const saveEdit = () => {
		if (editingId === null) return;

		setTodos(
			todos.map((todo) =>
				todo.id === editingId ? { ...todo, text: editValue.trim() } : todo,
			),
		);
		cancelEdit();
	};

	// 편집 취소
	const cancelEdit = () => {
		setEditingId(null);
		setEditValue("");
	};

	return (
		<main>
			<h1>할 일 목록</h1>
			<form onSubmit={addTodo} aria-label="Add Todo Form">
				<label htmlFor="new-todo">새로운 할 일</label>
				<input
					id="new-todo"
					type="text"
					value={newTodoValue}
					onChange={(e) => setNewTodoValue(e.target.value)}
					placeholder="New Task"
					aria-label="New Task Input"
				/>
				<button type="submit">추가</button>
			</form>
			<ul aria-live="polite">
				{todos.map((todo) => (
					<li key={todo.id}>
						<div>
							<input
								id={`todo-${todo.id}`}
								type="checkbox"
								checked={todo.completed}
								onChange={() => toggleTodo(todo.id)}
							/>
							{editingId === todo.id ? (
								// 편집 모드
								<div>
									<input
										type="text"
										value={editValue}
										onChange={(e) => setEditValue(e.target.value)}
										aria-label="Edit todo text"
									/>
									<button
										type="button"
										onClick={saveEdit}
										aria-label="Save edit"
									>
										저장
									</button>
									<button
										type="button"
										onClick={cancelEdit}
										aria-label="Cancel edit"
									>
										취소
									</button>
								</div>
							) : (
								// 일반 모드
								<>
									<label
										id={`todo-label-${todo.id}`}
										htmlFor={`todo-${todo.id}`}
										style={
											todo.completed
												? { textDecoration: "line-through" }
												: undefined
										}
									>
										{todo.text}
									</label>
									<button
										type="button"
										onClick={() => startEdit(todo)}
										aria-label={`Edit ${todo.text}`}
									>
										수정
									</button>
								</>
							)}
						</div>
						<button
							type="button"
							onClick={() => deleteTodo(todo.id)}
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

export default TodoApp;
