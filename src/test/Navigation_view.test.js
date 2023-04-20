import { test} from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByPlaceholder('请输入用户名').click();
    await page.getByPlaceholder('请输入用户名').fill('123');
    await page.getByPlaceholder('请输入密码').click();
    await page.getByPlaceholder('请输入密码').fill('123');
    await page.getByRole('button', { name: '登 录' }).click();
    await page.getByRole('link', { name: '进入前台管理' }).click();
    await page.getByText('3D导览科室信息').click();
    await page.getByRole('cell', { name: '化验室' }).click();
    await page.getByRole('cell', { name: '包括对送检样本的预处理，对相应样本进行血常规、血液生化、电解质、血气、血凝指标、激素指标、尿常规、微生物学检查、药敏、皮肤刮片、粪便检查、传染病检查等检查操作流程。' }).click();
    await page.getByRole('row', { name: '5 化验室 包括对送检样本的预处理，对相应样本进行血常规、血液生化、电解质、血气、血凝指标、激素指标、尿常规、微生物学检查、药敏、皮肤刮片、粪便检查、传染病检查等检查操作流程。 助理 执业兽医师 查看' }).getByRole('cell', { name: '助理 执业兽医师' }).click();
    await page.getByRole('row', { name: '5 化验室 包括对送检样本的预处理，对相应样本进行血常规、血液生化、电解质、血气、血凝指标、激素指标、尿常规、微生物学检查、药敏、皮肤刮片、粪便检查、传染病检查等检查操作流程。 助理 执业兽医师 查看' }).getByText('查看').click();
    await page.locator('canvas').click({
        position: {
            x: 577,
            y: 223
        }
    });
    await page.getByRole('cell', { name: '血常规分析仪', exact: true }).click();
    await page.getByRole('cell', { name: '尿液分析仪', exact: true }).click();
    await page.getByRole('cell', { name: '血液常规检查' }).click();
    await page.getByRole('cell', { name: '尿常规检查' }).click();
    await page.getByRole('cell', { name: '20' }).click();
    await page.getByRole('button', { name: '返 回' }).click();
    await page.getByRole('row', { name: '7 专科检查室 包括对眼科、骨科、神经科、心脏科等专科疾病的检查，如眼科（检眼镜检查、眼压检查、裂隙灯检查、眼底检查、泪液分泌量检查等）、心脏科检查（心脏听诊、心电图检查等）、神经学检查（步态检查、各种反射检查等）等。 执业兽医师 查看' }).getByText('查看').click();
    await page.locator('canvas').click({
        position: {
            x: 667,
            y: 399
        }
    });
    await page.getByRole('cell', { name: '眼压计' }).click();
    await page.getByRole('cell', { name: '泪液分泌检查', exact: true }).click();
    await page.getByRole('cell', { name: '25' }).click();
    await page.getByRole('button', { name: '返 回' }).click();
});