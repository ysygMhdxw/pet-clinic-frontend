import { Descriptions } from 'antd';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import api from '../api/api';
export const CaseDisplay = (props) => {

    const [caseData, setCaseData] = useState([])

    function getCaseData() {
        api.getCaseByCaseId({ id: props.caseName }).then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    console.log("case");
                    setCaseData(result.case)
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    useEffect(() => {
        getCaseData()
    }, [props]);

    return (
        <div>
            <Descriptions
                title={props.caseName}
                bordered
                column={{
                    xxl: 4,
                    xl: 3,
                    lg: 3,
                    md: 3,
                    sm: 2,
                    xs: 1,
                }}
            >
                <Descriptions.Item label="病例编号">{caseData.case_number}</Descriptions.Item>
                <Descriptions.Item label="病种名称">{caseData.disease_type}</Descriptions.Item>
                <Descriptions.Item label="宠物名称">{caseData.pet_name}</Descriptions.Item>
                <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official">$60.00</Descriptions.Item>
                <Descriptions.Item label="Config Info">
                    Data disk type: MongoDB
                    <br />
                    Database version: 3.4
                    <br />
                    Package: dds.mongo.mid
                    <br />
                    Storage space: 10 GB
                    <br />
                    Replication factor: 3
                    <br />
                    Region: East China 1
                </Descriptions.Item>
            </Descriptions>
        </div>

    )

}

CaseDisplay.propTypes = {
    caseName: propTypes.string
};