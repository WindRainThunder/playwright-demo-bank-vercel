import { test, expect } from "@playwright/test";

test.describe("Desktop tests", () => {
  test.beforeEach(async ({ page }) => {
    // Arrange
    const userName = "tester12";
    const userPassword = "tester1@";

    // Act
    await page.goto("/");
    await page.getByTestId("login-input").fill(userName);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
  });

  test("desktop - quick payment correct data", async ({ page }) => {
    // Arrange
    const expectedResult =
      "Przelew wykonany! Jan Demobankowy - 50,00PLN - Pizza";

    //Act
    await page.locator("#widget_1_transfer_receiver").selectOption("1");
    await page.locator("#widget_1_transfer_amount").fill("50");
    await page.locator("#widget_1_transfer_title").fill("Pizza");
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(expectedResult);
  });

  test("desktop - phone top up", async ({ page }) => {
    // Arrange
    const expectedResult =
      "Doładowanie wykonane! 25,00PLN na numer 502 xxx xxx";

    // Act
    await page.locator("#widget_1_topup_receiver").selectOption("502 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("25");
    await page.locator("#widget_1_topup_agreement").click();
    await page.locator("#execute_phone_btn").click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(expectedResult);
  });

  test("desktop - check account number", async ({ page }) => {
    // Arrange
    const expectedResult = "(41 4100 1111 1111 1111 1111 0000)";
    //Assert
    await expect(page.locator("#account_number")).toHaveText(expectedResult);
  });

  test("desktop - check avaliable funds", async ({ page }) => {
    // Arrange
    const expectedResult = "13159.20 PLN";

    // Act
    const decimal_value = await page.locator("#decimal_value").textContent();
    const money_value = await page.locator("#money_value").textContent();
    const currency_wrapper = await page
      .locator(
        "#accounts_list > article > div.row.account-details.box-white.table-alike > div.table-header > div > div > span.account-amount.table-grid-26.table-grid-mt-48.table-grid-ms-48 > span.fancy-amount > span.currency-wrapper",
      )
      .textContent();
    const result = money_value + "." + decimal_value + " " + currency_wrapper;

    // Assert
    await expect(result).toBe(expectedResult);
  });

  test("desktop - installment loan", async ({ page }) => {
    // Arrange
    const expectedResult = "13 070,83 PLN";

    // Act
    await page.getByText("kredyt ratalny").click();
    const decimal_value = await page
      .locator(
        "#aggregation_list > section:nth-child(5) > div.dashboard-list > article:nth-child(1) > div.row.account-header.box-white.table-alike > div > div > div > span.account-amount.table-grid-26.table-grid-mt-48.table-grid-ms-48 > span.fancy-amount > span.decimal-wrapper",
      )
      .textContent();
    const money_value = await page
      .locator(
        "#aggregation_list > section:nth-child(5) > div.dashboard-list > article:nth-child(1) > div.row.account-header.box-white.table-alike.active > div > div > div > span.account-amount.table-grid-26.table-grid-mt-48.table-grid-ms-48 > span.fancy-amount > span.value-wrapper",
      )
      .textContent();
    const currency_wrapper = await page
      .locator(
        "#aggregation_list > section:nth-child(5) > div.dashboard-list > article:nth-child(1) > div.row.account-header.box-white.table-alike.active > div > div > div > span.account-amount.table-grid-26.table-grid-mt-48.table-grid-ms-48 > span.fancy-amount > span.currency-wrapper",
      )
      .textContent();
    let result;

    if (money_value && decimal_value) {
      result = money_value + decimal_value + " " + currency_wrapper;
    } else {
      return "NO DATA";
    }

    // Assert
    if (result) {
      await expect(result).toBe(expectedResult);
    }
  });
});
