import {Button, message} from "antd";
import api from "../../api/api";
import React, {useEffect, useState} from "react";
import {
    EditableProTable,
    ModalForm,
    ProForm,
    ProFormText
} from "@ant-design/pro-components";
import {PlusOutlined} from "@ant-design/icons";


const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
export const DepartmentManagement = () => {
    const [departmentData, setDepartmentData] = useState([])
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const columns = [
        {
            title: '科室编号',
            dataIndex: 'id',
            formItemProps: (form, { rowIndex }) => {
                return {
                    rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
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
            dataIndex: 'name',
            formItemProps: (form, { rowIndex }) => {
                return {
                    rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
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
                <a
                    key="delete"
                    onClick={() => {
                        setDataSource(dataSource.filter((item) => item.id !== record.id));
                    }}
                >
                    删除
                </a>,
            ],
        },
    ];

    useEffect(() => {
        getDepartmentData()
    }, []);

    async function getDepartmentData() {
        const res = await api.getDepartment()
        const data = await res.json()
        setDepartmentData(data.departmentlist)
        console.log(data.departmentlist);
        console.log("department data");
    }

    return (
        <>
            <h1 style={{marginBottom: "1"}}>科室管理</h1>
            <div style={{display:"flex",margin:"10px"}}>
                <div style={{marginLeft:"auto"}}>
                    <ModalForm
                        labelWidth="auto"
                        trigger={
                            <Button type="primary">
                                <PlusOutlined/>
                                新建科室
                            </Button>
                        }
                        onFinish={async (values) => {
                            await waitTime(2000);
                            console.log(values);
                            message.success('提交成功');
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
                onChange={setDataSource}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {
                        console.log(rowKey, data, row);
                        await waitTime(2000);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
            {/*<Table columns={columns} dataSource={departmentData}/>*/}
        </>
    )
}