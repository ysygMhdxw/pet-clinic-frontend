import {Col, Row} from 'antd'
import React, {useEffect, useState} from 'react'
import {CaseRight} from './caseRight'
import {CaseCategory} from "./caseCategory";


export const CaseLearning = () => {
    const [caseName, setCaseName] = useState("");
    useEffect(() => {

    }, [caseName])
    return (
        <div>
            <Row>
                <Col span={6}>
                    <CaseCategory setCaseName={setCaseName}/>
                </Col>
                <Col span={1}>
                </Col>
                <Col span={15}>
                    <CaseRight caseName={caseName}/>
                </Col>
            </Row>
        </div>
    )

}
