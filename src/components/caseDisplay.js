import { Descriptions, Image } from 'antd';
import propTypes from 'prop-types';
import { useEffect } from 'react';
export const CaseDisplay = (props) => {
    const caseInfo = props.caseInfo
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
                <Descriptions.Item label="病例编号">{caseInfo.case_number}</Descriptions.Item>
                <Descriptions.Item label="病种名称">{caseInfo.disease_type}</Descriptions.Item>
                <Descriptions.Item label="宠物名称">{caseInfo.pet_name}</Descriptions.Item>
                <Descriptions.Item label="宠物种类">{caseInfo.pet_species}</Descriptions.Item>
                <Descriptions.Item label="宠物年龄">{caseInfo.pet_age}</Descriptions.Item>
                <Descriptions.Item label="宠物主人姓名">{caseInfo.owner_name}</Descriptions.Item>
                <Descriptions.Item label="宠物主人电话">{caseInfo.owner_phone}</Descriptions.Item>
                <Descriptions.Item label="治疗费用">{caseInfo.expense}</Descriptions.Item>


                <Descriptions.Item label="主要病症">
                    <div>
                        症状描述：{caseInfo.symptom.text}
                        <br />
                        <Image
                            width={200}
                            height={200}
                            src="error"
                            fallback={caseInfo.symptom.pic}
                        />
                        <br />
                        视频url：{caseInfo.symptom.video}
                        <br />
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="诊断结果">
                    <div>
                        诊断结果：{caseInfo.diagnosis_result.text}
                        <br />
                        <Image
                            width={200}
                            height={200}
                            src="error"
                            fallback={caseInfo.diagnosis_result.pic}
                        />
                        <br />
                        视频url：{caseInfo.diagnosis_result.video}
                        <br />
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="治疗方案">
                    <div>
                        治疗方案：{caseInfo.treatment.text}
                        <br />
                        <Image
                            width={200}
                            height={200}
                            src="error"
                            fallback={caseInfo.treatment.pic}
                        />
                        <br />
                        视频url：{caseInfo.treatment.video}
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