import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.getByRole("textbox", { name: "사용자 이름" }).click();
  await page.getByRole("textbox", { name: "사용자 이름" }).fill("test");
  await page.getByRole("textbox", { name: "사용자 이름" }).press("Tab");
  await page.getByRole("textbox", { name: "비밀번호" }).fill("123");
  await page.getByRole("button", { name: "로그인" }).click();
  await expect(page.getByRole("main")).toContainText(
    "잘못된 사용자명 또는 비밀번호입니다."
  );
});
