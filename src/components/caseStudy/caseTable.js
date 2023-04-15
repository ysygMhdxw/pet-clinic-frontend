import React, {useEffect, useRef} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {ProTable} from '@ant-design/pro-components';
import {Space, message, Input, Button, Select} from 'antd';
import {useState} from 'react';
import api from '../../api/api';
import PropTypes from "prop-types";
import Highlighter from "react-highlight-words";


export const CaseTable = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    // const success = (msg) => {
    //     messageApi.success(msg);
    // };
    const showError = (msg) => {
        messageApi.error(msg);
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [caseData, setCaseData] = useState([]);
    const searchInput = useRef(null);
    const [tableTypes, setTableTypes] = useState([])
    const selectRef = useRef(null);


    async function getCasesData(caseName) {
        try {
            let res = {}
            if (caseName === "") {
                res = await api.getAllCases()
            } else res = await api.getCaseByDiseaseName(props.caseName)
            const data = res.data
            setCaseData(data.cases)
            console.log("case data: ", data.cases)
            props.setDisplayFlg(false)
        } catch (error) {
            console.error(error);
            setCaseData([]);
            showError("不存在病例数据！");
        }
    }


    async function getTableTypesData() {
        try {
            const responce = await api.getCaseCategories()
            const data = responce.data
            let caseCategories = data.case_categories
            let caseTypeDatas = []
            caseCategories.map((caseCategory) => {
                const transformedData = caseCategory.children.map(item => ({
                    value: item.key,
                    label: item.title
                }));
                caseTypeDatas.push(...transformedData)
            })
            console.log("caseTypeDatas: ", caseTypeDatas)
            setTableTypes(caseTypeDatas)
        } catch (error) {
            console.error(error);
            showError("不存在病例目录！");
        }
    }


    useEffect(() => {
        getCasesData(props.caseName)
        getTableTypesData()
        console.log(caseData)
    }, [props.caseName]);

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


    const getFixedSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Select
                    ref={selectRef}
                    allowClear
                    style={{
                        width: '100%',
                        marginBottom: "10px"
                    }}
                    placeholder="请选择病例种类"
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
            title: '病例标识',
            dataIndex: 'case_number',
            key: 'case_number',
            ...getColumnSearchProps("case_number", "病例标识")
        },
        {
            title: '宠物名称',
            dataIndex: 'pet_name',
            key: 'pet_name',
            ...getColumnSearchProps("pet_name", "宠物名称")
        },
        {
            title: '病种名称',
            dataIndex: 'disease_name',
            key: 'disease_name',
            ...getFixedSearchProps("disease_name", "病种名称")
        },
        {
            title: '宠物主人名称',
            dataIndex: 'owner_name',
            key: 'owner_name',
            ...getColumnSearchProps("owner_name", "宠物主人名称")
        },
        {
            title: '操作',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <a onClick={() => {
                        Promise.all([
                            props.setCaseInfo(record)
                        ]).then(() => {
                            props.setDisplayFlg(true);
                        });
                    }}
                    >查看病例详情</a>
                </Space>
            ),
        },
    ];


    return (
        <div style={{marginTop: "10px"}}>
            {contextHolder}
            <ProTable
                columns={columns}
                dataSource={caseData}
                search={false}
                toolBarRender={false}
            />
        </div>

    )

}
CaseTable.propTypes = {
    caseName: PropTypes.string,
    setDisplayFlg: PropTypes.bool,
    setCaseInfo: PropTypes.object
}
