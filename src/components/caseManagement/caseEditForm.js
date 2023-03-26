import {
    EditableProTable,
    ProForm,
    ProFormMoney,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Divider, message, Upload} from 'antd';
import React, {useEffect, useState} from 'react';
import ImgCrop from "antd-img-crop";
import {VideoJS} from "./videoPlayer";
import videojs from "video.js";
import propTypes from "prop-types";
import api from "../../api/api";

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const defaultData = [
    {
        id: 624748504,
        title: '活动名称一',
        decs: '这个活动真好玩',
        state: 'open',
        created_at: '1590486176000',
    },
    {
        id: 624691229,
        title: '活动名称二',
        decs: '这个活动真好玩',
        state: 'closed',
        created_at: '1590481162000',
    },
];


export const CaseEditForm = (props) => {
    const [checkUpData,setCheckUpData]=useState([])
    const [, setCaseData] = useState([])
    const columns = [
        {
            title: '病例检查项目',
            dataIndex: 'checkup_item',
            width: '30%',
        },
        {
            title: '病例检查项目信息',
            dataIndex: 'checkup_text',
            width: '30%',
        },
        {
            title: '病例检查项目图片',
            dataIndex: 'checkup_pic',
            width: '30%',
            renderFormItem: (_, {record}) => {
                console.log('----===>', record);
                return (
                    <ImgCrop
                        rotationSlider>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={symptomFileList}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {symptomFileList.length < 5 && '+ 点击上传'}
                        </Upload>
                    </ImgCrop>
                )
            },
        },
        {
            title: '操作',
            valueType: 'option',
        },
    ];
    const [editableKeys, setEditableRowKeys] = useState(() =>
        defaultData.map((item) => item.id),
    );

    useEffect(() => {
        getCaseData()
    }, [props])

    async function getCaseData() {
        const res = await api.getCaseByCaseId(props.caseId)
        const data = res.data
        setCaseData(data.case)
        console.log(data.case)
        // getCaseCheckUpData()
        return {...data.case,...getCaseCheckUpData()}
    }
    async function getCaseCheckUpData(){
        const res = await api.getCaseCheckUpByCaseId(props.caseId)
        const data = res.data
        setCheckUpData(data.checkups)
        console.log(data.checkups)
        return data.checkups
    }

    //video functions
    const playerRef = React.useRef(null);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: 'http://www.w3schools.com/html/mov_bbb.mp4',
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;
        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });
        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };

    // file functions
    const [symptomFileList, setSymptomFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const onChange = ({fileList: newFileList}) => {
        setSymptomFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <>
            <ProForm
                onFinish={async (values) => {
                    await waitTime(2000);
                    console.log(values);
                    message.success('提交成功');
                }}
                request={async () => {
                    await waitTime(100);
                    return getCaseData()
                }}
            >
                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="case_number"
                        label="病例编号"
                        tooltip="最长为 24 位"
                        disabled
                    />
                    <ProFormText
                        width="md"
                        name="disease_type"
                        label="病种名称"
                        placeholder="请输入病例种类"
                    />
                    <ProFormText
                        width="md"
                        name="pet_name"
                        label="宠物名称"
                        placeholder="请输入宠物名称"
                    />
                    <ProFormText
                        width="md"
                        name="pet_species"
                        label="宠物种类"
                        placeholder="请输入宠物种类"
                    />
                    <ProFormMoney
                        width="md"
                        name="pet_age"
                        fieldProps={{
                            moneySymbol: false,
                            precision: 0
                        }}
                        min={0}
                        max={100}
                        label="宠物年龄"
                        placeholder="请输入宠物年龄"
                        tooltip="仅支持整数数字"
                    />
                    <ProFormText
                        width="md"
                        name="owner_name"
                        label="宠物主人姓名"
                        placeholder="请输入宠物主人姓名"
                    />
                    <ProFormText
                        width="md"
                        name="owner_phone"
                        rules={[{
                            require: true, message: "请输入正确格式的电话号码！",
                            pattern: new RegExp('^(((\\+86)|(\\+86-))|((86)|(86\\-))|((0086)|(0086\\-)))?1[3|5|7|8]\\d{9}$', 'g')
                        }]}
                        label="宠物主人电话"
                        placeholder="请输入宠物主人电话"
                    />
                </ProForm.Group>
                <Divider dashed/>
                <ProForm.Group
                    style={{display: "block"}}
                    label="主要病症"
                >
                    <ProFormTextArea
                        width="xl"
                        name="symptom_text"
                        label="主要病症"
                        placeholder="请输入主要病症信息"
                    />

                    <div style={{width: "600px"}}>
                        <ProForm.Item
                            label="主要病症图片"
                            name="symptom_pic"
                            width="xl"
                        >
                            <ImgCrop
                                rotationSlider>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={symptomFileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {symptomFileList.length < 5 && '+ 点击上传'}
                                </Upload>
                            </ImgCrop>
                        </ProForm.Item>
                    </div>

                    <ProForm.Item
                        label="主要病症视频"
                        width="xl"
                        name="symptom_video"
                    >

                        <div
                            style={{width: "600px"}}
                        >
                            <VideoJS options={videoJsOptions} onReady={handlePlayerReady}/>
                        </div>
                    </ProForm.Item>
                </ProForm.Group>
                <Divider dashed/>
                <ProForm.Group
                    style={{display: "block"}}
                    label="诊断结果"
                >
                    <ProFormTextArea
                        width="xl"
                        name="diagnosis_text"
                        label="诊断结果"
                        placeholder="请输入诊断结果信息"
                    />

                    <div style={{width: "600px"}}>
                        <ProForm.Item
                            label="诊断结果图片"
                            name="diagnosis_pic"
                            width="xl"
                        >
                            <ImgCrop
                                rotationSlider>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={symptomFileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {symptomFileList.length < 5 && '+ 点击上传'}
                                </Upload>
                            </ImgCrop>
                        </ProForm.Item>
                    </div>

                    <ProForm.Item
                        label="诊断结果视频"
                        name="diagnosis_video"
                        width="xl"
                    >
                        <div
                            style={{width: "600px"}}
                        >
                            <VideoJS options={videoJsOptions} onReady={handlePlayerReady}/>
                        </div>
                    </ProForm.Item>
                </ProForm.Group>

                <Divider dashed/>
                <ProForm.Group
                    label="治疗方案"
                >
                    <ProFormTextArea
                        width="xl"
                        name="treatment_text"
                        label="治疗方案"
                        placeholder="请输入治疗方案信息"
                    />

                    <div style={{width: "600px"}}>
                        <ProForm.Item
                            label="治疗方案图片"
                            name="treatment_pic"
                            width="xl"
                        >
                            <ImgCrop
                                rotationSlider>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={symptomFileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {symptomFileList.length < 5 && '+ 点击上传'}
                                </Upload>
                            </ImgCrop>
                        </ProForm.Item>
                    </div>

                    <ProForm.Item
                        label="治疗方案视频"
                        width="xl"
                        name="treatment_video"
                    >
                        <div
                            style={{width: "600px"}}
                        >
                            <VideoJS options={videoJsOptions} onReady={handlePlayerReady}/>
                        </div>
                    </ProForm.Item>
                </ProForm.Group>


                <Divider dashed/>
                <ProForm.Group
                    label="病例检查"
                >
                    <ProForm.Item
                        name="checkup"
                        initialValue={checkUpData}
                        // request={async () => {
                        //     await waitTime(100);
                        //     return getCaseCheckUpData()
                        // }}
                        trigger="onValuesChange"
                    >
                        <EditableProTable
                            rowKey="id"
                            toolBarRender={false}
                            columns={columns}
                            recordCreatorProps={{
                                newRecordType: 'dataSource',
                                position: 'top',
                                record: () => ({
                                    id: Date.now(),
                                    addonBefore: 'ccccccc',
                                    decs: 'testdesc',
                                }),
                            }}
                            editable={{
                                type: 'multiple',
                                editableKeys,
                                onChange: setEditableRowKeys,
                                actionRender: (row, _, dom) => {
                                    return [dom.delete];
                                },
                            }}
                        />
                    </ProForm.Item>
                </ProForm.Group>
            </ProForm>
        </>
    )

};
CaseEditForm.propTypes = {
    caseId: propTypes.string
};