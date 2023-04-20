import { test } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByPlaceholder('请输入用户名').click();
    await page.getByPlaceholder('请输入用户名').fill('123');
    await page.getByPlaceholder('请输入密码').click();
    await page.getByPlaceholder('请输入密码').fill('123');
    await page.getByRole('button', { name: '登 录' }).click();
    await page.getByRole('link', { name: '进入前台管理' }).click();
    await page.getByText('测试学习').click();
    await page.getByText('做题').click();
    await page.getByRole('row', { name: '犬瘟热是由犬瘟热病毒引起的主要发生于犬的一种急性，接触性传染病，犬瘟热最易感染的年龄阶段是 传染病 单选题 查看' }).getByRole('button', { name: '查看' }).click();
    await page.getByText('断奶后至一岁').click();
    await page.getByRole('button', { name: '查看答案' }).click();
    await page.getByRole('button', { name: '返回' }).click();
});