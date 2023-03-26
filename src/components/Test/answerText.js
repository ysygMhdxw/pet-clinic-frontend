import React from "react";
import {Input} from 'antd';

const {TextArea} = Input;


export const AnswerText = () => {
    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };

    return (
        <>
            <TextArea
                showCount
                maxLength={100}
                style={{
                    height: 120,
                    resize: 'none',
                }}
                onChange={onChange}
                placeholder="disable resize"
            />
        </>


    )
}