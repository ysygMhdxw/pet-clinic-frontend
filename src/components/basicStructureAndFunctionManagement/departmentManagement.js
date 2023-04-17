import {Button, Input, message, Popconfirm, Space} from "antd";
import api from "../../api/api";
import React, {useEffect, useRef, useState} from "react";
import {
    EditableProTable,
    ModalForm,
    ProForm,
    ProFormText, ProFormTextArea
} from "@ant-design/pro-components";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

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


export const DepartmentManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (msg) => {
        messageApi.success(msg);
    };
    const showError = (msg) => {
        messageApi.error(msg);
    };
    const [departmentData, setDepartmentData] = useState([])
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

    const getColumnSearchProps = (dataIndex,columnName) => ({
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

    const columns = [
        {
            title: '科室编号',
            dataIndex: 'id',
            key: 'id',
            formItemProps: (form, {rowIndex}) => {
                return {
                    rules: rowIndex > 1 ? [{required: true, message: '此项为必填项'}] : [],
                };
            },
            // 第一行不允许编辑
            editable:false,
            tooltip: "不允许修改！",
            width: '10%',
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps("id","科室编号")
        },
        {
            title: '科室名称',
            key: 'name',
            dataIndex: 'name',
            formItemProps: (form, {rowIndex}) => {
                return {
                    rules: rowIndex > 1 ? [{required: true, message: '此项为必填项'}] : [],
                };
            },
            editable: (text, record, index) => {
                return index !== 0;
            },
            width: '15%',
            ...getColumnSearchProps("name","科室名称")
        },
        {
            title: '科室简介',
            key: 'description',
            dataIndex: 'description',
            ...getColumnSearchProps("description","科室简介")
        },
        {
            title: '科室负责人',
            key: 'manager',
            dataIndex: 'manager',
            ...getColumnSearchProps("manager","科室负责人")
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
                        // setDepartmentData(departmentData.filter((item) => item.id !== record.id));
                        deleteDepartmentById(record.id, (error) => {
                            if (error) showError(error);
                        });
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
        getDepartmentData()
    }, []);

    async function getDepartmentData() {
        try {
            const res = await api.getDepartment()
            const data = res.data
            setDepartmentData(data.departmentlist)
            console.log(data.departmentlist);
        } catch (error) {
            console.error(error);
            showError("不存在科室数据！");
        }
    }

    async function deleteDepartmentById(department_ids, onError) {
        try {
            await api.deleteDepartment(department_ids);
            await getDepartmentData();
            success('删除成功！');
        } catch (error) {
            console.error(error);
            onError("删除科室失败，请稍后重试！");
        }
    }

    async function editDepartment(department, onError) {
        try {
            const res = await api.editDepartment(department);
            const data = res.data
            console.log(data)
            await getDepartmentData();
            success('修改科室成功！');
        } catch (error) {
            console.error(error);
            onError("修改科室失败，请稍后重试！");
        }
    }

    async function addDepartment(department) {
        try {
            const res = await api.addDepartment(department)
            const data = res.data
            getDepartmentData()
            success("添加科室成功！")
            console.log(data)
        } catch (error) {
            console.error(error);
            showError("添加科室失败，请稍后重试！");
        }
    }

    // eslint-disable-next-line no-unused-vars
    const [selectedRows, setSelectedRows] = useState([]);
    const handleRowSelection = (selectedRowKeys, selectedRows) => {
        console.log(selectedRows)
        setSelectedRows(selectedRows);
    };

    const handleBatchDelete = async () => {
        if (selectedRows.length === 0) {
            showError('请选择要删除的行！');
            return;
        }
        const keys = selectedRows.map((row) => row.id);
        console.log(keys)
        try {
            await api.deleteDepartments(keys);
            await getDepartmentData();
            success('批量删除成功！');
        } catch (error) {
            console.error(error);
            showError("批量删除科室失败，请稍后重试！");
        }
        setSelectedRows([]);
    };

    return (
        <>
            {contextHolder}
            <h1 style={{marginBottom: "1"}}>科室管理</h1>
            <div style={{display: "flex", justifyContent: "flex-end", gap: "10px", marginRight: "3%"}}>
                <div>
                    <ModalForm
                        labelWidth="auto"
                        trigger={
                            <Button type="primary">
                                <PlusOutlined/>
                                新建科室
                            </Button>
                        }
                        onFinish={async (values) => {
                            await waitTime(1000);
                            addDepartment({id: random(0, 10000000), ...values})
                            console.log(values);
                            getDepartmentData();
                            message.success('新建成功');
                            return true;
                        }}
                    >
                        <ProForm.Group>
                            <ProFormText
                                width="md"
                                name="name"
                                label="科室名称"
                                tooltip="最长为 24 位"
                                placeholder="请输入名称"
                            />

                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormTextArea
                                name='description'
                                width="md"
                                label="科室简介"
                                placeholder="请输入科室简介"
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormText
                                name='manager'
                                width="md"
                                label="科室负责人"
                                placeholder="请输入科室负责人"
                                tooltip={"负责人之间用空格分隔"}
                            />
                        </ProForm.Group>

                    </ModalForm>
                </div>
                <div>
                    <Button type="primary" onClick={handleBatchDelete}>
                        批量删除
                    </Button>
                </div>
                <div>
                    <Button type="primary">
                        批量上传
                    </Button>
                </div>
            </div>

            <EditableProTable
                rowKey="id"
                headerTitle="科室基本信息"
                maxLength={5}
                scroll={{
                    x: 960,
                }}
                pagination={{
                    pageSize: 10,
                    showQuickJumper: true,
                    // showSizeChanger: true,
                    // total: 20,
                }}
                recordCreatorProps={false}
                loading={false}
                columns={columns}
                rowSelection={{
                    type: 'checkbox',
                    onChange: handleRowSelection
                }}
                value={departmentData}
                onChange={setDepartmentData}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    // eslint-disable-next-line no-unused-vars
                    onSave: async (rowKey, data, _row) => {
                        await editDepartment(data);
                        await waitTime(500);
                    },
                    // eslint-disable-next-line no-unused-vars
                    onDelete: async (rowKey, data, _row) => {
                        await deleteDepartmentById(data.id);
                        await waitTime(500);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
            {/*<Table columns={columns} dataSource={departmentData}/>*/}
        </>
    )
}