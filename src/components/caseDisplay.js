import { Descriptions, Image } from 'antd';
import propTypes from 'prop-types';
import { useEffect } from 'react';
export const CaseDisplay = (props) => {
    useEffect(() => {

    }, [props]);
    return (
        <div>
            <Descriptions

                bordered
                column={{
                    xxl: 1,

                }}
            >
                <Descriptions.Item label="病例编号">{props.caseInfo.case_number}</Descriptions.Item>
                <Descriptions.Item label="病种名称">{props.caseInfo.disease_type}</Descriptions.Item>
                <Descriptions.Item label="宠物名称">{props.caseInfo.pet_name}</Descriptions.Item>
                <Descriptions.Item label="宠物种类">{props.caseInfo.pet_species}</Descriptions.Item>
                <Descriptions.Item label="宠物年龄">{props.caseInfo.pet_age}</Descriptions.Item>
                <Descriptions.Item label="宠物主人姓名">{props.caseInfo.owner_name}</Descriptions.Item>
                <Descriptions.Item label="宠物主人电话">{props.caseInfo.owner_phone}</Descriptions.Item>
                <Descriptions.Item label="治疗费用">{props.caseInfo.expense}</Descriptions.Item>


                <Descriptions.Item label="主要病症">
                    <div>
                        症状描述：{props.caseInfo.symptom.text}
                        <br />
                        <Image
                            width={200}
                            height={200}
                            src="error"
                            fallback={props.caseInfo.symptom.pic}
                        />
                        <br />
                        视频url：{props.caseInfo.symptom.video}
                        <br />
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="诊断结果">
                    <div>
                        诊断结果：{props.caseInfo.diagnosis_result.text}
                        <br />
                        <Image
                            width={200}
                            height={200}
                            src="error"
                            fallback={props.caseInfo.diagnosis_result.pic}
                        />
                        <br />
                        视频url：{props.caseInfo.diagnosis_result.video}
                        <br />
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="治疗方案">
                    <div>
                        治疗方案：{props.caseInfo.treatment.text}
                        <br />
                        <Image
                            width={200}
                            height={200}
                            src="error"
                            fallback={props.caseInfo.treatment.pic}
                        />
                        <br />
                        视频url：{props.caseInfo.treatment.video}
                        <br />
                    </div>
                </Descriptions.Item>
            </Descriptions>
        </div>

    )

}

CaseDisplay.propTypes = {
    caseInfo: propTypes.object
};