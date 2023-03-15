import { Col, Row } from 'antd'
import React, { useState } from 'react'
import CaseCategory from './caseCategory'
import { CaseTable } from './caseTable'


export const CaseLearning = () => {
    const [caseName, setCaseName] = useState("");
    const [, setTableFlg] = useState(false)
    return (
        <div>
            <Row>
                <Col span={6}>
                    <CaseCategory setCaseName={setCaseName} setTableFlg={setTableFlg} />
                </Col>
                <Col span={1}>
                </Col>
                <Col span={12}>
                    {caseName === "" ? <p></p> :
                        <CaseTable caseName={caseName} />}
                </Col>


            </Row>
        </div>
    )

}
