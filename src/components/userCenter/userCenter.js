import {Button, Card, Form, Input, message} from "antd";
import {useEffect, useState} from "react";
import api from "../../api/api";
import {useNavigate} from "react-router-dom";

export const UserCenter = () => {
    const [about] = useState('本虚拟宠物医院管理系统，是一个使用 React 和 Ant Design 开发的示例项目。');
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordForm] = Form.useForm();
    const [editPasswordForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [username, setUsername] = useState('John Doe');
    const navigate = useNavigate()

    const success = (msg) => {
        messageApi.success(msg);
    };
    const showError = (msg) => {
        messageApi.error(msg);
    };
    const info = (msg) => {
        messageApi.info(msg);
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        console.log(storedUsername)
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleOk = () => {
        // 删除本地存储中的 token
        localStorage.removeItem('token');
        // 跳转到登录页面
        navigate('/login');
        // 显示提示消息
        info('您已成功退出登录！');
    };
    const handlePasswordSubmit = async (values) => {
        try {
            const res = await api.getLogin({
                username: username,
                password: values.oldPassword,
                superuser: false
            });
            const data = res.data;
            if (data.access) {
                // 验证成功，展开设置新密码的表单
                setShowPasswordForm(true);
                success("验证成功！")
            } else {
                // 验证失败，提示用户并清空表单
                passwordForm.resetFields();
                showError('验证失败，请重新输入');
                throw new Error('');
            }
        } catch (error) {
            showError('验证失败，请重新输入');
        }
    };

    const handleConfirmPassword = (_, value) => {
        if (value && value !== editPasswordForm.getFieldValue('newPassword')) {
            return Promise.reject(new Error('两次输入的密码不一致'));
        }
        return Promise.resolve();
    };
    const editPassword = async (value) => {
        try {
            const res = await api.editPassword(
                {
                    username:username,
                    password:value.confirmPassword,
                    superuser:false
                }
            )
            const data = res.data;
            if (data) {
                // 验证成功，展开设置新密码的表单
                setShowPasswordForm(true);
                handleOk()
                success("修改成功！请重新登录")
            } else {
                // 验证失败，提示用户并清空表单
                passwordForm.resetFields();
                showError('验证失败，请重新输入');
                throw new Error('');
            }
        } catch (error) {
            showError('修改失败！请稍后再试');
        }
    }

    return (
        <div>
            {contextHolder}
            <Card title="修改密码">
                <p>当前用户：{username}</p> {/* 添加这一行来展示当前用户的用户名 */}
                <Form form={passwordForm} onFinish={handlePasswordSubmit}>
                    <Form.Item
                        name="oldPassword"
                        label="旧密码"
                        rules={[{required: true, message: '请输入旧密码'}]}
                    >
                        <Input.Password placeholder="请输入旧密码"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">下一步</Button>
                    </Form.Item>
                </Form>
                {showPasswordForm && (
                    <Form form={editPasswordForm} onFinish={editPassword}>
                        <Form.Item
                            name="newPassword"
                            label="新密码"
                            rules={[{required: true, message: '请输入新密码'}]}
                        >
                            <Input.Password placeholder="请输入新密码"/>
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="确认密码"
                            rules={[
                                {required: true, message: '请再次输入新密码'},
                                {validator: handleConfirmPassword},
                            ]}
                            dependencies={['newPassword']}
                        >
                            <Input.Password placeholder="请再次输入新密码"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form>
                )}

            </Card>

            <Card title="关于本系统">
                <p>{about}</p>
            </Card>
        </div>
    );
};
