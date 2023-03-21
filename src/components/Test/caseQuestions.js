import React, { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Select } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import api from '../../api/api';



export const CaseQuestions = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [questionData,setQuestionData] = useState([]);
  const searchInput = useRef(null);

  async function getQuestionsData(){
    const response = await api.getQuestionList();
    const posts = await response.json();
    var questions=[];
    for(const question of posts.single){
      question.question_type = "单选题"
      console.log(question);
      questions.push(question);
      }
    for(const question of posts.multi){
      question.question_type = "多选题"
      console.log(question);
      questions.push(question);
      }
    for(const question of posts.tof){
      question.question_type = "判断题"
      console.log(question);
      questions.push(question);
      }
    for(const question of posts.text){
      question.question_type = "简答题"
      console.log(question);
      questions.push(question);
      }
    setQuestionData(questions);
  }

  useEffect(()=>{
      getQuestionsData();
      

  },[]);



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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
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
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
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
  const options = [{
                    value:'单选题',
                    lable:'单选题',
                  },
                  {
                    value:'多选题',
                    lable:'多选题',
                  },
                  {
                    value:'判断题',
                    lable:'判断题',
                  },
                  {
                  value:'简答题',
                  lable:'简答题',
                  }];
            
  const getFixedSearchProps = (dataIndex) =>({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
      onChange={(value) => setSelectedKeys(value ? [value] : [])}
      options={options}
      />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
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
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
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
          title: '试题名称',
          dataIndex: 'name',
          key: 'name',
          width: '20%',
          ...getColumnSearchProps('name'),
        },
        {
          title: '病种',
          dataIndex: 'disease_type',
          key: 'disease_type',
          width: '20%',
          ...getColumnSearchProps('disease_type'),
        },
        {
          title: '题目类型',
          dataIndex: 'question_type',
          key: 'question_type',
          ...getFixedSearchProps('question_type'),
        },
      ];

  
  return (
        <Table columns={columns} dataSource={questionData} />
    )

}
