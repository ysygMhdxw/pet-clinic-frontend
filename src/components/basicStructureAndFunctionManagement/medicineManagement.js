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


export const MedicineManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const info = (msg) => {
        messageApi.info(msg);
    };
    const [medicineData, setMedicineData] = useState([])
    const [editableKeys, setEditableRowKeys] = useState([]);
    // const [dataSource, setDataSource] = useState([]);
    const columns = [
        {
            title: '药品编号',
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
            title: '药品名称',
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
            title: '药品种类',
            key: 'tag',
            dataIndex: 'tag',
        },
        {
            title: '药品简介',
            key: 'description',
            dataIndex: 'description',
        },
        {
            title: '药品价格',
            key: 'price',
            dataIndex: 'price',
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
                        setMedicineData(medicineData.filter((item) => item.id !== record.id));
                        (record.id);
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
        getMedicineData()
    }, []);

    async function getMedicineData() {
        const res = await api.getMedicine()
        const data = res.data
        setMedicineData(data.medicinelist)
        console.log(data.medicinelist);
    }

    async function deleteMedicineById(medicine_id) {
        const res = await api.deleteMedicine(medicine_id)
        const data = res.data
        console.log(data.medicinelist.id)
    }

    async function editMedicine(medicine) {
        const res = await api.editMedicine(medicine)
        const data = res.data
        console.log(data)
    }

    async function addMedicine(medicine) {
        const res = await api.addMedicine(medicine)
        const data = res.data
        console.log(data)
    }


    return (
        <>
            {contextHolder}
            <h1 style={{marginBottom: "1"}}>药品管理</h1>
            <div style={{display: "flex", margin: "10px"}}>
                <div style={{marginLeft: "auto"}}>
                    <ModalForm
                        labelWidth="auto"
                        trigger={
                            <Button type="primary">
                                <PlusOutlined/>
                                新建药品
                            </Button>
                        }
                        onFinish={async (values) => {
                            await waitTime(1000);
                            addMedicine({id: random(0, 10000000), ...values})
                            console.log(values);
                            getMedicineData();
                            message.success('新建成功');
                            return true;
                        }}
                    >
                        <ProForm.Group>
                            <ProFormText
                                width="md"
                                name="name"
                                label="药品名称"
                                tooltip="最长为 24 位"
                                placeholder="请输入名称"
                            />
                            {/*<ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称"/>*/}
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormText
                                name='tag'
                                width="md"
                                label="药品种类"
                                placeholder="请输入药品种类"
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormText
                                name='price'
                                width="md"
                                label="药品价格"
                                placeholder="请输入药品价格"
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormText
                                name='description'
                                width="md"
                                label="药品简介"
                                placeholder="请输入药品简介"
                            />
                        </ProForm.Group>


                    </ModalForm>
                </div>
            </div>

            <EditableProTable
                rowKey="id"
                headerTitle="药品基本信息"
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
                value={medicineData}
                onChange={setMedicineData}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    // eslint-disable-next-line no-unused-vars
                    onSave: async (rowKey, data, _row) => {
                        editMedicine(data)
                        info("修改成功！")
                        await waitTime(500);
                    },
                    // eslint-disable-next-line no-unused-vars
                    onDelete: async (rowKey, data, _row) => {
                        deleteMedicineById(data.id)
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