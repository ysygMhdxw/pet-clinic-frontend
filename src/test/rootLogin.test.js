import { test } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByPlaceholder('请输入用户名').click();
    await page.getByPlaceholder('请输入用户名').fill('root');
    await page.getByPlaceholder('请输入密码').click();
    await page.getByPlaceholder('请输入密码').fill('123456');
    await page.getByRole('button', { name: '登 录' }).click();
});