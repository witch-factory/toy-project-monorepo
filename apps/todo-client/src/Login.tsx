import { FormEvent, useState } from "react";
import { authAPI, LoginRequest, tokenManager } from "./api";
import { useNavigate } from "react-router";

function Login() {
  const [user, setUser] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login(user);

      if (response.data.success && response.data.data) {
        tokenManager.setToken(response.data.data.token);
        alert(response.data.message || "로그인 성공!");
        navigate("/");
      } else {
        setError(response.data.error || "로그인에 실패했습니다.");
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>로그인</h1>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">사용자 이름</label>
          <input
            id="username"
            name="username"
            type="text"
            value={user.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
      <p>
        계정이 없으신가요? <a href="/register">회원가입</a>
      </p>
    </main>
  );
}

export default Login;
