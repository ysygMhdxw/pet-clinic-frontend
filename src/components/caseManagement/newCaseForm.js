import {
    EditableProTable, ModalForm,
    ProForm,
    ProFormMoney, ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Divider, message, Popconfirm, Upload} from 'antd';
import React, {useState} from 'react';
import ImgCrop from "antd-img-crop";
import {VideoJS} from "./videoPlayer";
import videojs from "video.js";
import {PlusOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};


export const CaseNewForm = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const info = (msg) => {
        messageApi.info(msg);
    };
    const showError = (msg) => {
        messageApi.error(msg);
    };

    const [checkUpData, setCheckUpData] = useState([
        {
            "id": null,
            "case_number": null,
            "checkup_item": null,
            "checkup_text": null,
            "checkup_pic1": null,
            "checkup_pic2": null,
            "checkup_pic3": null,
            "checkup_video": null
        }
    ])
    const [caseData, setCaseData] = useState({
        "id": null,
        "case_number": null,
        "disease_type": null,
        "disease_name": null,
        "pet_name": null,
        "pet_species": null,
        "pet_age": null,
        "owner_name": null,
        "owner_phone": null,
        "symptom_text": null,
        "diagnosis_text": null,
        "treatment_text": null,
        "symptom_pic1": null,
        "symptom_pic2": null,
        "symptom_pic3": null,
        "diagnosis_pic1": null,
        "diagnosis_pic2": null,
        "diagnosis_pic3": null,
        "treatment_pic1": null,
        "treatment_pic2": null,
        "treatment_pic3": null,
        "symptom_video": null,
        "diagnosis_video": null,
        "treatment_video": null
    })
    const columns = [
        {
            title: '病例检查项目',
            dataIndex: ['checkup_item'],
            width: '10%',
        },
        {
            title: '病例检查项目信息',
            dataIndex: ['checkup_text'],
            width: '20%',
        },
        {
            title: '病例检查项目图片',
            dataIndex: ['checkup_pic1', 'checkup_pic2', 'checkup_pic3'],
            width: '30%',
            editable: false,
            // eslint-disable-next-line no-unused-vars
            render: (text, record, rowIndex, action) => {
                let recordList = [record.checkup_pic1, record.checkup_pic2, record.checkup_pic3]
                let fileList = []
                recordList.map((picUrl, index) => {
                        if (picUrl !== "" || picUrl !== null) {
                            fileList.push({
                                uid: `pic-${index}`,
                                name: `image${index}.png`,
                                status: 'done',
                                url: picUrl,
                            })
                        }
                    }
                );
                return (
                    <div>
                        <ImgCrop
                            rotationSlider>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={onPreview}
                                onRemove={(file) => {
                                    if (file && file.uid) {
                                        // 在这里执行删除文件的操作
                                        console.log('删除文件', file);
                                    } else {
                                        console.error('无效的文件对象', file);
                                    }
                                    const newData = [...checkUpData];
                                    const target = newData[rowIndex];
                                    let targetList = [target.checkup_pic1, target.checkup_pic2, target.checkup_pic3]
                                    if (targetList) {
                                        targetList = targetList.filter(
                                            (url) => url !== file.url
                                        );
                                        targetList[0] ? newData[rowIndex].checkup_pic1 = targetList[0] : newData[rowIndex].checkup_pic1 = "";
                                        targetList[1] ? newData[rowIndex].checkup_pic2 = targetList[1] : newData[rowIndex].checkup_pic2 = "";
                                        targetList[2] ? newData[rowIndex].checkup_pic3 = targetList[2] : newData[rowIndex].checkup_pic3 = "";
                                        setCheckUpData(newData)
                                    }
                                }}
                            >

                                {fileList.length < 3 && '+ 点击上传'}
                            </Upload>
                        </ImgCrop>
                    </div>
                )
            }

        },
        {
            title: '病例检查项目视频',
            dataIndex: ['checkup_video'],
            width: '30%',
            editable: false,
            // eslint-disable-next-line no-unused-vars
            render: (text, record, rowIndex) => {
                let recordList = [record.checkup_video]
                let fileList = []
                recordList.map((picUrl, index) => {
                        if (picUrl !== "" || picUrl !== null) {
                            fileList.push({
                                uid: `pic-${index}`,
                                name: `image${index}.png`,
                                status: 'done',
                                url: picUrl,
                            })
                        }
                    }
                );
                // const checkupOptions = {
                //     autoplay: false,
                //     controls: true,
                //     responsive: true,
                //     fluid: true,
                //     sources: [{
                //         src: 'http://www.w3schools.com/html/mov_bbb.mp4',
                //         type: 'video/mp4'
                //     }]
                // };
                return (
                    <div>
                        <div
                            style={{width: "100%"}}
                        >
                            {/*<VideoJS*/}
                            {/*    options={checkupOptions}*/}
                            {/*    onReady={handlePlayerReady}/>*/}
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={onPreview}
                                onRemove={(file) => {
                                    if (file && file.uid) {
                                        // 在这里执行删除文件的操作
                                        console.log('删除文件', file);
                                    } else {
                                        console.error('无效的文件对象', file);
                                    }
                                    const newData = [...checkUpData];
                                    const target = newData[rowIndex];
                                    let targetList = [target.checkup_video]
                                    if (targetList) {
                                        targetList = targetList.filter(
                                            (url) => url !== file.url
                                        );
                                        targetList[0] ? newData[rowIndex].checkup_video = targetList[0] : newData[rowIndex].checkup_video = "";
                                        setCheckUpData(newData)
                                    }
                                }}
                            >

                                {fileList.length < 1 && '+ 点击上传'}
                            </Upload>
                        </div>
                    </div>
                )
            }

        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}
                >
                    修改
                </a>,
                <Popconfirm
                    key="delete"
                    placement="top"
                    title={"删除数据"}
                    description={"确认删除此条数据？删除后将无法恢复。"}
                    onConfirm={async () => {
                        setCheckUpData(checkUpData.filter((item) => item.id !== record.id));
                        // deleteDepartmentById(record.id);
                        info("删除成功！");
                        await waitTime(500);
                    }
                    }
                    okText="Yes"
                    cancelText="No"
                >
                    <a>
                        删除
                    </a>
                </Popconfirm>
                ,
            ],
        },
    ];
    const [editableKeys, setEditableRowKeys] = useState(() =>
        checkUpData.map((item) => item.id),
    );
    const [tableLittleType, setTableLittleType] = useState([]);
    const [tableLittleTypeValue,setTableLittleTypeValue] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [tableBigTypeValue,setTableBigTypeValue] = useState([]);

    function getTableLittleTypesData(value) {
        if(value===undefined) {
            setTableLittleTypeValue([])
            return
        }
        try {
            let caseCategories = props.tableCategory
            let caseTypeDatas = []
            caseCategories.map((caseCategory) => {
                if (caseCategory.title === value) {
                    const transformedData = caseCategory.children.map(item => ({
                        value: item.title,
                        label: item.title
                    }));
                    caseTypeDatas.push(...transformedData)
                }
            })
            console.log("caseTypeDatas: ", caseTypeDatas)
            setTableLittleType(caseTypeDatas)
        } catch (error) {
            console.error(error);
            showError("不存在病种分类！");
        }
    }

    const handleBigTypeChange = (value) => {
        setTableBigTypeValue(value);
        setTableLittleTypeValue([]); // 清空后一个组件的选项
        getTableLittleTypesData(value)
        // 获取后端数据并更新前一个组件的选项
        // ...
    };

    const handleLittleTypeChange = (value) => {
        setTableLittleTypeValue(value); // 清空后一个组件的选项
    };

    function getTableBigTypesData() {
        let caseCategories = props.tableCategory
        let caseTypeDatas = []
        caseCategories.map((caseCategory) => {
            caseTypeDatas.push({
                value: caseCategory.title,
                label: caseCategory.title
            })
        })
        console.log("Big caseTypeDatas: ", caseTypeDatas)
        return caseTypeDatas
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
    const [symptomFileList, setSymptomFileList] = useState([]);
    const [diagnosisFileList, setDiagnosisFileList] = useState([]);
    const [treatmentFileList, setTreatmentFileList] = useState([]);
    const [newCheckUpPicList, setNewCheckUpPicList] = useState([]);
    const [newCheckUpVideoList, setNewCheckUpVideoList] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const newFileList = (record) => {
        let newFile = []
        record.map((picUrl, index) => {
            if (picUrl !== "") {
                newFile.push(
                    {
                        uid: `pic-${index}`,
                        name: `image${index}.png`,
                        status: 'done',
                        url: picUrl,
                    }
                )
            }
        });
        return newFile
    }

    // getTableBigTypesData();
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
    const handleSymptomChange = ({fileList: newFileList}) => setSymptomFileList(newFileList);
    const handleDiagnosisChange = ({fileList: newFileList}) => setDiagnosisFileList(newFileList);
    const handleTreatmentChange = ({fileList: newFileList}) => setTreatmentFileList(newFileList);
    const handleNewCheckUpPicChange = ({fileList: newFileList}) => setNewCheckUpPicList(newFileList);
    const handleNewCheckUpVideoChange = ({fileList: newFileList}) => setNewCheckUpVideoList(newFileList);


    // const onVideoPreview = async (file) => {
    //     if (file && file.url) {
    //         const videoUrl = file.url;
    //         const player = videojs('previewVideo', {
    //             controls: true,
    //             sources: [
    //                 {
    //                     src: videoUrl,
    //                     type: 'video/mp4',
    //                 },
    //                 {
    //                     src: videoUrl,
    //                     type: 'video/webm',
    //                 },
    //                 {
    //                     src: videoUrl,
    //                     type: 'video/ogg',
    //                 },
    //             ],
    //         });
    //         player.play();
    //         setPreviewVisible(true);
    //         setPreviewVideoUrl(videoUrl);
    //     }
    // };

    // const [previewVisible, setPreviewVisible] = useState(false);
    // const [previewVideoUrl, setPreviewVideoUrl] = useState('');

    // eslint-disable-next-line no-unused-vars
    // const handlePreview = (file) => {
    //     setPreviewVideoUrl(file.url || file.thumbUrl);
    //     setPreviewVisible(true);
    // };

    // const handleCancel = () => setPreviewVisible(false);


    return (
        <>
            {contextHolder}
            <ProForm
                onFinish={async (values) => {
                    await waitTime(2000);
                    console.log(values);
                    setCaseData(values)
                    message.success('提交成功');
                }}
                initialValues={caseData}
            >
                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="case_number"
                        label="病例标识"
                        tooltip="最长为 24 位"
                    />
                    <ProFormSelect
                        width="md"
                        name="disease_type"
                        label="病例种类"
                        placeholder="请选择病例种类"
                        fieldProps={{
                            value: tableBigTypeValue,
                        }}
                        onChange={handleBigTypeChange}
                        options={getTableBigTypesData()}
                    />
                    <ProFormSelect
                        width="md"
                        name="disease_name"
                        label="病种名称"
                        fieldProps={{
                            value: tableLittleTypeValue,
                        }}
                        onChange={handleLittleTypeChange}
                        placeholder="请选择病种名称"
                        options={tableLittleType}
                        disabled={!tableBigTypeValue} // 禁用后一个组件，直到前一个组件有选中值
                        // onChange={getTableBigTypesData}
                        tooltip={"请先选择病例种类！"}
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
                            tooltip={"照片不能超过三张！"}
                        >
                            <ImgCrop
                                rotationSlider>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={symptomFileList}
                                    onChange={handleSymptomChange}
                                    onPreview={onPreview}
                                >
                                    {symptomFileList.length < 3 && '+ 点击上传'}
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
                            tooltip={"照片不能超过三张！"}
                        >
                            <ImgCrop
                                rotationSlider>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={diagnosisFileList}
                                    onChange={handleDiagnosisChange}
                                    // onRemove={handleDiagnosisChange}
                                    onPreview={onPreview}
                                >
                                    {diagnosisFileList.length < 3 && '+ 点击上传'}
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
                            tooltip={"照片不能超过三张！"}
                        >
                            <ImgCrop
                                rotationSlider>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={treatmentFileList}
                                    onChange={handleTreatmentChange}
                                    onPreview={onPreview}
                                >
                                    {treatmentFileList.length < 3 && '+ 点击上传'}
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
                            {/*<VideoJS options={videoJsOptions} onReady={handlePlayerReady}/>*/}
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={treatmentFileList}
                                onChange={handleTreatmentChange}
                                onPreview={onPreview}
                            >
                                {treatmentFileList.length < 1 && '+ 点击上传'}
                            </Upload>
                        </div>
                    </ProForm.Item>
                </ProForm.Group>
                <Divider dashed/>
                <ProForm.Group
                    label="病例检查"
                >
                    <div style={{display: "flex", margin: "10px"}}>
                        <div style={{marginLeft: "auto"}}>
                            <ModalForm
                                labelWidth="auto"
                                trigger={
                                    <Button type="primary">
                                        <PlusOutlined/>
                                        新建检查信息
                                    </Button>
                                }
                                onFinish={async (values) => {
                                    await waitTime(1000);
                                    console.log(values);
                                    message.success('新建成功');
                                    return true;
                                }}
                            >
                                <ProForm.Group>
                                    <ProFormText
                                        width="md"
                                        name="checkup_item"
                                        label="病例检查项目"
                                        tooltip="最长为 24 位"
                                        placeholder="请输入病例检查项目"
                                    />
                                    {/*<ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称"/>*/}
                                </ProForm.Group>
                                <ProForm.Group>
                                    <ProFormText
                                        name='checkup_text'
                                        width="md"
                                        label="病例检查项目信息"
                                        placeholder="请输入病例检查项目信息"
                                    />
                                </ProForm.Group>
                                <ProForm.Group>
                                    <ProForm.Item
                                        label="病例检查项目图片"
                                        name="checkup_pic"
                                        width="xl"
                                        tooltip={"照片不能超过三张！"}
                                    >
                                        <ImgCrop
                                            rotationSlider>
                                            <Upload
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                listType="picture-card"
                                                fileList={newCheckUpPicList}
                                                onChange={handleNewCheckUpPicChange}
                                                onPreview={onPreview}
                                            >
                                                {newCheckUpPicList.length < 3 && '+ 点击上传'}
                                            </Upload>
                                        </ImgCrop>
                                    </ProForm.Item>
                                </ProForm.Group>
                                <ProForm.Group>
                                    <ProForm.Item
                                        label="病例检查项目视频"
                                        name="checkup_video"
                                        width="xl"
                                    >
                                        <Upload
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            listType="picture-card"
                                            accept="video/*"
                                            fileList={newCheckUpVideoList}
                                            onChange={handleNewCheckUpVideoChange}
                                            // onPreview={onVideoPreview}
                                        >
                                            {newCheckUpVideoList.length < 1 && '+ 点击上传'}
                                        </Upload>
                                        {/*<Modal open={previewVisible} onCancel={handleCancel} footer={null}>*/}
                                        {/*    <video style={{width: '100%'}} src={previewVideoUrl} controls/>*/}
                                        {/*</Modal>*/}
                                    </ProForm.Item>
                                </ProForm.Group>
                            </ModalForm>
                        </div>
                    </div>
                    <ProForm.Item
                        name="checkup"
                        trigger="onValuesChange"
                    >
                        <EditableProTable
                            rowKey="id"
                            headerTitle="病例检查基本信息"
                            toolBarRender={false}
                            columns={columns}
                            dataSource={checkUpData}
                            value={checkUpData}
                            recordCreatorProps={false}
                            onChange={setCheckUpData}
                            editable={{
                                type: 'multiple',
                                editableKeys,
                                onChange: setEditableRowKeys,
                                // eslint-disable-next-line no-unused-vars
                                onSave: async (rowKey, data, _row) => {
                                    info("修改成功！")
                                    await waitTime(500);
                                },
                                // eslint-disable-next-line no-unused-vars
                                onDelete: async (rowKey, data, _row) => {
                                    info("删除成功！")
                                    await waitTime(500);
                                },
                            }}
                        />
                    </ProForm.Item>
                </ProForm.Group>
            </ProForm>
        </>
    )

};
CaseNewForm.propTypes = {
    tableCategory: PropTypes.array
}