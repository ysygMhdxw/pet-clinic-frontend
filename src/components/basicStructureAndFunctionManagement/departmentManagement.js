import {Button, message, Popconfirm} from "antd";
import api from "../../api/api";
import React, {useEffect, useState} from "react";
import {
    EditableProTable,
    ModalForm,
    ProForm,
    ProFormText
} from "@ant-design/pro-components";
import {PlusOutlined} from "@ant-design/icons";

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
    const info = (msg) => {
        messageApi.info(msg);
    };
    const [departmentData, setDepartmentData] = useState([])
    const [editableKeys, setEditableRowKeys] = useState([]);
    // const [dataSource, setDataSource] = useState([]);
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
            editable: (text, record, index) => {
                return index !== 0;
            },
            width: '15%',
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
        },
        {
            title: '科室简介',
            key: 'description',
            dataIndex: 'description',
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
                        setDepartmentData(departmentData.filter((item) => item.id !== record.id));
                        deleteDepartmentById(record.id);
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
        getDepartmentData()
    }, []);

    async function getDepartmentData() {
        const res = await api.getDepartment()
        const data = res.data
        setDepartmentData(data.departmentlist)
        console.log(data.departmentlist);
    }

    async function deleteDepartmentById(department_id) {
        const res = await api.deleteDepartment(department_id)
        const data = res.data
        console.log(data.department.id)
    }

    async function editDepartment(department) {
        const res = await api.editDepartment(department)
        const data = res.data
        console.log(data.department.id)
    }
    async function addDepartment(department) {
        const res = await api.addDepartment(department)
        const data = res.data
        console.log(data)
    }


    return (
        <>
            {contextHolder}
            <h1 style={{marginBottom: "1"}}>科室管理</h1>
            <div style={{display: "flex", margin: "10px"}}>
                <div style={{marginLeft: "auto"}}>
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
                            addDepartment({id: random(0, 10000000),...values})
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
                            {/*<ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称"/>*/}
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormText
                                name='description'
                                width="md"
                                label="科室简介"
                                placeholder="请输入科室简介"
                            />
                        </ProForm.Group>

                    </ModalForm>
                </div>
            </div>

            <EditableProTable
                rowKey="id"
                headerTitle="科室基本信息"
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
                value={departmentData}
                onChange={setDepartmentData}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    // eslint-disable-next-line no-unused-vars
                    onSave: async (rowKey, data, _row) => {
                        editDepartment(data)
                        info("修改成功！")
                        await waitTime(500);
                    },
                    // eslint-disable-next-line no-unused-vars
                    onDelete: async (rowKey, data, _row) => {
                        deleteDepartmentById(data.id)
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