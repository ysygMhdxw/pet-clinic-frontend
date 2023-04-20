import { test} from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByPlaceholder('请输入用户名').click();
    await page.getByPlaceholder('请输入用户名').fill('123');
    await page.getByPlaceholder('请输入密码').click();
    await page.getByPlaceholder('请输入密码').fill('123');
    await page.getByRole('button', { name: '登 录' }).click();
    await page.getByRole('link', { name: '进入前台管理' }).click();
    await page.getByText('职能学习').click();
    await page.getByText('角色扮演').click();
    await page.getByRole('menuitem', { name: '前台' }).getByText('前台').click();
});