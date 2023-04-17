import {
    BellOutlined,
    BookOutlined,
    ClusterOutlined,
    ContactsOutlined,
    DesktopOutlined,
    FolderViewOutlined,
    GroupOutlined,
    MedicineBoxOutlined,
    OneToOneOutlined,
    PieChartOutlined,
    ProjectOutlined,
    ReadOutlined,
    TeamOutlined, ToolOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Content, Footer} from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import propTypes from 'prop-types';

import React, {useState} from 'react';
import {ContextComponents} from './ContextComponents';
import {UserMenu} from "./userCenter/userMenu";

const {Header} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const frontItems = [
    getItem('用户中心', '用户中心', <UserOutlined/>),
    getItem('导览展示', '导览展示', <PieChartOutlined/>),
    getItem('职能学习', '职能学习', <DesktopOutlined/>, [
        getItem('角色扮演', '角色扮演', <UserOutlined/>, [
            getItem('前台', '前台'),
            getItem('医助', '医助'),
            getItem('兽医师', '兽医师')
        ]),
        getItem('病例学习', '病例学习', <FolderViewOutlined/>),
    ]),
    getItem('测试学习', '测试学习', <UserOutlined/>, [
        getItem('做题', '做题', <ReadOutlined/>),
        getItem('考试', '考试', <OneToOneOutlined/>),
        getItem('比赛', '比赛', <TeamOutlined/>),
    ])
];
const backItems = [
    getItem('用户中心', '用户中心', <UserOutlined/>),
    getItem('病例管理', '病例管理', <PieChartOutlined/>),
    getItem('测试管理', '测试管理', <DesktopOutlined/>,[
        getItem('题目管理','题目管理',<BookOutlined/>),
        getItem('考试管理','考试管理', <BellOutlined/>)
    ]),
    getItem('系统管理', '系统管理', <UserOutlined/>, [
        getItem('用户管理', '用户管理', <ReadOutlined/>),
        getItem('职能学习管理', '职能学习管理', <OneToOneOutlined/>),
        getItem('基本结构和功能管理', '基本结构和功能管理', <TeamOutlined/>, [
            getItem('科室管理', '科室管理', <GroupOutlined/>),
            getItem('人员管理', '人员管理', <ContactsOutlined/>),
            getItem('药品管理', '药品管理', <MedicineBoxOutlined/>),
            getItem('疫苗管理', '疫苗管理', <ReadOutlined/>),
            // getItem('档案管理', '档案管理', <DatabaseOutlined/>),
            getItem('器械管理', '器械管理', <ToolOutlined/>),
            // getItem('收费管理', '收费管理', <DollarOutlined/>),
            getItem('检查项目管理', '检查项目管理', <ProjectOutlined/>),
            getItem('住院管理', '住院管理', <ClusterOutlined/>),

        ]),
    ])
];


export const IndexLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedFrontKeyPath, setSelectedFrontKeysPath] = useState([])
    const [selectedBackKeyPath, setSelectedBackKeysPath] = useState([])

    const [contextVal, setContextVal] = useState("导览展示")
    const {
        token: {colorBgContainer},
    } = theme.useToken();


    if (props.isFrontendFlg) {
        return (
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => {
                    setCollapsed(value)
                }}>
                    <div
                        style={{
                            height: 32,
                            margin: 16,
                            background: 'rgba(255, 255, 255, 0.2)',
                        }}
                    />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={frontItems}
                          onClick={({keyPath}) => {
                              setSelectedFrontKeysPath(keyPath)
                              setContextVal(keyPath[0])
                          }}/>
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
                                paddingRight: "5%",
                            }}>
                            <div style={{marginLeft:"auto"}}><UserMenu setContextVal={setContextVal}/></div>
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
                            {selectedFrontKeyPath[2] === undefined ? '' :
                                <Breadcrumb.Item>{selectedFrontKeyPath[2]}</Breadcrumb.Item>}
                            {selectedFrontKeyPath[1] === undefined ? '' :
                                <Breadcrumb.Item>{selectedFrontKeyPath[1]}</Breadcrumb.Item>}
                            {selectedFrontKeyPath[0] === undefined ? '' :
                                <Breadcrumb.Item>{selectedFrontKeyPath[0]}</Breadcrumb.Item>}
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,

                            }}
                        >

                            <ContextComponents contextString={contextVal}/>
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
    } else {
        return (
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => {
                    setCollapsed(value)
                }}>
                    <div
                        style={{
                            height: 32,
                            margin: 16,
                            padding: 10,
                            background: 'rgba(255, 255, 255, 0.2)',
                        }}
                    />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={backItems}
                          onClick={({keyPath}) => {
                              setSelectedBackKeysPath(keyPath)
                              setContextVal(keyPath[0])
                          }}/>
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
                                paddingRight: "5%",
                            }}>
                            <div style={{marginLeft:"auto"}}><UserMenu setContextVal={setContextVal}/></div>
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
                            {selectedBackKeyPath[3] === undefined ? '' :
                                <Breadcrumb.Item>{selectedBackKeyPath[3]}</Breadcrumb.Item>}
                            {selectedBackKeyPath[2] === undefined ? '' :
                                <Breadcrumb.Item>{selectedBackKeyPath[2]}</Breadcrumb.Item>}
                            {selectedBackKeyPath[1] === undefined ? '' :
                                <Breadcrumb.Item>{selectedBackKeyPath[1]}</Breadcrumb.Item>}
                            {selectedBackKeyPath[0] === undefined ? '' :
                                <Breadcrumb.Item>{selectedBackKeyPath[0]}</Breadcrumb.Item>}
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}
                        >
                            <ContextComponents contextString={contextVal}/>
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
    }
};


IndexLayout.propTypes = {
    isFrontendFlg: propTypes.bool
};