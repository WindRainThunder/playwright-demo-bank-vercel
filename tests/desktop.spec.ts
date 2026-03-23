import { test, expect } from '@playwright/test';

test.describe('Desktop', () => {
    test('desktop - quick payment correct data', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('tester12');
        await page.getByTestId('password-input').fill('tester1@');
        await page.getByTestId('login-button').click();
        await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
    });
});