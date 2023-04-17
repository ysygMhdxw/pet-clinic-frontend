/* eslint-disable no-unused-vars */
import {  StepsForm } from '@ant-design/pro-components';
import { Table, Space, Button, message, Form, Input, InputNumber ,Modal,Transfer} from 'antd';
import React from 'react';
import { useEffect , useState } from 'react'
import {PlusOutlined} from "@ant-design/icons"
import api from '../../api/api';
import { Num } from '../../utils/enums';
import { QuestionTransfer } from './questionsTransfer';
export const QuizManagement = (  ) => {
    const [messageApi, contextHolder] = message.useMessage();
    const info = (msg) => {
        messageApi.info(msg);
    };
    const columns = [
        {
            titile:'考试编号',
            dataIndex: 'list_id',
            key: 'list_id',
            width: '10%',
        },

        {
          title: '考试名称',
          dataIndex: 'name',
          key:'name',
          width: '20%',
        },
        {
          title: '考试描述',
          dataIndex: 'description',
          key:'description',
          width: '40%',
        },
        {
          title: '用时',
          dataIndex: 'duration',
          key: 'duration',
          sorter: {
            compare: (a, b) => a.duration - b.duration,
            multiple: 2,
          },
          width: '10%',
        },
        
        {
          title: 'Action',
          key: 'action',
          // eslint-disable-next-line no-unused-vars
          render: (_, record) => (
            <Space size="middle">
              <Button
                type = "link"
                onClick={async()=>
                  {handleQuizData(record)
                    getAllQuestions()
                    await waitTime(1000);
                    setIsQuestionVisible(true)}
                   }>
                  查看详情
              </Button>
              <Button
                type = "link"
                onClick={async()=>
                  {deleteQuizs([record]);
                    setQuizListData(quizListData.filter((item) => item.list_id !== record.list_id));
                    info("删除成功！");
                    await waitTime(500);}
                   }>
                  删除考试
              </Button>
            </Space>
          ),
        },
      ];
    
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
        const newData = quizListData.filter((row) => !keys.includes(row.list_id));
        setQuizListData(newData);
        deleteQuizs(selectedRows);
        setSelectedRows([]);
        message.success('批量删除成功！');
    };

    const deleteQuizs = async (records) => {
        let resp = {
            quizs:[]
        }
        for (let record of records) {
            resp.quizs.push(record.id)
        }
        const res = await api.deleteQuiz(resp);
        const data = res.data
        console.log(data)
    }

      const waitTime = (time = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };
      const [quizListData,setQuizListData] = useState([]);

      async function getQuizListData(){
        const response = await api.getQuizList();
        const quizList = response.data.quizs;
        let i = 0
        for ( let quiz of quizList ) {
            quiz['list_id'] = i++
        }
        setQuizListData(quizList);
      }

      useEffect(()=>{
        getQuizListData();
    },[]);
    
     const [isModalOpen, setIsModalOpen] = useState(false)
     const onChange = (pagination, filters, sorter, extra) => {
     console.log('params', pagination, filters, sorter, extra);
      };
    
      //students 穿梭框
     const [studentsData, setStudentsData] = useState([]);
     const [targetKeys, setTargetKeys] = useState([]);
     const filterOption = (inputValue, option) => option.key.indexOf(inputValue) > -1;
     const handleChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys);
      };
      const handleSearch = (dir, value) => {
        //console.log('search:', dir, value);
      };
      useEffect(() => {
        getStudentsData();
      }, []);
    
      async function getStudentsData () {
        const tempTargetKeys = [];
        const tempData = [];
        const res = await api.getUsers()
        const data = res.data
        data.users.forEach(user => {
            const stu = {
                key: user.id,
                title: user.username,
              };
              if (stu.chosen) {
                tempTargetKeys.push(stu.key);
              }
              tempData.push(stu);
        });
        setStudentsData(tempData);
        setTargetKeys(tempTargetKeys);
      }


      //添加题目
      const[singleNum,setSingleNum] =useState(0);
      const [multiNum,setMultiNum] =useState(0);
      const [tofNum,setTofNum] =useState(0);
      const [textNum,setTextNum] =useState(0);

    //生成随机数组
    function generateRandomArray(x, y) {
    const arr = [];
    while (arr.length < x) {
        const randomNum = Math.floor(Math.random() * y) + 1;
        if (!arr.includes(randomNum)) {
         arr.push(randomNum);
        }
     }
     return arr;
    }


     
    async function handleQuizData(record){
        let keys = [];
        for (let [type, arr] of Object.entries(record.questions)) {
            for (let id of arr) {
                keys.push(type + id.toString());
            }
        }
        console.log(keys)
        setTargetQuestionKeys(keys);
    }
    const [targetQuestionKeys,setTargetQuestionKeys] = useState([])
    const [isQuestionVisible,setIsQuestionVisible] = useState(false)

    //处理全部问题的数据，在questionsTransfer中显示
    const [allQuestions,setAllQuestions] = useState([])
    const typeMap = {single: '单选题', multi: '多选题', tof: '判断题', text: '简答题'};
    async function getAllQuestions(){
        const response = await api.getQuestionList()
        const data = await response.data
        let allQuestions = []
        for (let [type, arr] of Object.entries(data)) {
           if (type in typeMap){
            for(let item of Array.from(arr)) {
            const question = {
                id: item.id,
                type: type,
                question_type: typeMap[type],
                key: type + item.id.toString(),
                description: item.description.substring(0,10)+'...',
                disease_type: item.disease_type
            }
            allQuestions.push(question)
           }}
        }
        console.log(allQuestions)
        setAllQuestions(allQuestions)
    }

    return (
        <>
        {contextHolder}
        <h1 style={{marginBottom: "1"}}>考试管理</h1>
        <div style={{display: "flex", margin: "10px"}}>
         <div style={{marginLeft: "auto"}}>
         <Button type="primary" onClick={()=>{setIsModalOpen(true)}}>
            <PlusOutlined/>
             新建考试
         </Button>
        
         <Button type="primary" onClick={handleBatchDelete} style={{marginLeft:"15px"}}>
                        批量删除
         </Button>
         </div>   
         </div>
         <StepsForm
        onFinish={async (values) => {
          let resp = {
            name: values.name,
            description: values.description,
            duration: values.duration,
            students: {list:targetKeys},
            questions:
            {
                single: generateRandomArray(singleNum,Num.singleMax),
                multi: generateRandomArray(multiNum,Num.multiMax),
                tof: generateRandomArray(tofNum,Num.tofMax),
                text: generateRandomArray(textNum,Num.textMax)
            }
          }
          console.log(resp)
          const res = await api.addQuiz(resp)
            const data = res.data
            console.log(data)
          await waitTime(1000)
          getQuizListData()
          setIsModalOpen(false)
          setTargetKeys([])
          message.success('提交成功')
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="新建考试"
              width={800}
              onCancel={() => setIsModalOpen(false)}
              open={isModalOpen}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="创建考试"
          onFinish={async () => {
            await waitTime(500);
            return true;
          }}
        >
              <Form.Item
                name="name"
                label="考试名称"
                rules={[{ required: true, message: '请输入考试名称' }]}
              >
                <Input />
              </Form.Item>
    
              <Form.Item
                name="description"
                label="考试描述"
                rules={[{ required: true, message: '请输入考试描述' }]}
              >
                <Input.TextArea />
              </Form.Item>
    
              <Form.Item
                name="duration"
                label="用时"
                rules={[{ required: true, message: '请输入用时' }]}
              >
                <InputNumber />
              </Form.Item>
         
        </StepsForm.StepForm>

        <StepsForm.StepForm name="question" title="添加试题"  
        onFinish={async () => {
            await waitTime(500);
            return true;
          }}>
        <Form.Item
                name="single"
                label="单选题"
              >
                <InputNumber
                defaultValue={0}
                min={0}
                max={Num.singleMax}
                onChange={(value)=>{setSingleNum(value)}} />  道
              </Form.Item>

              <Form.Item
                name="multi"
                label="多选题"
              >
                <InputNumber
                defaultValue={0}
                min={0}
                max={Num.multiMax}
                onChange={(value)=>{setMultiNum(value)}} /> 道
              </Form.Item>

              <Form.Item
                name="tof"
                label="判断题"
              >
                <InputNumber
                defaultValue={0}
                min={0}
                max={Num.tofMax}
                onChange={(value)=>{setTofNum(value)}} /> 道
              </Form.Item>

              <Form.Item
                name="text"
                label="问答题"
              >
                <InputNumber
                min={0}
                max={Num.textMax}
                defaultValue={0}
                onChange={(value)=>{setTextNum(value)}} /> 道
              </Form.Item>
        </StepsForm.StepForm>  
        <StepsForm.StepForm name="students" title="添加学生">
        <Form.Item>
        <Transfer
         dataSource={studentsData}
         showSearch
         filterOption={filterOption}
         targetKeys={targetKeys}
         onChange={handleChange}
         onSearch={handleSearch}
         render={(item) => item.title}
        />
        </Form.Item>
        </StepsForm.StepForm>

 
      </StepsForm>

        { isQuestionVisible && (<QuestionTransfer 
            isQuestionVisible = {isQuestionVisible}
            setIsQuestionVisible = {setIsQuestionVisible}
            targetQuestionKeys = {targetQuestionKeys}
            allQuestions = {allQuestions}
            info = {info} /> )}
        
        <Table columns={columns} dataSource={quizListData} onChange={onChange}
         rowKey="list_id"
         rowSelection={{
            type: 'checkbox',
            onChange: handleRowSelection
        }} />
        </>
    )}