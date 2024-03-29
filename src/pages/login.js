import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, Layout, Typography, Col, Row, Space, Image, message} from 'antd';
import api, {storeToken, storeUserName, storeStatus} from "../api/api";
import {useNavigate} from "react-router-dom";
import propTypes from "prop-types";

const {Header, Content, Footer} = Layout;
const {Title} = Typography;

export const Login = (props) => {

        const navigate = useNavigate()
        const onFinish = (values) => {
            login(values)
            console.log('Received values of form: ', values);
        }
        const [messageApi, contextHolder] = message.useMessage();
        const showError = (msg) => {
            messageApi.error(msg);
        };
        const success = (msg) => {
            messageApi.success(msg);
        };


        async function login(values) {
            try {
                const res = await api.getLogin(values);
                const data = res.data;
                if (data.access) {
                    storeToken(data.access);
                    storeUserName(values.username);
                    props.setIsAuthenticated(true);
                    getStatus()
                    navigate('/select');
                    success("登录成功！")
                } else {
                    throw new Error('登录失败：未返回访问令牌');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    showError('用户名或密码错误，请重新输入');
                } else if (error.response && error.response.status === 500) {
                    showError('服务器错误，请稍后重试');
                } else {
                    showError('网络错误，请检查网络连接');
                }
            }
        }

        async function getStatus(){
            const res = await api.getStatus(localStorage.getItem('username'))
            const data = res.data;
            storeStatus(data.superuser)
            if(data.superuser){
                props.setIsSuperUser(true)
                console.log('set true')
                }
            else
            {
                props.setIsSuperUser(false)
                console.log('set false')
            }
        }

        return (
            <div>
                {contextHolder}
                <Space direction="vertical" style={{width: '100%', height: "100%"}}>

                    <Layout style={{
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
                                <Col span={8}>
                                </Col>
                                <Col span={8}>
                                    <div style={{textAlign: "center", margin: "3%"}}>
                                        <Image
                                            width="20%"
                                            src="/logo.svg"
                                        />
                                    </div>

                                    <Title level={4} type="secondary"
                                           style={{textAlign: "center"}}>虚拟宠物医院学习系统</Title>
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
                                            <Input
                                                prefix={<UserOutlined/>}
                                                placeholder="请输入用户名"
                                                size="middle"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入密码！',
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                prefix={<LockOutlined/>}
                                                type="password"
                                                placeholder="请输入密码"
                                                size="middle"
                                            />
                                        </Form.Item>
                                        <Form.Item

                                        >
                                            <Button type="primary" htmlType="submit" size="middle" block>
                                                登录
                                            </Button>

                                        </Form.Item>
                                        <Form.Item style={{textAlign: "right"}}>
                                            没有账号？ <a href="../register">立即注册</a>
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

                </Space>
            </div>

        )
            ;

    }
;
Login.propTypes = {
    isAuthenticated: propTypes.bool,
    setIsAuthenticated: propTypes.func,
    isSuperUser: propTypes.bool,
    setIsSuperUser: propTypes.func
};