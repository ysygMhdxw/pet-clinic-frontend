import React from "react";
//import he from "he";
import { Typography, Space } from 'antd';
import propTypes from 'prop-types'

const { Title } = Typography;


export const QuestionText = (props) =>{
  // he is a oddly named library that decodes html into string values
    return(     
        <div>
         <Space
          direction="vertical"
          size="small"
          style={{
            display: 'flex',
          }}
          >    
          <Title level={3}>{props.title}</Title>
          <Title level={5}>
            {props.description}
          </Title>
        </Space>
        </div>
    )

}
QuestionText.propTypes = {
  title: propTypes.string,
  description: propTypes.string
  
}