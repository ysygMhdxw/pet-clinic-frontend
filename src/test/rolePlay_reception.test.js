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
    await page.getByRole('button', { name: '2 安排预约 根据宠物的情况和需要，为宠物安排预约，包括兽医检查、诊断和治疗等服务。' }).click();
    await page.getByRole('button', { name: '3 提供信息 向宠物主任提供有关宠物健康和护理的信息，如疫苗接种、寄生虫预防、营养饮食等方面的建议。' }).click();
    await page.getByText('导医咨询').click();
    await page.getByTitle('收费').getByText('收费').click();
    await page.getByRole('button', { name: '2 计算费用 根据选择的治疗方案和医生处方中的药品进行费用计算' }).click();
    await page.getByRole('button', { name: '3 收取费用 通过现金支付或数字支付的方式来收宠物取治疗费用' }).click();
});