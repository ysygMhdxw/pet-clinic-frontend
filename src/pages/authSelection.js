import {Button,Layout,Space,Image} from "antd";
import propTypes from "prop-types";
import React from "react";
const {Header, Content, Footer} = Layout;
function AuthSelection( props ) {
    return (
        <div>
       <Space direction="vertical" style={{width: '100%', height: "100%"}}>
        <Layout style={{
                        minHeight: '100vh',
                        background: "https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png",
                        backgroundImage: `url('https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png')`
                    }}>
            <Header />
            <Content 
            style={{
                content: 'center',
                paddingLeft: "10%",
                paddingRight: "10%",
                paddingTop: "5%",
            }}>
            <div style={{textAlign: "center", margin: "3%"}}>
                                        <Image
                                            width="20%"
                                            src="/logo.svg"
                                        />
                                    </div>
            <br/>
            <br/>
            <h1 style={{display:'flex',justifyContent:'center'}}>欢迎来到我们的网站</h1>
            <br/>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Space direction="vertical"
                size="large"
                style={{
                display: 'flex',
                }}>
                
                    <Button type="primary" href="/frontend">进入前台管理</Button>
                    
                    { props.isSuperUser && <Button type="primary" href="/backend">进入后台管理</Button>}
               
                </Space>
            </div>
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
    );
}

export default AuthSelection;

AuthSelection.propTypes ={
    isSuperUser: propTypes.bool
}