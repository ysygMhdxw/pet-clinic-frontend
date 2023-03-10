import { DesktopOutlined, FolderViewOutlined, OneToOneOutlined, PieChartOutlined, ReadOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, theme } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { ContextComponents } from './ContextComponents';
const { Header } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('导览展示', '导览展示', <PieChartOutlined />),
  getItem('职能学习', '职能学习', <DesktopOutlined />, [
    getItem('角色扮演', '角色扮演', <UserOutlined />, [
      getItem('前台', '前台'),
      getItem('医助', '医助'),
      getItem('兽医师', '兽医师')
    ]),
    getItem('病例学习', '病例学习', <FolderViewOutlined />),
  ]),
  getItem('测试学习', '测试学习', <UserOutlined />, [
    getItem('做题', '做题', <ReadOutlined />),
    getItem('考试', '考试', <OneToOneOutlined />),
    getItem('比赛', '比赛', <TeamOutlined />),
  ])
];

const IndexLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeyPath, setSelectedKeysPath] = useState([])
  const [contextVal, setContextVal] = useState("")
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => { setCollapsed(value) }}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ keyPath }) => {
          setSelectedKeysPath(keyPath)
          setContextVal(keyPath[0])
        }} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              paddingRight: "10%",
              paddingTop: "0.5%"
            }}>
            <Avatar style={{
              marginLeft: "auto",
            }} size={50} icon={<UserOutlined />} />
          </div>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {selectedKeyPath[2] == undefined ? '' : <Breadcrumb.Item>{selectedKeyPath[2]}</Breadcrumb.Item>}
            {selectedKeyPath[1] == undefined ? '' : <Breadcrumb.Item>{selectedKeyPath[1]}</Breadcrumb.Item>}
            {selectedKeyPath[0] == undefined ? '' : <Breadcrumb.Item>{selectedKeyPath[0]}</Breadcrumb.Item>}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <ContextComponents contextString={contextVal} />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          虚拟宠物医院学习系统 ©2023 Created by G14
        </Footer>
      </Layout>
    </Layout>
  );
};
export default IndexLayout;