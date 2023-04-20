import {Button,Space, Form, Select,Input, message, Popconfirm, Checkbox,Row, InputNumber} from "antd";
const { Option } = Select;
import api from "../../api/api";
import React, {useEffect, useState, useRef} from "react";
import {
    EditableProTable,
    ModalForm
    } from "@ant-design/pro-components";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";



const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};



const types = ["single","multi","tof","text"]

export const QuestionManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const info = (msg) => {
        messageApi.info(msg);
    };

    const [form] = Form.useForm();
    const [questionsData, setQuestionsData] = useState([])
    const [editableKeys, setEditableRowKeys] = useState([]);
    // const [dataSource, setDataSource] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };

// 定义校验规则
const validateNumberRange = (type, value) => {
    let min, max;
    if (type === 'single' || type === 'tof') {
      min = 1;
      max = 5;
    } else if (type === 'multi') {
      min = 1;
      max = 10;
    } else if (type === 'text') {
      min = 10;
      max = 20;
    }
    if (value < min || value > max) {
        messageApi.open({
            type: 'error',
            content: `数字范围必须在${min}到${max}之间`,
          }); 
      return false;
    }
    return true;
  };


    // eslint-disable-next-line no-unused-vars
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
                搜索
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
            title: '试题编号',
            dataIndex: 'list_id',
            key: 'list_id',
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

        },
        
        {
            title: '疾病类型',
            key: 'disease_type',
            dataIndex: 'disease_type',
            valueType: 'select',
            valueEnum: {
                infectious: { text: '传染病' },
                internal: { text: '内科' },
                surgery: {
                  text: '常用手术'
                },
                parasitic: {
                  text: '寄生虫病'
                },
                immunology: { text: '免疫' },
                obstetric: { text: '外产科疾病' },
              },
            width: '15%'
        },

        {
            title: '试题描述',
            key: 'description',
            dataIndex: 'description',
            width: '35%',
            ...getColumnSearchProps('description')
           
        },

        {
            title: '试题类型',
            key: 'question_type',
            dataIndex: 'question_type',
            valueType: 'select',
            valueEnum: {
                multi: { text: '多选题', status: 'Default' },
                single: { text: '单选题', status: 'Warning' },
                text: {
                  text: '填空题',
                  status: 'Error',
                },
                tof: {
                  text: '判断题',
                  status: 'Success',
                },
              },
              width: '10%'
        },
        {
            title: '试题分数',
            key: 'score',
            dataIndex: 'score',
            width: '10%'
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,
            render: (text, record) => [
                <Popconfirm
                    key="delete"
                    placement="top"
                    title={"删除数据"}
                    description={"确认删除此条数据？删除后将无法恢复。"}
                    onConfirm={async () => {
                        setQuestionsData(questionsData.filter((item) => item.id !== record.id));
                        deleteQuestions([record]);
                        info("删除成功！");
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

    useEffect(() => {
        getQuestionData()
    }, []);


    // eslint-disable-next-line no-unused-vars
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
        const keys = selectedRows.map((row) => row.list_id);
        const newData = questionsData.filter((row) => !keys.includes(row.list_id));
        setQuestionsData(newData);
        deleteQuestions(selectedRows);
        setSelectedRows([]);
        message.success('批量删除成功！');
    };


    let questions = [];
    async function getQuestionData() {
        const res = await api.getQuestionList()
        const data = res.data
        //console.log(data)
        let i = 0
        for (let [type, arr] of Object.entries(data)){
            if (types.indexOf(type) != -1){
                for ( let question of arr )
                {
                    question.question_type = type
                    question.list_id = i
                    i++
                    questions.push(question)
                }
            }      
        }
        console.log(questions)
        setQuestionsData(questions)
    }

    async function deleteQuestions(records) {
        console.log(records)
        let resp = { single: [],
                     multi: [],
                     tof: [],
                     text:[]}
        for (let record of records){
            resp[record.question_type].push(record.id)
        }
        console.log("delete:")
        console.log(resp)
        const res = await api.deleteQuestions(resp)
        const data = res.data
        console.log(data)
    }

    async function editQuestion(question) {
        console.log(question)
    }


    async function addQuestion(record) {
        record['name'] = 'default';
        let resp = { single: [],
            multi: [],
            tof: [],
            text:[]}
            resp[record.question_type].push(record)
            console.log("post:")
            console.log(resp)
            const res = await api.addQuestions(resp)
            const data = res.data
            console.log(data)

    }
   


    return (
        <>
            {contextHolder}
            <h1 style={{marginBottom: "1"}}>题目管理</h1>
            <div style={{display: "flex", margin: "10px"}}>
                <div style={{marginLeft: "auto"}}>
                    <ModalForm
                        labelWidth="auto"
                        trigger={
                            <Button type="primary">
                                <PlusOutlined/>
                                新建题目
                            </Button>
                        }
                        form={form}
                        onFinish={async (values) => {
                            if (values['question_type'] === 'multi' && ((!(values.answerA || values.answerB || values.answerC || values.answerD))))
                            { 
                                messageApi.open({
                                    type: 'error',
                                    content: '请至少设置一个选项',
                                  });       
                            }
                            else {
                            if (!validateNumberRange(values['question_type'],values['score']))
                            {
                                messageApi.open({
                                    type: 'error',
                                    content: `分数范围不合法`,
                                  });
                            }

                            else{
                            await waitTime(1000);
                            addQuestion(values);
                            getQuestionData();
                            message.success('新建成功');
                            return true;}}
                        }}
                    >
                        <Form.Item
                        name="question_type"
                        label="题目类型"
                        rules={[
                        {
                        required: true,
                        },
                        ]}
                     >
                        <Select
                        placeholder="请选择要添加的题目类型"
                        //onChange={onGenderChange}
                        allowClear
                    >
                    <Option value="single">单选题</Option>
                    <Option value="multi">多选题</Option>
                    <Option value="tof">判断题</Option>
                    <Option value="text">简答题</Option>
                        </Select>
                        </Form.Item>




                        <Form.Item
                        name="disease_type"
                        label="疾病种类"
                        rules={[
                        {
                        required: true,
                        },
                        ]}
                     >
                        <Select
                        placeholder="请选择题目的疾病种类"
                        allowClear
                    >
                    <Option value="infectious">传染病</Option>
                    <Option value="internal">内科</Option>
                    <Option value="surgery">常用手术</Option>
                    <Option value="parasitic">寄生虫病</Option>
                    <Option value="immunology">免疫</Option>
                    <Option value="obstetric">外产科疾病</Option>
                        </Select>
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="题目描述"
                            rules={[
                            {
                                required: true,
                            },
                            ]}>
                             <Input.TextArea showCount maxLength={100} />
                        </Form.Item> 

                        <Form.Item
                            noStyle
                            shouldUpdate={(preValues,currentValues) => preValues.question_type !== currentValues.question_type}>
                            {( {getFieldValue} ) =>
                                getFieldValue('question_type') === 'single' || getFieldValue('question_type') === 'multi'? (
                                    <a>
                                    <Form.Item
                                        name="optionA"
                                        label="optionA"
                                        rules={[
                                        {
                                             required: true,
                                        },
                                         ]}
                                >
                                    <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="optionB"
                                        label="optionB"
                                        rules={[
                                        {
                                             required: true,
                                        },
                                         ]}
                                >
                                    <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="optionC"
                                        label="optionC"
                                        rules={[
                                        {
                                             required: true,
                                        },
                                         ]}
                                >
                                    <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="optionD"
                                        label="optionD"
                                        rules={[
                                        {
                                             required: true,
                                        },
                                         ]}
                                >
                                    <Input />
                                    </Form.Item>

                                    </a>
                                ) : null

                            }

                        </Form.Item>

                        <Form.Item
                            noStyle
                            shouldUpdate={(preValues,currentValues) => preValues.question_type !== currentValues.question_type}>
                            {( {getFieldValue} ) =>
                                getFieldValue('question_type') === 'single' ? 
                                    <a>
                                        <Form.Item
                                        name="answer"
                                        label="答案"
                                        rules={[
                                        {
                                        required: true,
                                        },
                                        ]}
                                         >
                                 <Select
                                    placeholder="请选择答案"
                                    allowClear
                                    >
                                <Option value={1}>Option A</Option>
                                <Option value={2}>Option B</Option>
                                <Option value={3}>Option C</Option>
                                <Option value={4}>Option D</Option>
                                </Select>
                            </Form.Item>

                                    </a>
                                

                                :  (
                                    getFieldValue('question_type') === 'tof' ? 
                                    <a>
                                    <Form.Item
                                    name="answer"
                                    label="答案"
                                    rules={[
                                    {
                                    required: true,
                                    },
                                    ]}
                                     >
                             <Select
                                placeholder="请选择答案"
                                allowClear
                                >
                            <Option value={0}>错误</Option>
                            <Option value={1}>正确</Option>
                            </Select>
                                    </Form.Item>
                                    </a>
                                    :
                                    (getFieldValue('question_type') === 'multi' ? 
                                        <p>
                                            答案
                                        <Row>
                                        <Form.Item
                                        name="answerA"
                                        valuePropName="checked"
                                        >
                                        <Checkbox defaultChecked={false} value="answerA">A</Checkbox>    
                                       </Form.Item>

                                       <Form.Item
                                        name="answerB"
                                        valuePropName="checked"
                                        >
                                        <Checkbox defaultChecked={false} value="answerB">B</Checkbox>    
                                       </Form.Item>

                                       <Form.Item
                                        name="answerC"
                                        valuePropName="checked"
                                        >
                                        <Checkbox defaultChecked={false} value="answerC">C</Checkbox>    
                                       </Form.Item>

                                       <Form.Item
                                        name="answerD"
                                        valuePropName="checked"
                                        >
                                        <Checkbox defaultChecked={false} value="answerD">D</Checkbox>    
                                       </Form.Item>


                                       </Row>

                                       

                                       </p>
                                        :
                                        <Form.Item
                                        name="answer"
                                        label="答案"
                                        rules={[
                                        {
                                         required: true,
                                        },
                                         ]}>
                                        <Input.TextArea showCount maxLength={100} />
                        </Form.Item> )
                                    )
                                
                            
                            

                            }

                        </Form.Item>


                        <Form.Item label="分值">
                        <Form.Item 
                        rules={[
                            {
                            required: true,
                            },
                            ]}
                        name="score" noStyle
                        >
                        <InputNumber min={1} max={20} />
                        </Form.Item>
                        </Form.Item>


                    </ModalForm>
                </div>
                <div style={{marginLeft:"2%"}}>
                    <Button type="primary" onClick={handleBatchDelete}>
                        批量删除
                    </Button>
                </div>

            </div>

            <EditableProTable
                rowKey="list_id"
                headerTitle="题目管理"
                maxLength={5}
                scroll={{
                    x: 960,
                }}
                pagination={{
                    pageSize: 10,
                    showQuickJumper: true,
                    // showSizeChanger: true,
                    // total: 20,
                }}
                recordCreatorProps={false}
                loading={false}
                columns={columns}
                value={questionsData}
                onChange={setQuestionsData}
                rowSelection={{
                    type: 'checkbox',
                    onChange: handleRowSelection
                }}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    // eslint-disable-next-line no-unused-vars
                    onSave: async (rowKey, data, _row) => {
                        editQuestion(data)
                        info("修改成功！")
                        await waitTime(500);
                    },
                    // eslint-disable-next-line no-unused-vars
                    onDelete: async (rowKey, data, _row) => {
                        //deleteUserById([data.id])
                        info("删除成功！")
                        await waitTime(500);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
            {/*<Table columns={columns} dataSource={departmentData}/>*/}
        </>
    )
}