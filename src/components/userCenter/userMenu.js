import React, {useState} from "react";
import {Avatar, Dropdown, Menu, message, Modal} from "antd";
import {ExclamationCircleOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from 'react-router-dom';
import PropTypes from "prop-types";

export const UserMenu = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [diaglogVisible, setDialogVisible] = useState(false);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const info = (msg) => {
        messageApi.info(msg);
    };
    const handleVisibleChange = (visible) => {
        setVisible(visible);
    };

    const handleMenuClick = ({key}) => {
        if (key === 'logout') {
            // 执行注销操作
            console.log('执行注销操作');
        } else if (key === 'user-center') {
            props.setContextVal("用户中心")
            // 打开用户中心
            console.log('打开用户中心');
        }
    };
    const handleOk = () => {
        // 删除本地存储中的 token
        localStorage.removeItem('token');
        // 关闭对话框
        setVisible(false);
        // 跳转到登录页面
        navigate('/login');
        // 显示提示消息
        info('您已成功退出登录！');
    };

    const handleCancel = () => {
        // 关闭对话框
        setDialogVisible(false);
    };

    const handleLogoutClick = () => {
        // 显示确认对话框
        setDialogVisible(true);
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="frontend" onClick={() => {
                navigate('/frontend');
            }}>
                前台管理
            </Menu.Item>
            {localStorage.getItem("status") === "true" &&  <Menu.Item key="backend" onClick={() => {
                navigate('/backend');
            }}>
                后台管理
            </Menu.Item>}
            <Menu.Item key="user-center">用户中心</Menu.Item>
            <Menu.Item key="logout">
                <span onClick={handleLogoutClick}>登出</span>
                <Modal
                    title="确认退出登录"
                    open={diaglogVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="确认"
                    cancelText="取消"
                    okButtonProps={{danger: true}}
                >
                    <p>
                        <ExclamationCircleOutlined style={{color: 'red', marginRight: 10}}/>
                        确定要退出登录吗？
                    </p>
                </Modal>
            </Menu.Item>
        </Menu>
    );
    return (
        <div>
            {contextHolder}
            <Dropdown
                overlay={menu}
                trigger={['click']}
                open={visible}
                onVisibleChange={handleVisibleChange}
            >
                <Avatar style={{
                    marginLeft: "auto",
                    cursor: "pointer"
                }} size={50} icon={<UserOutlined/>}/>
            </Dropdown>
        </div>

    )
}

UserMenu.propTypes={
    setContextVal:PropTypes.func
}