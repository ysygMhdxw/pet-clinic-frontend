import React, { useState } from "react";
import { Answer } from "./answer";
import { Space, Radio, Typography, Row} from "antd";

import propTypes from 'prop-types';
const { Text } = Typography;
export const AnswerList = ( props ) => {

    const onChange = (e) => {
        setUserAns([props.answers[e.target.value]]);
        console.log(`radio checked:${e.target.value}`);
        props.setIsCorrect(userAns==correct_ans);
      };
    
    const correct_ans = props.answers[props.correct_ind];
    const [userAns,setUserAns] = useState("无") ;
   
    return (
        <div>
             <Radio.Group onChange={onChange}  disabled={props.checkView?true:false}>
                <Space size={"middle"}>
                {
                props.answers.map( (text,ind) => (
                    <Answer
                        text = {text}
                        key = {ind}
                        ind = {ind}
                    /> ) 
                )
                
                }
                </Space>
            </Radio.Group>

            {props.checkView?
            
            <>  
            <p/>
            <br />
            <Row>
                <Text type={userAns==correct_ans?"success":"danger"}
                >你的答案：{userAns} </Text></Row>
                <br />
            <Row>
                <Text 
                type="strong"
                >正确答案：{correct_ans} </Text></Row>
            </>
            
            :
            <></>
            }          
        </div>
        
    )
}

AnswerList.propTypes = {
    answers: propTypes.array,
    checkView: propTypes.bool,
    correct_ind: propTypes.number,
    setIsCorrect: propTypes.func,
}
