import React, {useState, useEffect} from "react"
import propTypes from 'prop-types';
import {Typography, Divider, Row, Button} from 'antd';

const {Title} = Typography;

import {Question} from "./questionCard";

export const Toggle = (props) => {

    // eslint-disable-next-line no-unused-vars
    const [curIndex, setCurIndex] = useState(-1);
    const [curQuestion, setCurQuestion] = useState();
    const [userScore, setUserScore] = useState(0);
    useEffect(() => {
        setCurQuestion(props.questions[curIndex])
    }, [curIndex]);

    function handleClick() {
        console.log(props.questions);
        setCurIndex(0);
        setCurQuestion(props.questions[0]);
    }


    return (
        <>
            {curIndex == -1 && (
                <>
                    <Title level={2}>Welcome to exam!</Title>
                    <Divider/>
                    <br/>
                    <br/>
                    <Row align={'middle'}>
                        <Button
                            type="primary"
                            onClick={() => {
                                handleClick();

                            }}>
                            开始考试
                        </Button>
                    </Row> </>)}
            {curIndex >= 0 && curIndex < props.questions.length && (
                <>
                    <Question
                        questionDetail={curQuestion}
                        setCurIndex={setCurIndex}
                        examView={true}
                        curIndex={curIndex}
                        totalIndex={props.questions.length}
                        setUserScore={setUserScore}
                        userScore={userScore}/>
                </>
            )}
            {curIndex == props.questions.length && (
                <>
                    <Title level={2}>考试已结束！</Title>
                    <Divider/>
                    <br/>
                    <br/>
                    <Title level={4}>您的得分为：{userScore} </Title>
                    <Divider/>
                    <br/>
                    <br/>
                    <Row align={'middle'}>
                        <Button
                            type="primary"
                            onClick={() => {
                                props.setQuizView(false)
                            }}>
                            返回试题列表
                        </Button>
                    </Row>
                </>
            )

            }
        </>
    )
}

Toggle.propTypes = {
    questions: propTypes.array,
    setQuizView: propTypes.func
};