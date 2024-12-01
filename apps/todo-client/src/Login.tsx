import { FormEvent, useState } from "react";

type LoginForm = {
	username: string;
	password: string;
};

function Login() {
	const [user, setUser] = useState<LoginForm>({
		username: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		console.log("로그인 시도", user);
	};

	return (
		<main>
			<h1>로그인</h1>
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
					/>
				</div>
				<button type="submit">로그인</button>
			</form>
			<p>
				계정이 없으신가요? <a href="/register">회원가입</a>
			</p>
		</main>
	);
}

export default Login;
