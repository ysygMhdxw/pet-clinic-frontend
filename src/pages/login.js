import { EyeTwoTone, UserOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import { Layout, Input, Button, Form, Typography} from 'antd';
const { Header, Content, Footer} = Layout;
const {Title} = Typography;
import React from 'react';
//import { useState } from 'react';

export const Login = () => {
    // const [username, setUsername] = useState('');
    // const [password, setPass] = useState('');
    
    return (
        <Layout className="layout">
          <Header style={{padding:'40px 0'}}>

          </Header>
          <Content style={{padding:'100px 500px'}}>
          <Title level={3} type="secondary">虚拟宠物医院学习系统</Title>
          <Input size="large" type="text" placeholder="用户名" id="username" name="username" prefix={<UserOutlined className="site-form-item-icon" />} />
          <br/>
          <br/>
          <Input.Password size="large" type="password" placeholder="密码" id="password" name="password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          <br/>
          <br/>
          <Form.Item>
          <Button
            size="default"
            shape="round"
            block
            style={{
              marginBottom: 12,
            }}
          >
            登录
          </Button>
          <Button size="default"
            shape="round"
            block
            style={{
              marginBottom: 12,
            }}>
            新用户
          </Button>
          </Form.Item>
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

