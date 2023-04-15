import { Table, Space, Button } from 'antd';
import React from 'react';
import propTypes from 'prop-types';
import { useEffect , useState } from 'react';
import api from '../../api/api';

export const QuizList = ( props ) => {
    const columns = [
        {
          title: '考试名称',
          dataIndex: 'name',
          width: '20%',
        },
        {
          title: '考试描述',
          dataIndex: 'description',
          width: '60%',
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
          render: (_, record) => (
            <Space size="middle">
              <Button
                type = "link"
                onClick={()=>
                  {props.setQuizView(true);
                   props.setQuestionCatalogue(record.questions);
                   props.setQuizDuration(record.duration);}
                   }>
                  进行考试 
              </Button>
            </Space>
          ),
        },
      ];


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
        <Table columns={columns} dataSource={quizListData} onChange={onChange} />
    )

}

QuizList.propTypes = {
  setQuizView: propTypes.func,
  setQuestionCatalogue: propTypes.func,
  setQuizDuration: propTypes.func,
};