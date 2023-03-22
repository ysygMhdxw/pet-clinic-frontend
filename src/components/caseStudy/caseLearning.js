import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { CaseTable } from './caseTable'
import {CaseCategory} from "./caseCategory";


export const CaseLearning = () => {
    const [caseName, setCaseName] = useState("");
    return (
        <div>
            <Row>
                <Col span={6}>
                    <CaseCategory setCaseName={setCaseName}/>
                </Col>
                <Col span={1}>
                </Col>
                <Col span={15}>
                    {caseName === "" ? <p></p> :
                        <CaseTable caseName={caseName} />}
                </Col>


            </Row>
        </div>
    )

}
