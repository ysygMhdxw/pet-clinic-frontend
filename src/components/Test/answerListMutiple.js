import React, {useEffect, useState} from "react";
import {Checkbox, Typography, Row} from "antd";
import propTypes from 'prop-types';

const {Text} = Typography;
export const AnswerListMutiple = (props) => {

    const [userAns, setUserAns] = useState([]);
    useEffect(()=>{ props.setIsCorrect(JSON.stringify(userAns) == JSON.stringify(correct_ans))},[userAns])
    //console.log(props.multipleAns);
    const onChange = (checkedValues) => {
        //console.log('checked = ', checkedValues);
        setUserAns(checkedValues);
        props.setSelectedOption(checkedValues);
       
    };
    const correct_ans = [];
    for (let i = 0; i < 4; i++) {
        if (props.multipleAns[i])
            correct_ans.push(props.answers[i])
    }
    //const [userAns,setUserAns] = useState("无") ;

    return (
        <div>
            <>
                <Checkbox.Group options={props.answers} onChange={onChange} disabled={props.checkView ? true : false} value={props.selectedOption}/>
                <br/>
                <br/>
            </>
            {props.checkView ?

                <>
                    <p/>
                    <br/>
                    <Row>
                        <Text type={JSON.stringify(userAns) == JSON.stringify(correct_ans) ? "success" : "danger"}>
                            你的答案：</Text>{userAns.join('   ,')}</Row>
                    <br/>
                    <Row>
                        <Text
                            type="strong"
                        >正确答案： </Text>{correct_ans.join('   ,')}</Row>
                </>

                :
                <></>
            }
        </div>

    )
}

AnswerListMutiple.propTypes = {
    answers: propTypes.array,
    checkView: propTypes.bool,
    multipleAns: propTypes.array,
    setIsCorrect: propTypes.func,
    selectedOption: propTypes.array,
    setSelectedOption: propTypes.func
}
