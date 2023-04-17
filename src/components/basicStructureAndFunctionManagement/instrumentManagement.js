import {Button, Input, message, Popconfirm, Select, Space} from "antd";
import api from "../../api/api";
import React, {useEffect, useRef, useState} from "react";
import {
    EditableProTable,
    ModalForm,
    ProForm,
    ProFormSelect,
    ProFormText,
    ProFormTextArea
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

export const InstrumentManagement = () => {
    const [departmentToIdMap, setDepartmentToIdMap] = useState(new Map());
    // eslint-disable-next-line no-unused-vars
    const [IdToDepartmentMap, setIdToDepartmentMap] = useState(new Map());
    const [departmentNameOptions, setDepartmentNameOptions] = useState([]);

    const [messageApi, contextHolder] = message.useMessage();
    const success = (msg) => {
        messageApi.success(msg);
    };
    const showError = (msg) => {
        messageApi.error(msg);
    };
    const [instrumentData, setInstrumentData] = useState([])
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
                    options={departmentNameOptions}
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
            title: '器械编号',
            dataIndex: 'id',
            key: 'id',
            formItemProps: (form, {rowIndex}) => {
                return {
                    rules: rowIndex > 1 ? [{required: true, message: '此项为必填项'}] : [],
                };
            },
            tooltip: "不允许修改",
            // 第一行不允许编辑
            editable: false,
            width: '10%',
            ...getColumnSearchProps("id", "器械编号")
        },
        {
            title: '所在科室',
            dataIndex: 'dept_name',
            key: 'dept_name',
            valueType: "select",
            request: async () => departmentNameOptions,
            // 第一行不允许编辑
            width: '10%',

            ...getFixedSearchProps("dept_name", "所在科室")
        },
        {
            title: '器械名称',
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
            width: '10%',
            ...getColumnSearchProps("name", "器械名称")
        },
        {
            title: '器械简介',
            key: 'description',
            dataIndex: 'description',
            ...getColumnSearchProps("description", "器械简介")
        },
        {
            title: '器械使用方法',
            key: 'method',
            dataIndex: 'method',
            ...getColumnSearchProps("method", "器械使用方法")
        },
        {
            title: '操作',
            valueType: 'option',
            width: 150,
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
                        deleteInstrumentById(record.id, (error) => {
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
        console.log("keys: ", keys)
        try {
            const res = await api.deleteInstruments(keys)
            const data = res.data
            console.log(data)
            getInstrumentData()
            success("批量删除器械成功！")
        } catch (error) {
            console.error(error);
            showError("批量删除器械失败，请稍后再试！");
        }
        setSelectedRows([]);
    };

    function transferToId(data) {
        console.log(data)
        return data.map(item => ({
            id: item.id,
            dept_id: departmentToIdMap.get(item.dept_name),
            name: item.name,
            description: item.description,
            method: item.method
        }));
    }


    useEffect(() => {
        getInstrumentData()
    }, []);


    async function getInstrumentData() {
        try {
            const res = await api.getInstrument()
            const data = res.data
            const departmentRes = await api.getDepartment()
            const departmentdata = departmentRes.data
            let departments = []
            let nameToIdMap = new Map();
            let idToNameMap = new Map();
            if (departmentdata) {
                let departmentDatas = departmentdata.departmentlist;
                departmentDatas.map((item) => {
                    departments.push({
                        value: item.name,
                        label: item.name
                    });
                    nameToIdMap.set(item.name, item.id);
                    idToNameMap.set(item.id, item.name);
                })
                let instrumentdata = data.instrumentationlist.map(item => ({
                    id: item.id,
                    dept_name: idToNameMap.get(item.dept_id),
                    name: item.name,
                    description: item.description,
                    method: item.method
                }));
                setDepartmentNameOptions(departments);
                setDepartmentToIdMap(nameToIdMap);
                setIdToDepartmentMap(idToNameMap);
                setInstrumentData(instrumentdata)
                console.log(instrumentdata)
                console.log(departments)
            }

        } catch (error) {
            console.error(error);
            showError("不存在器械数据！");
        }
    }


    async function deleteInstrumentById(instrument_id, onError) {
        try {
            const res = await api.deleteInstrument(instrument_id)
            const data = res.data
            console.log(data)
            getInstrumentData()
            success("删除器械成功！")
        } catch (error) {
            console.error(error);
            onError("删除器械失败！");
        }
    }

    async function editInstrument(instrument) {
        try {
            const res = await api.editInstrument(transferToId([instrument])[0])
            const data = res.data
            console.log(data)
            getInstrumentData()
            success("修改器械成功！")
        } catch (error) {
            console.error(error);
            showError("修改器械失败！");
        }
    }

    async function addInstrument(instrument) {
        try {
            let eachInstrumentData = transferToId([instrument])[0]
            console.log(eachInstrumentData)
            const res = await api.addInstrument(eachInstrumentData)
            const data = res.data
            console.log(data)
            getInstrumentData()
            success("添加器械成功！")
        } catch (error) {
            if (error.response && error.response.status === 400) {
                showError('器械所在科室不存在，请重新添加！');
            } else {
                showError("添加器械失败！");
            }
        }
    }


    return (
        <>
            {contextHolder}
            <h1 style={{marginBottom: "1"}}>器械管理</h1>
            <div style={{display: "flex", justifyContent: "flex-end", gap: "10px", marginRight: "3%"}}>
                <div style={{marginLeft: "auto"}}>
                    <ModalForm
                        labelWidth="auto"
                        trigger={
                            <Button type="primary">
                                <PlusOutlined/>
                                新建器械
                            </Button>
                        }
                        onFinish={async (values) => {
                            await waitTime(500);
                            addInstrument({id: random(0, 10000000), ...values})
                            console.log(values);
                            getInstrumentData()
                            return true;
                        }}
                    >
                        <ProForm.Group>
                            <ProFormText
                                width="md"
                                name="name"
                                label="器械名称"
                                tooltip="最长为 24 位"
                                placeholder="请输入名称"
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormSelect
                                width="md"
                                name="dept_name"
                                label="所在科室位置"
                                options={departmentNameOptions}
                                placeholder="请输入科室位置"
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormTextArea
                                name='description'
                                width="md"
                                label="器械简介"
                                placeholder="请输入器械简介"
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormTextArea
                                name='method'
                                width="md"
                                label="器械使用方法"
                                placeholder="请输入器械使用方法"
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
                headerTitle="器械基本信息"
                maxLength={5}
                scroll={{
                    x: 960,
                }}
                pagination={{
                    pageSize: 10,
                    showQuickJumper: true,
                }}
                recordCreatorProps={false}
                loading={false}
                columns={columns}
                rowSelection={{
                    type: 'checkbox',
                    onChange: handleRowSelection
                }}
                value={instrumentData}
                onChange={setInstrumentData}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    // eslint-disable-next-line no-unused-vars
                    onSave: async (rowKey, data, _row) => {
                        editInstrument(data)
                        await waitTime(500);
                    },
                    // eslint-disable-next-line no-unused-vars
                    onDelete: async (rowKey, data, _row) => {
                        deleteInstrumentById(data.id, (error) => {
                            if (error) showError(error);
                        });
                        await waitTime(500);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
        </>
    )
}