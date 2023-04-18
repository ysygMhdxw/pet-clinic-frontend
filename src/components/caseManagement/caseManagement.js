import {Button, Divider, Input, message, Popconfirm, Select, Space, Tooltip} from "antd";
import api from "../../api/api";
import React, {useEffect, useRef, useState} from "react";
import {
    EditableProTable,

} from "@ant-design/pro-components";
import {SearchOutlined} from "@ant-design/icons";
import {CaseEditForm} from "./caseEditForm";
import {CaseNewForm} from "./newCaseForm";
import Highlighter from "react-highlight-words";
import {CheckUpTable} from "./checkupTable";


const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};


export const CaseManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = (msg) => {
        messageApi.success(msg);
    };
    const showError = (msg) => {
        messageApi.error(msg);
    };

    const [caseData, setCaseData] = useState([]);
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [displayFlg, setDisplayFlg] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [caseInfo, setCaseInfo] = useState([]);
    // const [casecheckupInfo, setCaseCheckupInfo] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [tableLittleType, setTableLittleType] = useState([]);
    const [tableBigType, setTableBigType] = useState([]);
    const [tableCategory, setTableCategory] = useState([]);


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

    const getFixedSearchProps = (dataIndex, columnName, tableTypes) => ({
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
                        width: '100%',
                        marginBottom: '10px'
                    }}
                    placeholder={`请选择${columnName}`}
                    defaultValue={[]}
                    onChange={(value) => setSelectedKeys(value ? [value] : [])}
                    options={tableTypes}
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
                    {/*<Button*/}
                    {/*    onClick={() => clearFilters && handleReset(clearFilters)}*/}
                    {/*    size="small"*/}
                    {/*    style={{*/}
                    {/*        width: 90,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    重置*/}
                    {/*</Button>*/}
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
            record[dataIndex].toString().includes(value),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });


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
            width: '10%',
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps("id", "病例编号")
        },
        {
            title: '病例标识',
            dataIndex: 'case_number',
            key: 'case_number',
            formItemProps: (form, {rowIndex}) => {
                return {
                    rules: rowIndex > 1 ? [{required: true, message: '此项为必填项'}] : [],
                };
            },
            // 第一行不允许编辑
            editable: (text, record, index) => {
                return index !== 0;
            },
            width: '10%',
            ...getColumnSearchProps("case_number", "病例标识")
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
            ...getFixedSearchProps("disease_type", "病例种类", tableBigType)
        },
        {
            title: '病种名称',
            key: 'disease_name',
            dataIndex: 'disease_name',
            ...getFixedSearchProps("disease_name", "病种种类", tableLittleType)
        },
        {
            title: '宠物名称',
            key: 'pet_name',
            dataIndex: 'pet_name',
            ...getColumnSearchProps("pet_name", "宠物名称")
        },
        {
            title: '宠物种类',
            key: 'pet_species',
            dataIndex: 'pet_species',
            ...getColumnSearchProps("pet_species", "宠物种类")
        },
        {
            title: '操作',
            valueType: 'option',
            width: 300,
            render: (text, record) => [
                <Tooltip key="tooltip1" title={"修改病例的基本信息，包括主要病症、诊断结果、治疗方案。"}>
                    <a
                        key="detail"
                        onClick={() => {
                            setCaseInfo(record)
                            setDisplayFlg(3)
                        }}
                    >
                        修改基本信息
                    </a>
                </Tooltip>,
                <Divider
                    key="divider1"
                    type={"vertical"}
                >
                </Divider>,
                <Tooltip key="tooltip2" title={"修改病例的所有检查项目。"}>
                    <a
                        key="checkup"
                        onClick={() => {
                            setCaseInfo(record)
                            setDisplayFlg(2)
                        }}
                    >
                        修改检查信息
                    </a>
                </Tooltip>,
                <Divider
                    key="divider2"
                    type={"vertical"}
                >
                </Divider>,
                <Popconfirm
                    key="delete"
                    placement="top"
                    title={"删除数据"}
                    description={"确认删除此条数据？删除后将无法恢复。"}
                    onConfirm={async () => {
                        setCaseData(caseData.filter((item) => item.id !== record.id));
                        deleteCaseByCaseNumbers([record.case_number]);
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
        try {
            const keys = selectedRows.map((row) => row.case_number);
            const newData = caseData.filter((row) => !keys.includes(row.case_number));
            setCaseData(newData);
            deleteCaseByCaseNumbers(keys);
        } catch (error) {
            console.log(error)
            showError("批量删除失败！")
        }
        getCaseData()
        setSelectedRows([]);
    };

    useEffect(() => {
        console.log("casemanagement useeffect")
        if (displayFlg) {
            getCaseData()
            getCaseNumbers()
            getTableLittleTypesData()
            getTableBigTypesData()
        }
    }, [displayFlg]);

    const [caseNumbers,setCaseNumbers]=useState([]);
    async function getCaseNumbers() {
        try {
            const res = await api.getAllCases()
            const data = res.data
            const caseNumbersList = data.cases.map((caseObj) => caseObj.case_number);
            setCaseNumbers(caseNumbersList)
        } catch (error) {
            console.error(error);
            showError("不存在病例数据！");
        }
    }

    async function getCaseData() {
        try {
            const res = await api.getAllCases()
            const data = res.data
            setCaseData(data.cases)
            console.log(data.cases);
        } catch (error) {
            console.error(error);
            setCaseData([]);
            showError("不存在病例数据！");
        }
    }

    async function getTableLittleTypesData() {
        try {
            const responce = await api.getCaseCategories()
            const data = responce.data
            let caseCategories = data.case_categories
            let caseTypeDatas = []
            caseCategories.map((caseCategory) => {
                const transformedData = caseCategory.children.map(item => ({
                    value: item.title,
                    label: item.title
                }));
                caseTypeDatas.push(...transformedData)
            })
            console.log("caseTypeDatas: ", caseTypeDatas)
            setTableLittleType(caseTypeDatas)
        } catch (error) {
            console.error(error);
            showError("不存在病种分类！");
        }
    }

    async function getTableBigTypesData() {
        try {
            const responce = await api.getCaseCategories()
            const data = responce.data
            let caseCategories = data.case_categories
            setTableCategory(caseCategories)
            let caseTypeDatas = []
            caseCategories.map((caseCategory) => {
                caseTypeDatas.push({
                    value: caseCategory.title,
                    label: caseCategory.title
                })
            })
            console.log("Big caseTypeDatas: ", caseTypeDatas)
            setTableBigType(caseTypeDatas)
        } catch (error) {
            console.error(error);
            showError("不存在病例分类！");
        }
    }

    async function deleteCaseByCaseNumbers(case_numbers) {
        try {
            const res = await api.deleteCasesByCaseNumbers(case_numbers)
            const data = res.data
            console.log(data)
            success("删除病例基本信息成功！")
        } catch (error) {
            showError("删除病例基本信息失败！")
        }
        getCaseData()
    }

    async function editCase(caseData) {
        const res = await api.editDepartment(caseData)
        const data = res.data
        console.log(data)
    }


    if (displayFlg === 1) {
        return (
            <>
                {contextHolder}
                <div>
                    <h1 style={{marginBottom: "1"}}>病例管理</h1>
                    <div style={{display: "flex", margin: "10px"}}>
                        <div style={{marginLeft: "auto"}}>
                            <CaseNewForm
                                tableCategory={tableCategory}
                                getcasedata={getCaseData}
                                caseNumbers={caseNumbers}
                            />
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
                        value={caseData}
                        onChange={setCaseData}
                        editable={{
                            type: 'multiple',
                            editableKeys,
                            // eslint-disable-next-line no-unused-vars
                            onSave: async (rowKey, data, _row) => {
                                editCase(data)
                                await waitTime(500);
                            },
                            // eslint-disable-next-line no-unused-vars
                            onDelete: async (rowKey, data, _row) => {
                                deleteCaseByCaseNumbers([data.case_number])
                                await waitTime(500);
                            },
                            onChange: setEditableRowKeys,
                        }}
                    />
                </div>

            </>
        )
    } else if (displayFlg === 2) {
        return (
            <div>
                <div style={{marginBottom: "5%"}}>
                    <Button type={"primary"} onClick={() => {
                        setDisplayFlg(1)
                    }}>返回到病例管理</Button>
                </div>
                <CheckUpTable caseNumber={caseInfo.case_number}/>
            </div>
        )
    } else if (displayFlg === 3) {
        return (
            <div>
                {/*<CaseDetail caseInfo={caseInfo}/>*/}
                <div style={{marginBottom: "5%"}}>
                    <Button type={"primary"} onClick={() => {
                        setDisplayFlg(1)
                    }}>返回到病例管理</Button>
                </div>
                <CaseEditForm caseNumber={caseInfo.case_number}/>
            </div>
        )
    }

}
