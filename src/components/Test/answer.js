import React from "react";
import {Button} from "antd";
import propTypes from 'prop-types';

export const Answer = (props) => {

    function answerResult() {
        console.log("answer result")
    }


    return (
        <Button className="ansButton"
                onClick={answerResult}>
            {props.text}
        </Button>
    )
}

Answer.propTypes = {
    text: propTypes.string
}
