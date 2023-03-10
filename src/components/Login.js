import { EyeTwoTone, UserOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import { Layout, Input, Button, Form, Typography} from 'antd';
const { Content, Footer} = Layout;
const {Title} = Typography;
import React from 'react';
//import { useState } from 'react';

const Login = () => {
    // const [username, setUsername] = useState('');
    // const [password, setPass] = useState('');
    
    return (
        <Layout className="layout">
          <Content style={{padding:'130px 500px'}}>
          <Title level={3} type="secondary">虚拟宠物医院学习系统</Title>
          <Input size="large" type="text" placeholder="用户名" id="username" name="username" prefix={<UserOutlined className="site-form-item-icon" />} />
          <br/>
          <br/>
          <Input.Password size="large" type="password" placeholder="密码" id="password" name="password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          <br/>
          <br/>
          <Form.Item direction="vertical">
          <Button
            size="large"
            shape="round"
            block
            style={{
              marginBottom: 12,
            }}
          >
            提交
          </Button>
          <Button size="large"
            shape="round"
            block
            style={{
              marginBottom: 12,
            }}>
            注册
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
export default Login;

