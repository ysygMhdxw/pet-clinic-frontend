import React, { useState } from "react";
import { Input, Row, Typography } from 'antd';
import propTypes from 'prop-types'
const { TextArea } = Input;
const { Text } = Typography;


export const AnswerText = ( props )=>{

    const [userAns,setUserAns] = useState("无") ;
    const onChange = (e) => {
        setUserAns(e.target.value);
        console.log('Change:', e.target.value);
      };
      
    return(
        <>
        {!props.checkView?
            <TextArea
            showCount
            maxLength={100}
            style={{
            height: 120,
            resize: 'none',
            }}
            onChange={onChange}
            placeholder="请输入答案"
            />
        :
        <>  
            <p/>
            <br />
            <Row>
                <Text
                >你的答案：{userAns} </Text></Row>
                <br />
            <Row>
                <Text 
                type="strong"
                >正确答案：{props.answer} </Text></Row>
            </>
        }
        
        </>
            
        
    )

}
AnswerText.propTypes = {
    answer: propTypes.string,
    checkView: propTypes.bool
}