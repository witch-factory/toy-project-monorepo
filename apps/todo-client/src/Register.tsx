import { FormEvent, useState } from "react";
import { authAPI, RegisterRequest, tokenManager } from "./api";
import { useNavigate } from "react-router";

function Register() {
  const [user, setUser] = useState<RegisterRequest>({
    username: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (user.password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (user.password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.register(user);

      if (response.data.success && response.data.data) {
        tokenManager.setToken(response.data.data.token);
        alert(response.data.message || "회원가입이 완료되었습니다!");
        navigate("/");
      } else {
        setError(response.data.error || "회원가입에 실패했습니다.");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.error || "회원가입 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>회원가입</h1>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <form onSubmit={handleRegister}>
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
            minLength={6}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "처리중..." : "회원가입"}
        </button>
      </form>

      <p>
        이미 계정이 있으신가요? <a href="/login">로그인</a>
      </p>
    </main>
  );
}

export default Register;
