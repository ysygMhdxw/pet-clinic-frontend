/* eslint-disable no-unused-vars */
import {  StepsForm } from '@ant-design/pro-components';
import { Table, Space, Button, message, Form, Input, InputNumber ,Modal,Transfer} from 'antd';
import React from 'react';
import { useEffect , useState } from 'react'
import {PlusOutlined} from "@ant-design/icons"
import api from '../../api/api';

export const QuizManagement = (  ) => {
    const columns = [
        {
          title: '考试名称',
          dataIndex: 'name',
          width: '20%',
        },
        {
          title: '考试描述',
          dataIndex: 'description',
          width: '40%',
        },
        {
          title: '用时',
          dataIndex: 'duration',
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
                onClick={()=>
                  {}
                   }>
                  查看详情
              </Button>
              <Button
                type = "link"
                onClick={()=>
                  {}
                   }>
                  删除考试
              </Button>
            </Space>
          ),
        },
      ];
    

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
        console.log(data.users);
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
      const[singleNum,setSingleNum] =useState();
      const [multiNum,setMultiNum] =useState();
      const [tofNum,setTofNum] =useState();
      const [textNum,setTextNum] =useState();

    return (
        <>
         <Button type="primary" onClick={()=>{setIsModalOpen(true)}}>
            <PlusOutlined/>
             新建考试
         </Button>
         <StepsForm
        onFinish={async (values) => {
          let resp = {
            name: values.name,
            description: values.description,
            duration: values.duration,
            students: {list:targetKeys},
            questions:
            {
                single:[],
                multi: [],
                tof: [],
                text:[]
            }
          }
          console.log(resp)
          console.log(singleNum)
          //console.log(values);
          //console.log(targetKeys)
          await waitTime(1000);
          setIsModalOpen(false);
          message.success('提交成功');
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
                onChange={(value)=>{setSingleNum(value)}} />  道
              </Form.Item>

              <Form.Item
                name="multi"
                label="多选题"
              >
                <InputNumber
                defaultValue={0}
                onChange={(value)=>{setMultiNum(value)}} /> 道
              </Form.Item>

              <Form.Item
                name="tof"
                label="判断题"
              >
                <InputNumber
                defaultValue={0}
                onChange={(value)=>{setTofNum(value)}} /> 道
              </Form.Item>

              <Form.Item
                name="text"
                label="问答题"
              >
                <InputNumber
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


        <Table columns={columns} dataSource={quizListData} onChange={onChange} />
        </>
    )}