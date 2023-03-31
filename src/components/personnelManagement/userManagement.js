import {Button, message, Popconfirm} from "antd";
import api from "../../api/api";
import React, {useEffect, useState} from "react";
import {
    EditableProTable,
    ModalForm,
    ProForm, ProFormSelect,
    ProFormText
} from "@ant-design/pro-components";
import {LockOutlined, PlusOutlined} from "@ant-design/icons";

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};


export const UserManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const info = (msg) => {
        messageApi.info(msg);
    };
    const [usersData, setUsersData] = useState([])
    const [editableKeys, setEditableRowKeys] = useState([]);
    // const [dataSource, setDataSource] = useState([]);
    const columns = [
        {
            title: '用户编号',
            dataIndex: 'id',
            key: 'id',
            formItemProps: (form, {rowIndex}) => {
                return {
                    rules: rowIndex > 1 ? [{required: true, message: '此项为必填项'}] : [],
                };
            },
            // 第一行不允许编辑
            editable: (text, record, index) => {
                return index !== 0;
            },
            width: '15%',
        },
        {
            title: '用户名称',
            key: 'username',
            dataIndex: 'username',
            formItemProps: (form, {rowIndex}) => {
                return {
                    rules: rowIndex > 1 ? [{required: true, message: '此项为必填项'}] : [],
                };
            },
            // editable: (text, record, index) => {
            //     return index !== 0;
            // },
            width: '15%',
        },
        {
            title: '密码',
            key: 'password',
            dataIndex: 'password',
        },
        {
            title: '管理员权限',
            key: 'superuser',
            dataIndex: 'superuser',
            valueType: 'select',
            valueEnum: {
                true: {
                    text: '管理员',
                    status: 'Error',
                },
                false: {
                    text: '用户',
                    status: 'Success',
                },
            },
            // render: (_) =>
            //     (<>
            //         {_ === true ?
            //             <Tag color={'red'} key={"superuser"}>
            //                 {`管理员`}
            //             </Tag> :
            //             <Tag color={'geekblue'} key={"superuser"}>
            //                 {`用户`}
            //             </Tag>
            //         }
            //     </>),
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}
                >
                    编辑
                </a>,
                <Popconfirm
                    key="delete"
                    placement="top"
                    title={"删除数据"}
                    description={"确认删除此条数据？删除后将无法恢复。"}
                    onConfirm={async () => {
                        setUsersData(usersData.filter((item) => item.id !== record.id));
                        deleteUserById(record.id);
                        info("删除成功！");
                        await waitTime(500);
                    }
                    }
                    okText="Yes"
                    cancelText="No"
                >
                    <a>
                        删除
                    </a>
                </Popconfirm>
                ,
            ],
        },
    ];

    useEffect(() => {
        getPersonnelData()
    }, []);


    // eslint-disable-next-line no-unused-vars
    const [selectedRows, setSelectedRows] = useState([]);

    const handleRowSelection = (selectedRowKeys, selectedRows) => {
        console.log(selectedRows)
        setSelectedRows(selectedRows);
    };
    const handleBatchDelete = () => {
        if (selectedRows.length === 0) {
            message.warning('请选择要删除的行！');
            return;
        }
        const keys = selectedRows.map((row) => row.id);
        const newData = usersData.filter((row) => !keys.includes(row.id));
        setUsersData(newData);
        setSelectedRows([]);
        deleteUserById(keys);
        message.success('批量删除成功！');
    };

    async function getPersonnelData() {
        const res = await api.getUsers()
        const data = res.data
        setUsersData(data.users)
        console.log(data.users);
    }

    async function deleteUserById(user_id) {
        const res = await api.deleteUsers(user_id)
        const data = res.data
        console.log(data)
    }

    async function editUser(user) {
        const res = await api.editUser(user)
        const data = res.data
        console.log(data.department.id)
    }

    async function addUser(user) {
        const res = await api.addUser(user)
        const data = res.data
        console.log(data)
    }


    return (
        <>
            {contextHolder}
            <h1 style={{marginBottom: "1"}}>用户管理</h1>
            <div style={{display: "flex", margin: "10px"}}>
                <div style={{marginLeft: "auto"}}>
                    <ModalForm
                        labelWidth="auto"
                        trigger={
                            <Button type="primary">
                                <PlusOutlined/>
                                新建用户
                            </Button>
                        }
                        onFinish={async (values) => {
                            await waitTime(1000);
                            addUser({id: random(0, 10000000), ...values})
                            console.log(values);
                            getPersonnelData();
                            message.success('新建成功');
                            return true;
                        }}
                    >
                        <ProForm.Group>
                            <ProFormText
                                width="md"
                                name="name"
                                label="用户名称"
                                tooltip="最长为 24 位"
                                placeholder="请输入用户名称"
                            />
                            {/*<ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称"/>*/}
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormText.Password
                                width="md"
                                name="password"
                                label="用户密码"
                                fieldProps={{
                                    prefix: <LockOutlined className={'prefixIcon'}/>,
                                }}
                                placeholder={'请输入密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormSelect
                                width="md"
                                request={async () => [
                                    {label: '管理员', value: true},
                                    {label: '用户', value: false},
                                ]}
                                name="superuser"
                                label="新建用户权限"
                            />
                        </ProForm.Group>
                    </ModalForm>
                </div>
                <div style={{marginLeft:"2%"}}>
                    <Button type="primary" onClick={handleBatchDelete}>
                        批量删除
                    </Button>
                </div>

            </div>

            <EditableProTable
                rowKey="id"
                headerTitle="用户基本信息"
                maxLength={5}
                scroll={{
                    x: 960,
                }}
                recordCreatorProps={false}
                loading={false}
                columns={columns}
                request={async () => ({
                    data: [],
                    total: 3,
                    success: true,
                })}
                value={usersData}
                onChange={setUsersData}
                rowSelection={{
                    type: 'checkbox',
                    onChange: handleRowSelection
                }}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    // eslint-disable-next-line no-unused-vars
                    onSave: async (rowKey, data, _row) => {
                        editUser(data)
                        info("修改成功！")
                        await waitTime(500);
                    },
                    // eslint-disable-next-line no-unused-vars
                    onDelete: async (rowKey, data, _row) => {
                        deleteUserById([data.id])
                        info("删除成功！")
                        await waitTime(500);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
            {/*<Table columns={columns} dataSource={departmentData}/>*/}
        </>
    )
}