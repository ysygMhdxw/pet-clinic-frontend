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
import {CaseEditForm} from "./caseEditForm";

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


export const CaseManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const info = (msg) => {
        messageApi.info(msg);
    };
    const [caseData, setCaseData] = useState([]);
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [displayFlg, setDisplayFlg] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [,setCaseInfo]=useState([]);
    // const [dataSource, setDataSource] = useState([]);
    const columns = [
        {
            title: '病例编号',
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
            title: '病例种类',
            key: 'disease_type',
            dataIndex: 'disease_type',
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
            title: '疾病名称',
            key: 'disease_name',
            dataIndex: 'disease_name',
        },
        {
            title: '宠物名称',
            key: 'pet_name',
            dataIndex: 'pet_name',
        },
        {
            title: '宠物种类',
            key: 'pet_species',
            dataIndex: 'pet_species',
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,
            render: (text, record) => [
                <a
                    key="detail"
                    onClick={() => {
                        setCaseInfo(record)
                        console.log(record)
                        setDisplayFlg(false)
                    }}
                >
                    修改
                </a>,
                <Popconfirm
                    key="delete"
                    placement="top"
                    title={"删除数据"}
                    description={"确认删除此条数据？删除后将无法恢复。"}
                    onConfirm={async () => {
                        setCaseData(caseData.filter((item) => item.id !== record.id));
                        deleteCaseById(record.id);
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
        getCaseData()
    }, []);

    async function getCaseData() {
        const res = await api.getAllCases()
        const data = await res.json()
        setCaseData(data.cases)
        console.log(data.cases);
    }

    async function deleteCaseById(case_id) {
        const res = await api.deleteCaseByCaseId(case_id)
        const data = await res.json()
        console.log(data.case_id)
    }

    async function editCase(caseData) {
        const res = await api.editDepartment(caseData)
        const data = await res.json()
        console.log(data)
    }

    async function addCase(caseData) {
        const res = await api.addCase(caseData)
        const data = await res.json()
        console.log(data)
    }

    if (displayFlg) {
        return (
            <>
                {contextHolder}
                <h1 style={{marginBottom: "1"}}>病例管理</h1>
                <div style={{display: "flex", margin: "10px"}}>
                    <div style={{marginLeft: "auto"}}>
                        <ModalForm
                            labelWidth="auto"
                            trigger={
                                <Button type="primary">
                                    <PlusOutlined/>
                                    新建病例
                                </Button>
                            }
                            onFinish={async (values) => {
                                await waitTime(1000);
                                addCase({id: random(0, 10000000), ...values})
                                console.log(values);
                                getCaseData();
                                message.success('新建成功');
                                return true;
                            }}
                        >
                            <ProForm.Group>
                                <ProFormText
                                    width="md"
                                    name="name"
                                    label="病例名称"
                                    tooltip="最长为 24 位"
                                    placeholder="请输入名称"
                                />
                                {/*<ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称"/>*/}
                            </ProForm.Group>
                            <ProForm.Group>
                                <ProFormText
                                    name='description'
                                    width="md"
                                    label="病例简介"
                                    placeholder="请输入科室简介"
                                />
                            </ProForm.Group>

                        </ModalForm>
                    </div>
                </div>

                <EditableProTable
                    rowKey="id"
                    headerTitle="病例基本信息"
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
                    value={caseData}
                    onChange={setCaseData}
                    editable={{
                        type: 'multiple',
                        editableKeys,
                        // eslint-disable-next-line no-unused-vars
                        onSave: async (rowKey, data, _row) => {
                            editCase(data)
                            info("修改成功！")
                            await waitTime(500);
                        },
                        // eslint-disable-next-line no-unused-vars
                        onDelete: async (rowKey, data, _row) => {
                            deleteCaseById(data.id)
                            info("删除成功！")
                            await waitTime(500);
                        },
                        onChange: setEditableRowKeys,
                    }}
                />
                {/*<Table columns={columns} dataSource={caseData}/>*/}
            </>
        )
    } else {
        return (
            <div>
                {/*<CaseDetail caseInfo={caseInfo}/>*/}
                <CaseEditForm/>
            </div>
        )
    }

}
