import React from "react";
import { Radio} from "antd";
import propTypes from 'prop-types';

export const Answer = ( props ) =>{



    return (
        <Radio.Button 
            className="ansButton"
            value={props.ind}>
                {props.text}
        </Radio.Button>
    )
}

Answer.propTypes = {
    text: propTypes.string,
    ind:propTypes.number
  }
