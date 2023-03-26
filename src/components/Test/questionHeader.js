import {Button, Space} from "antd"
import propTypes from 'prop-types'

export const QuestionHeader = (props) => {
    return (
        <div>
            <Space
                direction="vertical"
                style={{
                    width: '100%',
                }}>
                <Button type="link" block
                        onClick={() => {
                            props.setCardView(false)
                        }}>
                    返回
                </Button>
            </Space>
        </div>
    )
}
QuestionHeader.propTypes = {
    setCardView: propTypes.func,
}