import {Button, Form, Input, InputNumber, message, Popconfirm, Space} from "antd";
import api from "../../api/api";
import moment from 'moment';
import React, {useEffect, useRef, useState} from "react";
import {
    EditableProTable,
    ModalForm,
    ProForm, ProFormDatePicker, ProFormDependency, ProFormMoney, ProFormSelect,
    ProFormText
} from "@ant-design/pro-components";
import {FilterOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import PropTypes from "prop-types";

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

export const HospitalizationManagement = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = (msg) => {
        messageApi.success(msg);
    };
    const showError = (msg) => {
        messageApi.error(msg);
    };

    const [hospitalizationData, setHospitalizationData] = useState([])
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [form] = Form.useForm()

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
            const res = await api.deleteHospitalizations(keys)
            const data = res.data
            console.log(data)
            success("批量删除住院数据成功！")
            getHospitalizationData()
        } catch (error) {
            console.error(error);
            showError("批量删除住院数据失败，请稍后再试！");
        }
    };




    useEffect(() => {
        getHospitalizationData()
    }, []);

    const formattedData = (data) => data.map(item => {
        const bgTimeObj = new Date(item.bg_time);
        const edTimeObj = new Date(item.ed_time);

        const year1 = bgTimeObj.getFullYear();
        const month1 = String(bgTimeObj.getMonth() + 1).padStart(2, '0');
        const day1 = String(bgTimeObj.getDate()).padStart(2, '0');
        const formattedBgTime = `${year1}-${month1}-${day1}`;

        const year2 = edTimeObj.getFullYear();
        const month2 = String(edTimeObj.getMonth() + 1).padStart(2, '0');
        const day2 = String(edTimeObj.getDate()).padStart(2, '0');
        const formattedEdTime = `${year2}-${month2}-${day2}`;

        return {
            ...item,
            bg_time: formattedBgTime,
            ed_time: formattedEdTime
        };
    });

    async function getHospitalizationData() {
        try {
            const res = await api.getHospitalization()
            const data = res.data
            let datas = formattedData(data.hospitalizationlist)
            console.log(datas)
            setHospitalizationData(datas)
        } catch (error) {
            console.error(error);
            showError("不存在住院数据！");
        }
    }

    async function deleteHospitalizationById(hospitalization_id, onError) {
        try {
            const res = await api.deleteHospitalization(hospitalization_id)
            const data = res.data
            console.log(data)
            getHospitalizationData()
            success("删除住院信息成功！")
        } catch (error) {
            console.error(error);
            onError("删除住院信息失败！");
        }
    }

    async function editHospitalization(hospitalization) {
        try {
            const res = await api.editHospitalilzation(hospitalization)
            const data = res.data
            console.log(data)
            getHospitalizationData()
            success("修改住院信息成功！")
        } catch (error) {
            getHospitalizationData()
            console.error(error);
            showError("修改住院信息失败！");
        }
    }


    async function addHospitalization(hospitalization) {
        try {
            const res = await api.addHospitalization(hospitalization)
            const data = res.data
            console.log(data)
            getHospitalizationData()
            success("添加住院成功！")
        } catch (error) {
            console.error(error);
            showError("添加住院失败！");
        }
    }

    const columns = [
        {
            title: '住院编号',
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
            ...getColumnSearchProps("id", "住院编号")
        },
        {
            title: '住院病例编号',
            key: 'case_id',
            dataIndex: 'case_id',
            valueType: "select",
            request : async () => props.caseNumberOptions,
            formItemProps: (form, {rowIndex}) => {
                return {
                    rules: rowIndex > 1 ? [{required: true, message: '此项为必填项'}] : [],
                };
            },
            editable: (text, record, index) => {
                return index !== 0;
            },
            width: '15%',
            ...getColumnSearchProps("case_id", "住院病例编号")
        },
        {
            title: '住院开始日期',
            key: 'bg_time',
            dataIndex: 'bg_time',
            width: '15%',
            valueType: 'date',
            editable: true,
            required: true,
            fieldProps: {
                format: 'YYYY-MM-DD',
                showTime: true,
                allowClear: false,
            },
            ...getColumnSearchProps("bg_time", "住院开始时间")
        },
        {
            title: '住院结束日期',
            key: 'ed_time',
            dataIndex: 'ed_time',
            width: '15%',
            valueType: 'date',
            editable: true,
            required: true,
            fieldProps: {
                format: 'YYYY-MM-DD',
                showTime: true,
                allowClear: false,
            },
            ...getColumnSearchProps("ed_time", "住院结束时间")
        },
        {
            title: '住院价格（元）',
            key: 'price',
            dataIndex: 'price',
            width: '15%',
            fieldProps: {
                type: 'number',
                min: 0,
                precision: 0
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
                        deleteHospitalizationById(record.id, (error) => {
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

    return (
        <>
            {contextHolder}
            <h1 style={{marginBottom: "1"}}>住院管理</h1>
            <div style={{display: "flex", justifyContent: "flex-end", gap: "10px", marginRight: "3%"}}>
                <div style={{marginLeft: "auto"}}>
                    <ModalForm
                        labelWidth="auto"
                        trigger={
                            <Button type="primary">
                                <PlusOutlined/>
                                新建住院信息
                            </Button>
                        }
                        onFinish={async (values) => {
                            try {
                                // 验证出院时间必须早于入院时间
                                const admissionDate = moment(values.bg_time)
                                const dischargeDate = moment(values.ed_time);
                                console.log("admission date", admissionDate)
                                console.log("discharge date", dischargeDate)

                                if (admissionDate && dischargeDate && dischargeDate.isBefore(admissionDate)) {
                                    throw new Error('住院结束日期必须晚于住院开始日期！')
                                }
                                addHospitalization({id: random(0, 10000000), ...values})
                                await waitTime(500);
                                // 执行其他操作，比如提交表单数据到后端
                                console.log('表单验证成功，提交的数据为：', values);
                            } catch (error) {
                                getHospitalizationData()
                                console.error('表单验证失败：', error);
                                showError(error.message);
                            }
                            await waitTime(500);
                            getHospitalizationData();
                            return true;
                        }}
                    >
                        <ProForm.Group>
                            <ProFormText
                                width="md"
                                name="name"
                                label="住院名称"
                                tooltip="最长为 24 位"
                                placeholder="请输入名称"
                            />
                        </ProForm.Group>
                        <ProForm.Group>
                            <ProFormSelect
                                name='case_id'
                                width="md"
                                label="住院病例编号"
                                options={props.caseNumberOptions}
                                placeholder="请输入住院病例编号"
                            />
                        </ProForm.Group>
                        <ProFormDependency name={['bg_time', 'ed_time']}>
                            {/* eslint-disable-next-line no-unused-vars */}
                            {({bg_time, ed_time}) => {
                                return (
                                    <div>
                                        <ProForm.Group>
                                            <ProFormDatePicker
                                                name='bg_time'
                                                width="md"
                                                label="住院开始日期"
                                                placeholder="请输入住院开始日期"
                                            />
                                        </ProForm.Group>
                                        <ProForm.Group>
                                            <ProFormDatePicker
                                                name='ed_time'
                                                width="md"
                                                label="住院结束日期"
                                                placeholder="请输入住院结束日期"
                                                rules={[{
                                                    validator: (_, value) => {
                                                        if (!value || !bg_time || moment(value).isSameOrAfter(bg_time)) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject('住院结束日期不能早于开始日期');
                                                    }
                                                }]}
                                            />
                                        </ProForm.Group>
                                    </div>
                                );
                            }}
                        </ProFormDependency>
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
                                label="住院价格（元）"
                                placeholder="请输入住院价格"
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
                form={form}
                rowKey="id"
                headerTitle="住院基本信息"
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
                value={hospitalizationData}
                onChange={setHospitalizationData}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    // eslint-disable-next-line no-unused-vars
                    onSave: async (rowKey, data, row) => {
                        try {
                            // 验证出院时间必须早于入院时间
                            const admissionDate = moment(data.bg_time)
                            const dischargeDate = moment(data.ed_time);
                            console.log("admission date", admissionDate)
                            console.log("discharge date", dischargeDate)

                            if (admissionDate && dischargeDate && dischargeDate.isBefore(admissionDate)) {
                                throw new Error('住院结束日期必须晚于住院开始日期！')
                            }
                            editHospitalization(data)
                            await waitTime(500);
                            // 执行其他操作，比如提交表单数据到后端
                            console.log('表单验证成功，提交的数据为：', data);
                        } catch (error) {
                            getHospitalizationData()
                            console.error('表单验证失败：', error);
                            showError(error.message);
                        }
                    },
                    // eslint-disable-next-line no-unused-vars
                    onDelete: async (rowKey, data, _row) => {
                        deleteHospitalizationById(data.id, (error) => {
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
HospitalizationManagement.propTypes={
    caseNumberOptions:PropTypes.array
}