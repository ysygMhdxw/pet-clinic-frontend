import {Button, Descriptions, Divider, Input, InputNumber, Space} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {FilterOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {ProTable} from "@ant-design/pro-components";
import PropTypes from "prop-types";
import {Department3dComponent} from "./department3dComponent";


export const DepartmentDetail = (props) => {

    const departmentInfo = props.departmentInfo
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


    const instrumentationColumns = [
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
            width: '15%',
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
        }
    ];
    const checkupColumns = [
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
            ...getColumnSearchProps("id", "检查项目编号")
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
                precision: 0
            },
            filterIcon: <FilterOutlined/>,
            filterDropdown: priceFilterDropdown,
            filteredValue: priceFilteredInfo.price && priceFilteredInfo.price.filteredValue,
            onFilter: handlePriceFilter,
        },
    ];

    useEffect(() => {
        console.log(departmentInfo.checkuplist)
        console.log(departmentInfo.instrumentationlist)
    })
    return (
        <div>
            <div style={{marginTop: "2%"}}>
                <Descriptions
                    title={`${departmentInfo.name} 3D导览`}
                    bordered
                    column={1}
                >
                </Descriptions>
                <Department3dComponent departmentName={departmentInfo.name}/>
                <Divider/>
                <Descriptions
                    title={"科室详情信息"}
                    bordered
                    column={1}
                >
                    <Descriptions.Item label="科室编号">{departmentInfo.id}</Descriptions.Item>
                    <Descriptions.Item label="科室名称">{departmentInfo.name}</Descriptions.Item>
                    <Descriptions.Item label="科室简介">{departmentInfo.description}</Descriptions.Item>
                    <Descriptions.Item label="科室负责人">{departmentInfo.manager}</Descriptions.Item>
                </Descriptions>

                {
                    departmentInfo.instrumentationlist.length !== 0 ?
                        <div style={{marginTop: "3%"}}>
                            <ProTable
                                columns={instrumentationColumns}
                                dataSource={departmentInfo.instrumentationlist}
                                search={false}
                                toolBarRender={false}
                            />
                        </div> : ""
                }

                {
                    departmentInfo.checkuplist.length !== 0 ?
                        <div style={{marginTop: "3%"}}>
                            <ProTable
                                columns={checkupColumns}
                                dataSource={departmentInfo.checkuplist}
                                search={false}
                                toolBarRender={false}
                            />
                        </div> : ""
                }
            </div>
        </div>

    )

}

DepartmentDetail.propTypes = {
    departmentInfo: PropTypes.object
};