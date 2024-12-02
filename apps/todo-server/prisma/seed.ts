import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// User 데이터 생성
	const user1 = await prisma.user.create({
		data: {
			username: "user1",
			password: "password123", // 실제 서비스에서는 해시된 비밀번호 사용
			todos: {
				create: [{ title: "공부하기" }, { title: "책 읽기", completed: true }],
			},
		},
	});

	const user2 = await prisma.user.create({
		data: {
			username: "user2",
			password: "password456",
			todos: {
				create: [{ title: "운동하기" }, { title: "발표 자료 준비" }],
			},
		},
	});

	console.log("시드 데이터 생성 완료:", { user1, user2 });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
