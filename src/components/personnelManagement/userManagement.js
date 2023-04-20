import {Button, Input, message, Popconfirm, Select, Skeleton, Space} from "antd";
import api from "../../api/api";
import React, {useEffect, useRef, useState} from "react";
import {
    EditableProTable,
    ModalForm,
    ProForm, ProFormSelect,
    ProFormText
} from "@ant-design/pro-components";
import {LockOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";


const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

function isLocalStorageAvailable() {
    try {
        const testKey = 'test';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

export const UserManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = (msg) => {
        messageApi.success(msg);
    };
    const showError = (msg) => {
        messageApi.error(msg);
    };


    const [usersData, setUsersData] = useState([])
    const roleOptions =
        [{label: "管理员", value: true},
        {label: "用户", value: false}];
    const [editableKeys, setEditableRowKeys] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        console.log(selectedKeys);
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex, columnName) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`查询 ${columnName}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        查询
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        清空搜索
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        筛选
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        关闭
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const getFixedSearchProps = (dataIndex, columnName) => ({
        // eslint-disable-next-line no-unused-vars
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Select
                    allowClear
                    style={{
                        marginBottom: "10px",
                        width: '100%',
                    }}
                    placeholder={`请选择${columnName}`}
                    defaultValue={[]}
                    onChange={(value) => setSelectedKeys(value ? [value] : [])}
                    options={roleOptions}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        查询
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        重置
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        筛选
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        关闭
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => {
            // console.log("record", record[dataIndex])
            return record[dataIndex].toString().includes(value)
        },
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const columns = [
        {
            title: '用户编号',
            dataIndex: 'id',
            key: 'id',
            formItemProps: {
                rules: [{required: true, message: '此项为必填项'}]
            },
            // 第一行不允许编辑
            editable: false,
            width: '15%',
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps("id", "用户编号")
        },
        {
            title: '用户名称',
            key: 'username',
            dataIndex: 'username',
            formItemProps: {
                rules: [{required: true, message: '此项为必填项'}]
            },
            editable: false,
            width: '15%',
            ...getColumnSearchProps("username", "用户名称")
        },
        {
            title: '密码',
            key: 'password',
            dataIndex: 'password',
            render: () => {
                return (
                    <Skeleton active style={{width: "200px"}} paragraph={{rows: 1}}/>
                )
            }
        },
        {
            title: '管理员权限',
            key: 'superuser',
            dataIndex: 'superuser',
            valueType: 'select',
            request: async () => [
                {label: "管理员", value: true},
                {label: "用户", value: false}
            ],
            ...getFixedSearchProps("superuser","权限")
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
                        deleteUserById([record.id], [record.username]);
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
        const names = selectedRows.map((row) => row.username);
        const keys = selectedRows.map((row) => row.id);
        const newData = usersData.filter((row) => !keys.includes(row.id));
        setUsersData(newData);
        setSelectedRows([]);
        deleteUserById(keys, names);
    };

    function addPassword(data) {
        data.forEach(item => {
            if (!(item.password)) {
                item.password = '';
            } else item.password = '';
        });
        return data;
    }

    async function getPersonnelData() {
        try {
            const res = await api.getUsers()
            const data = res.data
            const users = addPassword(data.users)
            setUsersData(users)
            console.log(data.users);
        } catch (error) {

            console.error(error);
            setUsersData([]);
            showError("不存在用户数据！");
        }

    }

    async function deleteUserById(userIds, names) {
        try {
            if (isLocalStorageAvailable()) {
                const username = localStorage.getItem('username')
                console.log(username)
                console.log(names)
                if (names.includes(username)) {
                    showError("不能删除自己！")
                    throw new Error("不能删除自己！")
                }
            }
            const res = await api.deleteUsers(userIds)
            const data = res.data
            console.log(data)
            success("删除用户成功！");
        } catch (error) {
            console.error(error);
            showError("删除用户失败！");
        }
        getPersonnelData()
    }

    async function editUser(user) {
        try {
            const res = await api.editUser(user)
            const data = res.data
            getPersonnelData();
            success("修改用户成功！");
            console.log(data)
        } catch (error) {
            console.error(error);
            showError("修改用户失败！");
        }
    }

    async function addUser(user) {
        try {
            const res = await api.addUser(user)
            const data = res.data
            getPersonnelData();
            console.log(data)
            success("新建用户成功！")
        } catch (error) {
            if (error.response && error.response.status === 400) {
                showError('用户名已被注册，请更换新建的用户名！');
            } else if (error.response && error.response.status === 500) {
                showError('服务器错误，请稍后重试');
            } else {
                showError('网络错误，请检查网络连接');
            }
            console.error(error);
        }
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
                            await waitTime(500);
                            addUser(values)
                            console.log(values);
                            return true;
                        }}
                    >
                        <ProForm.Group>
                            <ProFormText
                                width="md"
                                name="username"
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
                                options={
                                    [{label: '管理员', value: true},
                                        {label: '用户', value: false}]
                                }
                                name="superuser"
                                label="新建用户权限"
                            />
                        </ProForm.Group>
                    </ModalForm>
                </div>
                <div style={{marginLeft: "2%"}}>
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
                pagination={{current: 1, pageSize: 10}}
                recordCreatorProps={false}
                columns={columns}
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
                        if (data.password === "") {
                            delete data.password;
                        }
                        editUser(data)
                        await waitTime(500);
                    },
                    // eslint-disable-next-line no-unused-vars
                    onDelete: async (rowKey, data, _row) => {
                        console.log("delete data", data)
                        deleteUserById([data.id], [data.username])
                        await waitTime(500);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
        </>
    )
}