import {Button, Input, message, Space} from "antd";
import api from "../../api/api";
import React, {useEffect, useRef, useState} from "react";
import {
    ProTable
} from "@ant-design/pro-components";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {DepartmentDetail} from "./departmentDetail";


export const DepartmentDisplay = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const showError = (msg) => {
        messageApi.error(msg);
    };
    const [departmentData, setDepartmentData] = useState([])

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [displayFlag, setDisplayFlag]=useState(false);
    const [departmentInfo, setDepartmentInfo] = useState("")

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
            editable: false,
            tooltip: "不允许修改！",
            width: '10%',
            ...getColumnSearchProps("id", "科室编号")
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
            ...getColumnSearchProps("name", "科室名称")
        },
        {
            title: '科室简介',
            key: 'description',
            dataIndex: 'description',
            ...getColumnSearchProps("description", "科室简介")
        },
        {
            title: '科室负责人',
            key: 'manager',
            dataIndex: 'manager',
            width: '15%',
            ...getColumnSearchProps("manager", "科室负责人")
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,
            render: (text, record) => [
                <a
                    key="editable"
                    onClick={async () => {
                        console.log(record.id)
                        const instrumentations = await getInstrumentationById(record.id);
                        const checkups = await getCheckupById(record.id);
                        let departmentVal = {
                            ...record,
                            instrumentationlist: instrumentations,
                            checkuplist: checkups
                        }
                        console.log("departmentVal: ", departmentVal)
                        setDepartmentInfo(departmentVal);
                        setDisplayFlag(true);
                    }}
                >
                    查看
                </a>,
            ],
        },
    ];

    async function getInstrumentationById(id) {
        try {
            const res = await api.getDepartmentInstrumentationById(id)
            const data = res.data
            return data.instrumentationlist;
        } catch (error) {
            console.error(error);
            showError("不存在科室器械数据！");
        }
    }

    async function getCheckupById(id) {
        try {
            const res = await api.getDepartmentCheckupById(id)
            const data = res.data
            return data.checkuplist
        } catch (error) {
            console.error(error);
            showError("不存在科室检查项目数据！");
        }
    }
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


    if(displayFlag){
        return (
            <div>
                <div style={{marginBottom: "3%"}}>
                    <Button type={"primary"} onClick={() => {
                        setDisplayFlag(false);
                    }}>返回</Button>
                </div>
                <DepartmentDetail departmentInfo={departmentInfo}/>
            </div>
        )
    }
    else {
        return (
            <>
                {contextHolder}
                <h1 style={{marginBottom: "1"}}>科室信息</h1>
                <ProTable
                    maxLength={5}
                    scroll={{
                        x: 960,
                    }}
                    pagination={{
                        pageSize: 10,
                        showQuickJumper: true,
                    }}
                    columns={columns}
                    search={false}
                    toolBarRender={false}
                    dataSource={departmentData}
                />
            </>
        )
    }

}