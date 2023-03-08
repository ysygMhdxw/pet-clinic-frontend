import { UserOutlined, PieChartOutlined, DesktopOutlined, TeamOutlined, OneToOneOutlined, FolderViewOutlined, ReadOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Avatar } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('导览展示', '1', <PieChartOutlined />),
  getItem('职能学习', '2', <DesktopOutlined />, [
    getItem('角色扮演', '3', <UserOutlined />, [
      getItem('角色1', '4'),
      getItem('角色2', '5'),
      getItem('角色3', '6')
    ]),
    getItem('病例学习', '7', <FolderViewOutlined />),
  ]),
  getItem('测试学习', '8', <UserOutlined />, [
    getItem('做题', '9', <ReadOutlined />),
    getItem('考试', '10', <OneToOneOutlined />),
    getItem('比赛', '11', <TeamOutlined />),
  ])
];
const IndexLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
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
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            正文内容
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