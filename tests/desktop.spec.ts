import { test, expect } from '@playwright/test';

test.describe("Desktop tests", () => {
    test('desktop - quick payment correct data', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('tester12');
        await page.getByTestId('password-input').fill('tester1@');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption('1');
        await page.locator('#widget_1_transfer_amount').fill('50');
        await page.locator('#widget_1_transfer_title').fill('Pizza');
        await page.locator('#execute_btn').click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Jan Demobankowy - 50,00PLN - Pizza');
    });

    test('desktop - phone top up', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('tester12');
        await page.getByTestId('password-input').fill('tester1@');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_topup_receiver').selectOption('502 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('25');
        await page.locator('#widget_1_topup_agreement').click();
        await page.locator('#execute_phone_btn').click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 25,00PLN na numer 502 xxx xxx');
    });

    test.only('desktop - check account number', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('tester12');
        await page.getByTestId('password-input').fill('tester1@');
        await page.getByTestId('login-button').click();

        await expect(page.locator('#account_number')).toHaveText('(41 4100 1111 1111 1111 1111 0000)');


    });

    test.only('desktop - check avaliable funds', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('tester12');
        await page.getByTestId('password-input').fill('tester1@');
        await page.getByTestId('login-button').click();

        const decimal_value = await page.locator('#decimal_value').textContent();
        const money_value = await page.locator('#money_value').textContent();
        const currency_wrapper = await page.locator('#accounts_list > article > div.row.account-details.box-white.table-alike > div.table-header > div > div > span.account-amount.table-grid-26.table-grid-mt-48.table-grid-ms-48 > span.fancy-amount > span.currency-wrapper').textContent();
        const result = money_value + '.' + decimal_value + ' ' + currency_wrapper

        await expect(result).toBe('13159.20 PLN');
    });

    test.only('desktop - installment loan', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('tester12');
        await page.getByTestId('password-input').fill('tester1@');
        await page.getByTestId('login-button').click();



    });

})
