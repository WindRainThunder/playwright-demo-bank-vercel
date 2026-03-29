import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {
  test("login - correct credentials", async ({ page }) => {
    // Arrange
    const userName = "tester12";
    const userPassword = "tester1@";
    const url = "https://demo-bank.vercel.app/";
    const expectedResult = "Jan Demobankowy";

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userName);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("user-name")).toHaveText(expectedResult);
  });

  test("login - incorrect credentials", async ({ page }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/";
    const userName = "tester";
    const expectedResult = "identyfikator ma min. 8 znaków";

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userName);
    await page.getByTestId("login-input").blur();

    await expect(page.getByTestId("error-login-id")).toHaveText(expectedResult);
  });

  test("login - too short password", async ({ page }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/";
    const userName = "tester";
    const userPassword = "pass";
    const expectedResult = "hasło ma min. 8 znaków";

    await page.goto(url);
    await page.getByTestId("login-input").fill(userName);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("error-login-password")).toHaveText(
      expectedResult,
    );
  });
});
