import { useState } from "react";

type RegisterForm = {
	username: string;
	password: string;
	confirmPassword: string;
};

function Register() {
	const [form, setForm] = useState<RegisterForm>({
		username: "",
		password: "",
		confirmPassword: "",
	});

	// 입력값 변경 핸들러
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	// 회원가입 시도
	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("회원가입 시도", form);
	};

	return (
		<main>
			<h1>회원가입</h1>
			<form onSubmit={handleRegister}>
				<div>
					<label htmlFor="username">사용자 이름</label>
					<input
						type="text"
						id="username"
						name="username"
						value={form.username}
						onChange={handleChange}
						placeholder="사용자 이름을 입력하세요"
						required
					/>
				</div>
				<div>
					<label htmlFor="password">비밀번호</label>
					<input
						type="password"
						id="password"
						name="password"
						value={form.password}
						onChange={handleChange}
						placeholder="비밀번호를 입력하세요"
						required
					/>
				</div>
				<div>
					<label htmlFor="confirmPassword">비밀번호 확인</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={form.confirmPassword}
						onChange={handleChange}
						placeholder="비밀번호를 다시 입력하세요"
						required
					/>
				</div>
				<button type="submit">회원가입</button>
			</form>
			<p>
				이미 계정이 있으신가요? <a href="/login">로그인</a>
			</p>
		</main>
	);
}

export default Register;
