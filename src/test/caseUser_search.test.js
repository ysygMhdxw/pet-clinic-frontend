import { test } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByPlaceholder('请输入用户名').click();
    await page.getByPlaceholder('请输入用户名').fill('123');
    await page.getByPlaceholder('请输入密码').click();
    await page.getByPlaceholder('请输入密码').fill('123');
    await page.getByRole('button', { name: '登 录' }).click();
    await page.getByRole('link', { name: '进入前台管理' }).click();
    await page.getByText('职能学习').click();
    await page.getByText('病例学习').click();
    await page.locator('div').filter({ hasText: /^传染病$/ }).locator('span').nth(1).click();
    await page.locator('div').filter({ hasText: /^猫泛白细胞减少症$/ }).click();
    await page.getByText('犬传染性肝炎').click();
    await page.locator('div').filter({ hasText: /^犬瘟热$/ }).click();
    await page.getByText('查看病例详情').click();
});