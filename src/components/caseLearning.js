import { Col, Row } from 'antd'
import React from 'react'
import CaseCategory from './caseCategory'
import { CaseDisplay } from './caseDisplay'

export const CaseLearning = () => {

    return (
        <div>
            <Row>
                <Col span={6}>
                    <CaseCategory />
                </Col>
                <Col span={1}>
                </Col>
                <Col >
                    <CaseDisplay />
                </Col>
            </Row>
        </div>
    )

}
