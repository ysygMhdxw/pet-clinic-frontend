import {Button, Input, InputNumber, message, Popconfirm, Space} from "antd";
import api from "../../api/api";
import React, {useEffect, useRef, useState} from "react";
import {
    EditableProTable,
    ModalForm,
    ProForm, ProFormMoney,
    ProFormText, ProFormTextArea
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

export const VaccineManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = (msg) => {
        messageApi.success(msg);
    };
    const showError = (msg) => {
        messageApi.error(msg);
    };
    const [medicineData, setMedicineData] = useState([])
    const [editableKeys, setEditableRowKeys] = useState([]);
    // const [dataSource, setDataSource] = useState([]);
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
            title: '疫苗编号',
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
            width: '15%',
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps("id", "疫苗编号")
        },
        {
            title: '疫苗名称',
            key: 'name',
            dataIndex: 'name',
            formItemProps:  {
                rules:  [{required: true, message: '此项为必填项'}]
            },
            editable: (text, record, index) => {
                return index !== 0;
            },
            width: '10%',
            ...getColumnSearchProps("name", "疫苗名称")
        },
        {
            title: '疫苗种类',
            key: 'tag',
            dataIndex: 'tag',
            formItemProps:  {
                    rules:  [{required: true, message: '此项为必填项'}]
            },
            width: '10%',
            ...getColumnSearchProps("tag", "疫苗种类")
        },
        {
            title: '疫苗简介',
            key: 'description',
            dataIndex: 'description',
            formItemProps:  {
                rules:  [{required: true, message: '此项为必填项'}]
            },
            ...getColumnSearchProps("description", "疫苗简介")
        },
        {
            title: '疫苗价格（元）',
            key: 'price',
            dataIndex: 'price',
            width: '15%',
            formItemProps:  {
                rules:  [{required: true, message: '此项为必填项'}]
            },
            fieldProps: {
                type: 'number',
                min: 0,
                precision:0
            },
            render: (value) => {
                const formattedValue = value.toLocaleString("zh-CN", { minimumFractionDigits: 0 });
                return formattedValue.replace(/^0+/, "");
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
                        deleteMedicineById(record.id, (error) => {
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
            const res = await api.deleteMedicines(keys)
            const data = res.data
            console.log(data)
            getMedicineData()
            success("批量删除疫苗成功！")
        } catch (error) {
            console.error(error);
            showError("批量删除疫苗失败，请稍后再试！");
        }
        setSelectedRows([]);
    };

    useEffect(() => {
        getMedicineData()
    }, []);

    async function getMedicineData() {
        try {
            const res = await api.getMedicine()
            const data = res.data
            setMedicineData(data.medicinelist.filter((item) => item.type === "疫苗"))
            console.log(data.medicinelist);
        } catch (error) {
            console.error(error);
            showError("不存在疫苗数据！");
        }
    }

    async function deleteMedicineById(medicine_id, onError) {
        try {
            const res = await api.deleteMedicine(medicine_id)
            const data = res.data
            console.log(data)
            getMedicineData()
            success("删除疫苗成功！")
        } catch (error) {
            console.error(error);
            onError("删除疫苗失败！");
        }

    }

    async function editMedicine(medicine) {
        try {
            const res = await api.editMedicine(medicine)
            const data = res.data
            console.log(data)
            getMedicineData()
            success("修改疫苗成功！")
        } catch (error) {
            getMedicineData()
            console.error(error);
            showError("修改疫苗失败！");
        }
    }

    async function addMedicine(medicine) {
        try {
            const res = await api.addMedicine(medicine)
            const data = res.data
            console.log(data)
            getMedicineData()
            success("添加疫苗成功！")
        } catch (error) {
            console.error(error);
            showError("添加疫苗失败！");
        }
    }


    return (
        <>
            {contextHolder}
            <h1 style={{marginBottom: "1"}}>疫苗管理</h1>
            <div style={{display: "flex", justifyContent: "flex-end", gap: "10px", marginRight: "3%"}}>
                <div style={{marginLeft: "auto"}}>
                    <ModalForm
                        labelWidth="auto"
                        trigger={
                            <Button type="primary">
                                <PlusOutlined/>
                                新建疫苗
                            </Button>
                        }
                        onFinish={async (values) => {
                            await waitTime(500);
                            addMedicine({id: random(0, 10000000), type: "疫苗", ...values})
                            console.log(values);
                            getMedicineData();
                            return true;
                        }}
                    >
                        <ProForm.Group>
                            <ProFormText
                                width="md"
                                name="name"
                                label="疫苗名称"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入疫苗名称！',
                                    },
                                ]}
                                tooltip="最长为 24 位"
                                placeholder="请输入名称"
                            />
                            {/*<ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称"/>*/}
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormText
                                name='tag'
                                width="md"
                                label="疫苗种类"
                                rules={[
                                    {
                                        required: true,
                                        message: '此项为必填项！',
                                    },
                                ]}
                                placeholder="请输入疫苗种类"
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
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入疫苗价格！',
                                    },
                                ]}
                                tooltip="请输入正确格式的金额（单位为元）"
                                label="疫苗价格（元）"
                                placeholder="请输入疫苗价格"
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormTextArea
                                name='description'
                                width="md"
                                label="疫苗简介"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入疫苗简介！',
                                    },
                                ]}
                                placeholder="请输入疫苗简介"
                            />
                        </ProForm.Group>


                    </ModalForm>
                </div>
                <div>
                    <Button type="primary" onClick={handleBatchDelete}>
                        批量删除
                    </Button>
                </div>
                {/*<div>*/}
                {/*    <Button type="primary">*/}
                {/*        批量上传*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>

            <EditableProTable
                rowKey="id"
                headerTitle="疫苗基本信息"
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
                value={medicineData}
                onChange={setMedicineData}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    // eslint-disable-next-line no-unused-vars
                    onSave: async (rowKey, data, _row) => {
                        console.log("data",data)
                        editMedicine(data)
                        getMedicineData()
                        await waitTime(500);
                    },
                    // eslint-disable-next-line no-unused-vars
                    onDelete: async (rowKey, data, _row) => {
                        deleteMedicineById(data.id, (error) => {
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