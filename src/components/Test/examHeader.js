import {Button, Space, Col, Row} from "antd"
import propTypes from 'prop-types'
import { CountDown } from "./countDown"

export const ExamHeader = (props) => {
    return (
        <div>
            <Space
                direction="vertical"
                style={{
                    width: '100%',
                }}>
                <Row align="middle">
                    <Col span={4}>
                        分值：{props.score}
                    </Col>
                    <Col span={4}>
                        第{props.curIndex + 1}题 / 共{props.totalIndex}题
                    </Col>
                    <Col span={4}>
                        <CountDown
                         duration={props.duration}
                         setCurIndex = {props.setCurIndex}
                         totalIndex = {props.totalIndex}/>
                    </Col>
                    <Col span={4} offset={4}>
                        <Button type="link" block
                                onClick={() => {
                                    props.setCheckView(true);
                                    if (props.isCorrect) props.setUserScore(props.userScore + props.score)
                                }}>
                            查看答案
                        </Button></Col>
                    <Col span={4}><Button type="link" block
                                          onClick={() => {
                                              props.setCurIndex(props.curIndex + 1);
                                              props.setCheckView(false);
                                          }}>
                        下一题
                    </Button></Col>

                </Row>

            </Space>
        </div>
    )
}
ExamHeader.propTypes = {
    setCheckView: propTypes.func,
    score: propTypes.number,
    setCurIndex: propTypes.func,
    curIndex: propTypes.number,
    totalIndex: propTypes.number,
    isCorrect: propTypes.bool,
    setUserScore: propTypes.func,
    userScore: propTypes.number,
    duration: propTypes.number,
}