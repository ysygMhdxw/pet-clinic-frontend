import { Button,Space,Col,Row  } from "antd"
import propTypes from 'prop-types'

export const QuestionHeader = ( props ) =>{
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
                    <Col span={4} offset={12} > 
                    <Button type="link" block
                        onClick={()=>{props.setCheckView(true)}}>
                        查看答案
                    </Button></Col>
                    <Col span={4}><Button type="link" block
                        onClick={()=>{props.setCardView(false)}}>
                        返回
                    </Button></Col>
     
             </Row>
               
            </Space>
        </div>
    )
}
QuestionHeader.propTypes = {
    setCardView:propTypes.func,
    setCheckView:propTypes.func,
    score:propTypes.number
}