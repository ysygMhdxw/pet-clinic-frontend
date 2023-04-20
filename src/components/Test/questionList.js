import React, {useEffect} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {ProTable} from '@ant-design/pro-components';
import {Button, Input, Space, Select} from 'antd';
import {useRef, useState} from 'react';
import propTypes from 'prop-types'
import Highlighter from 'react-highlight-words';
import api from '../../api/api';


export const QuestionList = (props) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [questionData, setQuestionData] = useState([]);
    const searchInput = useRef(null);


    async function getQuestionsData() {
        const response = await api.getQuestionList();
        const posts = response.data;
        var questions = [];
        for (const question of posts.single) {
            question.question_type = "单选题"
            questions.push(question);
        }
        for (const question of posts.multi) {
            question.question_type = "多选题"
            questions.push(question);
        }
        for (const question of posts.tof) {
            question.question_type = "判断题"
            questions.push(question);
        }
        for (const question of posts.text) {
            question.question_type = "简答题"
            questions.push(question);
        }
        setQuestionData(questions);
    }

    useEffect(() => {
        getQuestionsData();
    }, []);


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
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
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
                        搜索
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
                        清空搜索
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
    const [selectValue, setSelectValue] = useState()
    const options = [
        {
            value: '单选题',
            label: '单选题',
        },
        {
            value: '多选题',
            label: '多选题',
        },
        {
            value: '判断题',
            label: '判断题',
        },
        {
            value: '简答题',
            label: '简答题',
        }];

    const getFixedSearchProps = (dataIndex) => ({
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
                    }}
                    placeholder="Please select"
                    defaultValue={[]}
                    value={selectValue}
                    onChange={(value) => {setSelectedKeys(value ? [value] : [])
                                          setSelectValue(value)}}
                    options={options}
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
                        搜索
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
                            setSelectValue()
                        }}
                    >
                        清空搜索
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

    /* const handleClick = (record)=>{
       console.log("click");
       console.log(record)
       props.setCardView(true);
     }*/

    const columns = [
        {
            title: '试题描述',
            dataIndex: 'description',
            key: 'description',
            width: '40%',
            ...getColumnSearchProps('description'),
        },
        {
            title: '病种',
            dataIndex: 'disease_type',
            key: 'disease_type',
            valueType: 'select',
            valueEnum: {
                infectious: {text: '传染病'},
                internal: {text: '内科'},
                surgery: {
                    text: '常用手术'
                },
                parasitic: {
                    text: '寄生虫病'
                },
                immunology: {text: '免疫'},
                obstetric: {text: '外产科疾病'},
            },
            width: '15%',
        },
        {
            title: '题目类型',
            dataIndex: 'question_type',
            key: 'question_type',
            width: '15%',

            ...getFixedSearchProps('question_type'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => {
                            props.setCardView(true);
                            props.setQuestionDetail(record);
                            console.log("change view")
                        }}>
                        查看
                    </Button>
                </Space>
            ),
        },
    ];


    return (
        <ProTable pagination={{
            pageSize: 10,
            showQuickJumper: true,
            // showSizeChanger: true,
            // total: 20,
        }}
        columns={columns} dataSource={questionData} search={false}/>
    )

}
QuestionList.propTypes = {
    setCardView: propTypes.func,
    setQuestionDetail: propTypes.func
}
