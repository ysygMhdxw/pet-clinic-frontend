import { LockOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Form, Input, Layout, Typography } from 'antd';
const { Header, Content, Footer} = Layout;
const {Title} = Typography;
import React from 'react';
//import { useState } from 'react';

export const Login = () => {
    // const [username, setUsername] = useState('');
    // const [password, setPass] = useState('');
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
    
    return (
        <Layout className="layout">
          <Header style={{padding:'40px 0'}}>

          </Header>
          <Content style={{padding:'120px 470px'}}>
          <Title level={3} type="secondary">虚拟宠物医院学习系统</Title>
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
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined/>} placeholder="Username" size="large"/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button  type="primary" htmlType="submit" size="default" block style={{
              marginBottom: 12,
            }}>
                Log in
              </Button>
              Or <a href="../register">register now!</a>
            </Form.Item>
          </Form>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          虚拟宠物医院学习系统 ©2023 Created by G14
        </Footer>
          </Layout>
    );
};

