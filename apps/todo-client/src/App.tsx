import { useCallback, useEffect, useState } from "react";
import {
  todoAPI,
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  tokenManager,
  authAPI,
  User,
} from "./api";
import { useNavigate } from "react-router";

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoValue, setNewTodoValue] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 현재 사용자 정보 가져오기
  const fetchUser = useCallback(async () => {
    try {
      const response = await authAPI.getMe();
      if (response.data.success && response.data.data) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("사용자 정보 조회 실패:", error);
      tokenManager.removeToken();
      navigate("/login");
    }
  }, []);

  // Todo 목록 조회
  const fetchTodos = useCallback(async () => {
    try {
      const response = await todoAPI.getTodos();
      if (response.data.success && response.data.data) {
        setTodos(response.data.data);
      }
    } catch (error) {
      console.error("할 일 목록 조회 실패:", error);
    }
  }, []);

  // 컴포넌트 마운트 시 사용자 정보와 Todo 목록 조회
  useEffect(() => {
    const init = async () => {
      if (!tokenManager.getToken()) {
        navigate("/login");
        return;
      }

      await fetchUser();
      await fetchTodos();
      setLoading(false);
    };

    init();
  }, [fetchUser, fetchTodos]);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoValue.trim()) {
      alert("할 일을 입력하세요.");
      return;
    }

    try {
      const data: CreateTodoRequest = {
        title: newTodoValue.trim(),
      };
      const response = await todoAPI.createTodo(data);
      if (response.data.success && response.data.data) {
        setTodos([response.data.data, ...todos]);
        setNewTodoValue("");
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "할 일 추가에 실패했습니다.");
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      const response = await todoAPI.toggleTodo(todo.id);
      if (response.data.success && response.data.data) {
        setTodos(
          todos.map((t) => (t.id === todo.id ? response.data.data! : t))
        );
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "할 일 상태 변경에 실패했습니다.");
    }
  };

  const deleteTodo = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await todoAPI.deleteTodo(id);
      if (response.data.success) {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "할 일 삭제에 실패했습니다.");
    }
  };

  // 편집 모드 시작
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  // 편집 저장
  const saveEdit = async () => {
    if (editingId === null || !editValue.trim()) return;

    try {
      const data: UpdateTodoRequest = { title: editValue.trim() };
      const response = await todoAPI.updateTodo(editingId, data);
      if (response.data.success && response.data.data) {
        setTodos(
          todos.map((todo) =>
            todo.id === editingId ? response.data.data! : todo
          )
        );
        cancelEdit();
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "할 일 수정에 실패했습니다.");
    }
  };

  // 편집 취소
  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  // 로그아웃
  const handleLogout = () => {
    tokenManager.removeToken();
    navigate("/login");
  };

  if (loading) {
    return <div>로딩중...</div>;
  }

  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1>할 일 목록</h1>
        <div>
          <span>안녕하세요, {user?.username}님!</span>
          <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
            로그아웃
          </button>
        </div>
      </div>

      <form onSubmit={addTodo} aria-label="Add Todo Form">
        <label htmlFor="new-todo">새로운 할 일</label>
        <input
          id="new-todo"
          type="text"
          value={newTodoValue}
          onChange={(e) => setNewTodoValue(e.target.value)}
          placeholder="할 일을 입력하세요"
          aria-label="New Task Input"
        />
        <button type="submit">추가</button>
      </form>

      {todos.length === 0 ? (
        <p>할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
      ) : (
        <ul aria-live="polite">
          {todos.map((todo) => (
            <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  id={`todo-${todo.id}`}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                />
                {editingId === todo.id ? (
                  // 편집 모드
                  <div style={{ flex: 1, display: "flex", gap: "0.5rem" }}>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      aria-label="Edit todo text"
                      style={{ flex: 1 }}
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
                      style={{
                        flex: 1,
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                        color: todo.completed ? "#888" : "inherit",
                      }}
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
                    <button
                      type="button"
                      onClick={() => deleteTodo(todo.id)}
                      aria-label={`Delete ${todo.title}`}
                      style={{ backgroundColor: "red" }}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default TodoApp;
