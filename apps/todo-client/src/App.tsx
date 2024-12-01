import { useCallback, useEffect, useState } from "react";
import { todoAPI } from "./api";

// 이후에 DB의 auto increment ID로 대체할 예정
type Todo = {
	id: number;
	title: string;
	completed: boolean;
};

function TodoApp() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodoValue, setNewTodoValue] = useState<string>("");
	// 편집중이 아니라면 null, 편집중이라면 해당 Todo의 ID
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editValue, setEditValue] = useState<string>("");

	// 현재는 하나의 사용자만을 대상으로 하기 때문에 고정값
	// 이후에 로그인 시스템을 만들면서 현재 로그인된 사용자의 ID로 대체할 예정
	const userId = 1;

	// Todo 목록 조회
	const fetchTodos = useCallback(async () => {
		if (!userId) return;
		try {
			const response = await todoAPI.get(`/todos?userId=${userId}`);
			setTodos(response.data);
		} catch (error) {
			console.error("할 일 목록 조회 실패:", error);
		}
	}, []);

	// 컴포넌트 마운트 시 Todo 목록 조회
	useEffect(() => {
		if (userId) {
			fetchTodos();
		}
	}, [fetchTodos]);

	const addTodo = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!userId || !newTodoValue.trim()) {
			alert("할 일을 입력하세요.");
			return;
		}

		try {
			const response = await todoAPI.post("/todos", {
				title: newTodoValue.trim(),
				userId: userId,
				completed: false,
			});
			setTodos([...todos, response.data]);
			setNewTodoValue("");
		} catch (error) {
			console.error("할 일 추가 실패:", error);
		}
	};

	const toggleTodo = async (todo: Todo) => {
		try {
			const response = await todoAPI.patch(`/todos/${todo.id}`, {
				completed: !todo.completed,
			});
			setTodos(todos.map((t) => (t.id === todo.id ? response.data : t)));
		} catch (error) {
			console.error("할 일 상태 변경 실패:", error);
		}
	};

	const deleteTodo = async (id: number) => {
		try {
			await todoAPI.delete(`/todos/${id}`);
			setTodos(todos.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error("할 일 삭제 실패:", error);
		}
	};

	// 편집 모드 시작
	const startEdit = (todo: Todo) => {
		setEditingId(todo.id);
		setEditValue(todo.title);
	};

	// 편집 저장
	const saveEdit = async () => {
		if (editingId === null) return;

		try {
			const response = await todoAPI.patch(`/todos/${editingId}`, {
				title: editValue.trim(),
			});
			setTodos(
				todos.map((todo) => (todo.id === editingId ? response.data : todo)),
			);
			cancelEdit();
		} catch (error) {
			console.error("할 일 수정 실패:", error);
		}
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
								onChange={() => toggleTodo(todo)}
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
										{todo.title}
									</label>
									<button
										type="button"
										onClick={() => startEdit(todo)}
										aria-label={`Edit ${todo.title}`}
									>
										수정
									</button>
								</>
							)}
						</div>
						<button
							type="button"
							onClick={() => deleteTodo(todo.id)}
							aria-label={`Delete ${todo.title}`}
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
