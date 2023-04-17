import React from 'react';
import Modal from 'antd/es/modal/Modal';
import propTypes from 'prop-types'
import {  Table,  Transfer } from 'antd';
import difference from 'lodash/difference';
import { useState } from 'react';
import api from '../../api/api';

export const QuestionTransfer= ( props ) => {

    //console.log(props.targetQuestionKeys)
    //console.log(props.allQuestions)
    //const mockData = props.questionsData.map((item) => ({key:item.question_type + item.id.toString(), description:item.description.substring(0,10)+'...',
       //                                                     question_type:item.question_type}) )
    const [confirmLoading, setConfirmLoading] = useState(false);
    const mockData = props.allQuestions
    const [targetKeys, setTargetKeys] = useState(props.targetQuestionKeys)
    const [newQuestions, setNewQuestions] = useState([])
    const onChange = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
        console.log(nextTargetKeys)
        const questions = props.allQuestions.filter( item => nextTargetKeys.includes(item.key)) 
        setNewQuestions(questions)
      };

    //Modal 提交时的处理逻辑，应该加上put方法修改quiz
    const handleOk = async  () => {
        console.log(newQuestions)
        setConfirmLoading(true);
       let resp ={
        id: props.editQuizId,
        questions:{
          single:[],
          multi:[],
          tof:[],
          text:[]
        }
       }
       for(let item of newQuestions){
        resp.questions[item.type].push(item.id)
       }
       //console.log(resp)
       const res = await api.editQuiz(resp)
        const data = res.data
        console.log(data)
        setTimeout(() => {
            props.setIsQuestionVisible(false)
            setConfirmLoading(false);
            props.info("修改成功")
            props.getQuizListData()
            
          }, 1000);
    };
      const rightTableColumns =  [
        { dataIndex:'question_type',
          title: '题目类型'
        },
        {
            dataIndex:'description',
            title: '题目内容'
        },
        
      ]

      const leftTableColumns =  [
        { dataIndex:'question_type',
          title: '题目类型'
        },
        {
            dataIndex:'description',
            title: '题目内容'
        },
        {
            dataIndex:'disease_type',
            title: '病种'
        }
      ]
    
    return (
        <div>
            <Modal
             open={props.isQuestionVisible}
             width={1500}
             onCancel={() => props.setIsQuestionVisible(false)}
             onOk={handleOk}
             confirmLoading={confirmLoading}
             destroyOnClose>
            <TableTransfer
        dataSource={mockData}
        targetKeys={targetKeys}
        showSearch
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.description.indexOf(inputValue) !== -1 || item.question_type.indexOf(inputValue) !== -1 || item.disease_type.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
            </Modal>
        </div>
    )
}





// Customize Table Transfer
// eslint-disable-next-line react/prop-types
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      
      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{
            pointerEvents: listDisabled ? 'none' : undefined,
          }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);




QuestionTransfer.propTypes = {
    isQuestionVisible: propTypes.bool,
    setIsQuestionVisible: propTypes.func,
    targetQuestionKeys: propTypes.array,
    getQuizListData: propTypes.func,
    allQuestions: propTypes.array,
    info: propTypes.func,
    editQuizId : propTypes.number,
}