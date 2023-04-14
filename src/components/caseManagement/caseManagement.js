import {Button, message, Popconfirm} from "antd";
import api from "../../api/api";
import React, {useEffect, useState} from "react";
import {
    EditableProTable,
    ModalForm,
} from "@ant-design/pro-components";
import {PlusOutlined} from "@ant-design/icons";
import {CaseEditForm} from "./caseEditForm";
import {CaseNewForm} from "./newCaseForm";

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
    const [caseInfo, setCaseInfo] = useState([]);
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
        const newData = caseData.filter((row) => !keys.includes(row.id));
        setCaseData(newData);
        setSelectedRows([]);
        deleteCaseById(keys);
        message.success('批量删除成功！');
    };

    useEffect(() => {
        if(displayFlg)getCaseData()
    }, [displayFlg]);

    async function getCaseData() {
        const res = await api.getAllCases()
        const data = res.data
        setCaseData(data.cases)
        console.log(data.cases);
    }

    async function deleteCaseById(case_id) {
        const res = await api.deleteCasesByCaseIds([case_id])
        const data = res.data
        console.log(data)
    }

    async function editCase(caseData) {
        const res = await api.editDepartment(caseData)
        const data = res.data
        console.log(data)
    }

    async function addCase(caseData) {
        const res = await api.addCase(caseData)
        const data = res.data
        console.log(data)
    }

    if (displayFlg) {
        return (
            <>
                {contextHolder}
                <div>
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
                                <CaseNewForm/>
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
                        headerTitle="病例基本信息"
                        maxLength={5}
                        scroll={{
                            x: 960,
                        }}
                        rowSelection={{
                            type: 'checkbox',
                            onChange: handleRowSelection
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
                </div>

            </>
        )
    } else {
        return (
            <div>
                {/*<CaseDetail caseInfo={caseInfo}/>*/}
                <div style={{marginBottom: "5%"}}>
                    <Button type={"primary"} onClick={() => {
                        setDisplayFlg(true)
                    }}>返回</Button>
                </div>
                <CaseEditForm caseId={caseInfo.id}/>
            </div>
        )
    }

}
