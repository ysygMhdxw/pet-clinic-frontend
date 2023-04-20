import { test} from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: '立即注册' }).click();
    await page.getByPlaceholder('请输入用户名').click();
    await page.getByPlaceholder('请输入用户名').fill('123');
    await page.getByPlaceholder('请输入密码').click();
    await page.getByPlaceholder('请输入密码').fill('123');
    await page.getByPlaceholder('请确认密码').click();
    await page.getByPlaceholder('请确认密码').fill('123');
    await page.getByRole('button', { name: '注 册' }).click();
});