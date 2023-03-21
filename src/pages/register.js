import { UserOutlined} from '@ant-design/icons';
import { Layout, Input, Button, Form,  Typography} from 'antd';
const { Header, Content, Footer} = Layout;
const { Title } = Typography;
import React from 'react';
//import { useState } from 'react';

export const Register = () => {
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
          <Title level={3} type="secondary" >  虚拟宠物医院学习系统  </Title>
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
                  message: 'Please input your password!',
                },
              ]}
              // hasFeedback
            >
              <Input.Password type="password"
                placeholder="Password"
                size="large"/>
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              // hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password type="password"
                placeholder="Confirm Password"
                size="large"/>
            </Form.Item>
            <Form.Item>
              <Button  type="primary" htmlType="submit" size="default" block style={{
              marginBottom: 12,
            }}>
                Sign up
              </Button>
              Or <a href="../login">login now!</a>
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

