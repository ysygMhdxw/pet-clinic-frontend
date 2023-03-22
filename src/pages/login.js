import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Typography, Col, Row } from 'antd';

import React from 'react';
import api from "../api/api";

const {Header, Content, Footer} = Layout;
const { Title } = Typography;

export const Login = () => {

    const onFinish = (values) => {
        login(values).then((res) => {
          if(res.data.resCode === 0){
            this.props.history.push("../");
          }
        },
        (err) =>{
          this.props.addFlashMessage({
              type: "danger",
              text: err.response.data.errors
          })
        })
        console.log('Received values of form: ', values);
    }

    async function login(values) {
        const res = await api.getLogin(values)
        const data = await res.json()
        console.log(data);
    }

  return (
    <Layout className="layout">
      <Header style={{ padding: '40px 0' }}>
      </Header>
      <Content style={{ padding: '120px' }}>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
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
            <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
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
            <Button type="primary" htmlType="submit" size="default" block style={{
              marginBottom: 12,
            }}>
              Log in
            </Button>
            Or <a href="../register">register now!</a>
          </Form.Item>
        </Form>
        </Col>
        <Col span={8}></Col>
        </Row>
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

