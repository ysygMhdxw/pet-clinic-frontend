import {Button, Input, InputNumber, message, Popconfirm, Select, Space} from "antd";
import api from "../../api/api";
import React, {useEffect, useRef, useState} from "react";
import {
    EditableProTable,
    ModalForm,
    ProForm, ProFormMoney,
    ProFormSelect,
    ProFormText,
    ProFormTextArea
} from "@ant-design/pro-components";
import {FilterOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
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

export const CheckUpManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = (msg) => {
        messageApi.success(msg);
    };
    const showError = (msg) => {
        messageApi.error(msg);
    };
    const [checkupData, setCheckupData] = useState([])
    const [editableKeys, setEditableRowKeys] = useState([]);
    // const [dataSource, setDataSource] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [departmentToIdMap, setDepartmentToIdMap] = useState(new Map());
    // eslint-disable-next-line no-unused-vars
    const [IdToDepartmentMap, setIdToDepartmentMap] = useState(new Map());
    const [departmentNameOptions, setDepartmentNameOptions] = useState([]);
    const searchInput = useRef(null);

    const [startPrice, setStartPrice] = useState(null);
    const [endPrice, setEndPrice] = useState(null);
    const [priceFilteredInfo, setPriceFilteredInfo] = useState({});
    const handlePriceFilter = (value, record) => {
        const {price} = record;
        if (startPrice && endPrice) {
            return price >= startPrice && price <= endPrice;
        } else if (startPrice) {
            return price >= startPrice;
        } else if (endPrice) {
            return price <= endPrice;
        }
        return true;
    };
    const handlePriceReset = () => {
        setStartPrice(null);
        setEndPrice(null);
        setPriceFilteredInfo({});
    };
    const handlePriceConfirm = () => {
        setPriceFilteredInfo({
            price: {
                ...priceFilteredInfo.price,
                filters: [{text: `${startPrice} - ${endPrice}`, value: 'price'}],
                filteredValue: [startPrice, endPrice],
            },
        });
    };
    // eslint-disable-next-line no-unused-vars
    const priceFilterDropdown = ({setSelectedKeys, confirm, clearFilters}) => (
        <div style={{padding: 8}}>
            <InputNumber
                placeholder="最小值"
                style={{width: 120, marginRight: 8}}
                value={startPrice}
                onChange={value => setStartPrice(value)}
                onPressEnter={confirm}
                min={0}
            />
            <InputNumber
                placeholder="最大值"
                style={{width: 120, marginRight: 8}}
                value={endPrice}
                onChange={value => setEndPrice(value)}
                onPressEnter={confirm}
                min={0}
            />
            <div style={{marginTop: "10px", gap: "5px", display: "flex"}}>
                <Button onClick={handlePriceReset}>重置</Button>
                <Button onClick={handlePriceConfirm}>筛选</Button>
            </div>
        </div>
    );


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
            title: '检查项目编号',
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
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps("id", "检查项目编号")
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
            title: '检查项目名称',
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
            ...getColumnSearchProps("name", "检查项目名称")
        },
        {
            title: '检查项目简介',
            key: 'description',
            dataIndex: 'description',
            ...getColumnSearchProps("description", "检查项目简介")
        },
        {
            title: '检查项目价格（元）',
            key: 'price',
            dataIndex: 'price',
            width: '15%',
            fieldProps: {
                type: 'number',
                min: 0,
                precision:0
            },
            filterIcon: <FilterOutlined/>,
            filterDropdown: priceFilterDropdown,
            filteredValue: priceFilteredInfo.price && priceFilteredInfo.price.filteredValue,
            onFilter: handlePriceFilter,
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
                        deleteCheckupById(record.id, (error) => {
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
            const res = await api.deleteCheckups(keys)
            const data = res.data
            console.log(data)
            getCheckupData()
            success("批量删除检查项目成功！")
        } catch (error) {
            console.error(error);
            showError("批量删除检查项目失败，请稍后再试！");
        }
    };

    function transferToId(data) {
        console.log(data)
        return data.map(item => ({
            id: item.id,
            dept_id: departmentToIdMap.get(item.dept_name),
            name: item.name,
            description: item.description,
            price: item.price
        }));
    }


    useEffect(() => {
        getCheckupData()
    }, []);


    async function getCheckupData() {
        try {
            const res = await api.getCheckup()
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
                let checkupdata = data.checkuplist.map(item => ({
                    id: item.id,
                    dept_name: idToNameMap.get(item.dept_id),
                    name: item.name,
                    description: item.description,
                    price: item.price
                }));
                setDepartmentNameOptions(departments);
                setDepartmentToIdMap(nameToIdMap);
                setIdToDepartmentMap(idToNameMap);
                setCheckupData(checkupdata)
                console.log(checkupdata)
                console.log(departments)
            }

        } catch (error) {
            console.error(error);
            showError("不存在检查项目数据！");
        }
    }


    async function deleteCheckupById(checkup_id, onError) {
        try {
            const res = await api.deleteCheckup(checkup_id)
            const data = res.data
            console.log(data)
            getCheckupData()
            success("删除检查项目成功！")
        } catch (error) {
            console.error(error);
            onError("删除检查项目失败！");
        }
    }

    async function editCheckup(checkup) {
        try {
            const res = await api.editCheckup(transferToId([checkup])[0])
            const data = res.data
            console.log(data)
            getCheckupData()
            success("修改检查项目成功！")
        } catch (error) {
            getCheckupData()
            console.error(error);
            showError("修改检查项目失败！");
        }
    }

    async function addCheckup(checkup) {
        try {
            let eachCheckupData = transferToId([checkup])[0]
            console.log(eachCheckupData)
            const res = await api.addCheckup(eachCheckupData)
            const data = res.data
            console.log(data)
            getCheckupData()
            success("添加检查项目成功！")
        } catch (error) {
            if (error.response && error.response.status === 400) {
                showError('检查项目所在科室不存在，请重新添加！');
            } else {
                showError("添加检查项目失败！");
            }
        }
    }


    return (
        <>
            {contextHolder}
            <h1 style={{marginBottom: "1"}}>检查项目管理</h1>
            <div style={{display: "flex", justifyContent: "flex-end", gap: "10px", marginRight: "3%"}}>
                <div style={{marginLeft: "auto"}}>
                    <ModalForm
                        labelWidth="auto"
                        trigger={
                            <Button type="primary">
                                <PlusOutlined/>
                                新建检查项目
                            </Button>
                        }
                        onFinish={async (values) => {
                            await waitTime(500);
                            addCheckup({id: random(0, 10000000), ...values})
                            console.log(values);
                            getCheckupData()
                            return true;
                        }}
                    >
                        <ProForm.Group>
                            <ProFormText
                                width="md"
                                name="name"
                                label="检查项目名称"
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
                                label="检查项目简介"
                                placeholder="请输入检查项目简介"
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormMoney
                                name='price'
                                width="md"
                                fieldProps={{
                                    moneySymbol: false,
                                    precision: 0
                                }}
                                min={0}
                                tooltip="请输入正确格式的金额（单位为元）"
                                label="检查项目价格（元）"
                                placeholder="请输入检查项目价格"
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
                headerTitle="检查项目基本信息"
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
                value={checkupData}
                onChange={setCheckupData}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    // eslint-disable-next-line no-unused-vars
                    onSave: async (rowKey, data, _row) => {
                        editCheckup(data)
                        await waitTime(500);
                    },
                    // eslint-disable-next-line no-unused-vars
                    onDelete: async (rowKey, data, _row) => {
                        deleteCheckupById(data.id, (error) => {
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