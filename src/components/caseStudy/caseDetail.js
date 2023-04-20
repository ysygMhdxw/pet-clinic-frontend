import {Button, Descriptions} from 'antd';
import propTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {VideoModal} from "./videoModal";
import {ImageCarousel} from "./imageCarousel";
import {CaseCheckUpTable} from "./caseCheckUpTable";


export const CaseDetail = (props) => {
    const [caseInfo, setCaseInfo] = useState({});
    useEffect(() => {
        setCaseInfo(props.caseInfo);
    }, [props.caseInfo]);

    return (
        <div style={{marginTop: "2%"}}>
            <div style={{marginBottom: "3%"}}>
                <Button type={"primary"} onClick={() => {
                    props.setDisplayFlg(false)
                }}>返回</Button>
            </div>
            <Descriptions
                title={"病例详情信息"}
                bordered
                layout="horizontal"
                column={1}
            >
                <Descriptions.Item label="病例编号">{caseInfo.id}</Descriptions.Item>
                <Descriptions.Item label="病例标识">{caseInfo.case_number}</Descriptions.Item>
                <Descriptions.Item label="病例种类">{caseInfo.disease_type}</Descriptions.Item>
                <Descriptions.Item label="病种名称">{caseInfo.disease_name}</Descriptions.Item>
                <Descriptions.Item label="宠物名称">{caseInfo.pet_name}</Descriptions.Item>
                <Descriptions.Item label="宠物种类">{caseInfo.pet_species}</Descriptions.Item>
                <Descriptions.Item label="宠物年龄">{caseInfo.pet_age}</Descriptions.Item>
                <Descriptions.Item label="宠物主人姓名">{caseInfo.owner_name}</Descriptions.Item>
                <Descriptions.Item label="宠物主人电话">{caseInfo.owner_phone}</Descriptions.Item>
                {/* <Descriptions.Item label="治疗费用">{caseInfo.expense}</Descriptions.Item> */}
            </Descriptions>
            <div style={{marginTop: "3%"}}>
                <Descriptions
                    title={"主要病症"}
                    bordered
                    layout="horizontal"
                    column={1}
                >
                    <Descriptions.Item label="主要病症">
                        {caseInfo.symptom_text}
                    </Descriptions.Item>
                    <Descriptions.Item label="主要病症图片">
                        <ImageCarousel pic1={caseInfo.symptom_pic1} pic2={caseInfo.symptom_pic2}
                                       pic3={caseInfo.symptom_pic3}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="主要病症视频">
                        <div>
                            <VideoModal videoUrl={caseInfo.symptom_video}/>
                        </div>
                    </Descriptions.Item>
                </Descriptions>
            </div>

            <div style={{marginTop: "3%"}}>
                <Descriptions
                    title={"诊断结果"}
                    bordered
                    layout="horizontal"
                    column={1}
                >
                    <Descriptions.Item label="诊断结果">
                        {caseInfo.diagnosis_text}
                    </Descriptions.Item>
                    <Descriptions.Item label="诊断结果图片">
                        <ImageCarousel pic1={caseInfo.diagnosis_pic1} pic2={caseInfo.diagnosis_pic2}
                                       pic3={caseInfo.diagnosis_pic3}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="诊断结果视频">
                        <div>
                            <VideoModal videoUrl={caseInfo.diagnosis_video}/>
                        </div>
                    </Descriptions.Item>
                </Descriptions>
            </div>

            <div style={{marginTop: "3%"}}>
                <Descriptions
                    title={"治疗方案"}
                    bordered
                    layout="horizontal"
                    column={1}
                >
                    <Descriptions.Item label="治疗方案信息">
                        {caseInfo.treatment_text}
                    </Descriptions.Item>
                    <Descriptions.Item label="治疗方案图片">
                        <ImageCarousel pic1={caseInfo.treatment_pic1} pic2={caseInfo.treatment_pic2}
                                       pic3={caseInfo.treatment_pic3}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="治疗方案视频">
                        <div>
                            <VideoModal videoUrl={caseInfo.treatment_video}/>
                        </div>
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <CaseCheckUpTable caseNumber={props.caseInfo.case_number}/>

        </div>

    )

}

CaseDetail.propTypes = {
    caseInfo: propTypes.object,
    setDisplayFlg:propTypes.bool,
};