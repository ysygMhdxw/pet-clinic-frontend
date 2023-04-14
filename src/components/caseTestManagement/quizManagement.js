import { ModalForm } from '@ant-design/pro-components';
import { Table, Space, Button, message, Form, Input, InputNumber } from 'antd';
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

      const onChange = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
      };
    return (
        <>
         <ModalForm
            labelWidth="auto"
            trigger={
                <Button type="primary">
                 <PlusOutlined/>
                  新建考试
                </Button>}
            //form={form}
            onFinish={async (values) => {
                            await waitTime(1000);
                            console.log(values);
                            //addQuestion(values);
                            //getQuestionData();
                            message.success('新建成功');
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

         </ModalForm>


        <Table columns={columns} dataSource={quizListData} onChange={onChange} />
        </>
    )}