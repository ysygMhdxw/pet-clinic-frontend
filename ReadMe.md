# 虚拟宠物医院学习系统 前端

## 运行项目

### `npm install`
### `npm run start`

## 测试项目

### `npm install -D @playwright/test` 安装playwright
### `npx playwright codegen localhost:3000` 自动化生成测试脚本
### `npx playwright test` 运行test中写的测试脚本


## 项目接口完成情况
* ✔ 登录
* ✔ 注册
### 用户管理及认证
* ✔ 登录请求令牌
* ✔ 获取用户 (学生)列表
* ✔ 创建用户 (学生)
* ✔ 修改用户信息
* ✔ 删除用户 (支持批量)
### 3D导览
* ✔ 展示科室3D

### 职能学习
* ✔ 职能学习展示
### 病例管理
* ✔ 获取病例分类目录
* ✔ 获取所有病例基本信息
* ✔ 根据病历号获取单个病例基本信息
* ✔ 根据疾病名称获取所有病例基本信息
* ✔ 根据病历号获取单个病例的检查信息
---
* ✔ 新增单个病例基本信息
* ✔ 删除单个病例基本信息
* ✔ 修改单个病例基本信息
* ✔ 批量删除单个病例基本信息
* ✔ 新增单个病例检查信息
* ✔ 删除单个检查信息
* ✔ 批量删除检查信息
* ✔ 修改单个检查信息
### 测试管理
* ✔ 获取测试列表
* ✔ 创建测试
* ✔ 删除测试（支持批量）
### 试题管理
* ✔ 获取单个试题详情
* ✔ 获取试题列表
* 创建试题 (❓支持批量)
* ✔ 删除试题 (支持批量)
* ✔ 修改试题
### 测试成绩
* ❎提交测试成绩
* ❎根据用户id获取成绩列表
* ❎根据测试id获取成绩列表
### 系统管理
#### ❓人员管理
#### ❓职能学习管理
#### 用户管理
* ✔ 获取所有用户信息
* ✔ 根据用户ID修改用户信息
* ✔ 新建用户
* ✔ 根据用户ID删除用户
* ✔ 根据用户ID批量删除用户
#### 科室管理
* ✔ 获取所有科室信息
* ✔ 根据科室ID获取科室信息
* ✔ 根据科室ID获取科室器械信息
* ✔ 根据科室ID获取科室检查信息
* ✔ 根据科室ID修改科室信息
* ✔ 创建科室
* ✔ 根据科室ID删除科室信息
* ✔ 根据科室ID批量删除科室信息
#### 药品+疫苗管理
* ✔ 获取所有药品信息
* ✔ 根据药品ID获取药品信息
* ✔ 根据药品ID修改药品信息
* ✔ 创建药品
* ✔ 根据药品ID删除药品信息
* ✔ 根据药品ID批量删除药品信息
#### 器械管理
* ✔ 获取所有器械信息
* ✔ 根据器械ID获取器械信息
* ✔ 根据器械ID修改器械信息
* ✔ 创建器械
* ✔ 根据器械ID删除器械信息
* ✔ 根据器械ID批量删除器械信息
#### 检查管理
* ✔ 获取所有检查信息
* ✔ 根据检育ID获取检查信息
* ✔ 根据检查ID修改检查信息
* ✔ 创建检查
* ✔ 根据检育ID删除检查信息
* ✔ 根据检育ID批量删除检查信息
#### 住院管理
* ✔ 获取所有住院信息
* ✔ 根据住院ID获取住院信息
* ✔ 根据住院ID修改住院信息
* ✔ 创建住院
* ✔ 根据住院ID删除住院信息
* ✔ 根据住院ID批量删除住院信息




# 项目目录说明

* `README.md`：项目说明文件
* `node_modules/`：项目依赖的第三方包
* `package.json`：项目的配置文件，包含项目的依赖、scripts、配置等信息
* `.gitignore`：Git忽略文件配置
* `public/`：包含项目的静态资源，如HTML、favicon等
    * `index.html`：React应用程序的HTML模板
    * `favicon.ico`：应用程序的图标
* `src/`：包含应用程序源代码
    *  `src\components`：前端组件
        * IndexLayout.js 前端导航框架
    * `src\views`：前端页面
    * `App.js`：应用程序的主组件，包含应用程序的逻辑
    * `index.js`：应用程序的入口文件，渲染应用程序到DOM
    * `index.css`：全局CSS样式文件
    * `logo.svg`：应用程序的logo
