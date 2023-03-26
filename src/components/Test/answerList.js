import React from "react";
import {Answer} from "./answer";
import {Space} from "antd";
import propTypes from 'prop-types';

export const AnswerList = (props) => {

    return (
        <div>
            <Space size='middle'>
                {
                    props.answers.map((text, ind) => (
                        <Answer
                            text={text}
                            key={ind}
                        />)
                    )

                }
            </Space>
        </div>

    )
}

AnswerList.propTypes = {
    answers: propTypes.array
}
