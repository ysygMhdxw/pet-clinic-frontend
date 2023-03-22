import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, Layout, Typography, Col, Row, Image} from 'antd';
import React from 'react';
import api from "../api/api";

const {Header, Content, Footer} = Layout;
const {Title} = Typography;

export const Register = () => {

    const onFinish = (values) => {
        let login_values = {username: values.username, password: values.password}
        register(login_values).then(
            (res) => {
                if (res.data.resCode === 0) {
                    this.props.history.push("../");
                }
            },
            (err) => {
                this.props.addFlashMessage({
                    type: "danger",
                    text: err.response.data.errors
                })
            }
        )
        console.log('Received values of form: ', login_values);
    };

    async function register(values) {
        const res = await api.getRegister(values)
        const data = await res.json()
        console.log(data);
    }

    return (
        <Layout className="layout" style={{
            minHeight: '100vh',
            background: "https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png",
            backgroundImage: `url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png')`
        }}>

            <Header>
            </Header>
            <Content style={{
                content: 'center',
                paddingLeft: "10%",
                paddingRight: "10%",
                paddingTop: "5%",
            }}>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <div style={{textAlign: "center", margin: "3%"}}>
                            <Image
                                width="20%"
                                src="/logo.svg"
                            />
                        </div>
                        <Title level={4} type="secondary" style={{textAlign: "center"}}> 虚拟宠物医院学习系统 </Title>
                        <Form
                            name="normal_login"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名！',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined/>} placeholder="请输入用户名" size="middle"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                                // hasFeedback
                            >
                                <Input.Password
                                    prefix={<LockOutlined/>}
                                    type="password"
                                    placeholder="请输入密码"
                                    size="middle"/>
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                // hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请确认密码',
                                    },
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('两次输入密码不一致！'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined/>}
                                    type="password"
                                    placeholder="请确认密码"
                                    size="middle"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" size="middle" block>
                                    注册
                                </Button>

                            </Form.Item>
                            <Form.Item style={{textAlign: "right"}}>
                                已经有账号？ <a href="../login">立即登录</a>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    backgroundColor: "white"
                }}
            >
                虚拟宠物医院学习系统 ©2023 Created by G14
            </Footer>
        </Layout>
    );
};

