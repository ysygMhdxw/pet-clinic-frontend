import {
    ModalForm,
    ProForm,
    ProFormMoney, ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import {Button, Divider, message, Upload} from 'antd';
import React, {useEffect, useState} from 'react';
import ImgCrop from "antd-img-crop";
import PropTypes from "prop-types";
import api from "../../api/api";
import {PlusOutlined} from "@ant-design/icons";

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};


export const CaseNewForm = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = (msg) => {
        messageApi.success(msg);
    };
    const showError = (msg) => {
        messageApi.error(msg);
    };

    const [symptomVideo, setSymptomVideo] = useState([]);
    const [diagnosisVideo, setDiagnosisVideo] = useState([]);
    const [treatmentVideo, setTreatmentVideo] = useState([]);
    const [symptomPicList, setSymptomPicList] = useState([]);
    const [diagnosisPicList, setDiagnosisPicList] = useState([]);
    const [treatmentPicList, setTreatmentPicList] = useState([]);


    const handlePicturePreview = async (file) => {
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
    const handleVideoPreview = async (file) => {
        let src = file.url;
        console.log("fileurl", src)
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const video = document.createElement('video');
        video.controls = true;
        video.src = src;
        const videoWindow = window.open('', '_blank');
        videoWindow?.document.write(video.outerHTML);
    };


    const handleSymptomVideoRemove = (file) => {
        // 发送请求删除文件
        // 更新文件列表状态
        const newFileList = symptomVideo.filter((item) => item.uid !== file.uid);
        setSymptomVideo(newFileList);
    };
    const handleSymptomPicRemove = (file) => {
        const newFileList = symptomPicList.filter((item) => item.uid !== file.uid);
        setSymptomPicList(newFileList);
    };
    const handleDiagnosisVideoRemove = (file) => {
        const newFileList = diagnosisVideo.filter((item) => item.uid !== file.uid);
        setDiagnosisVideo(newFileList);
    };
    const handleDiagnosisPicRemove = (file) => {
        const newFileList = diagnosisPicList.filter((item) => item.uid !== file.uid);
        setDiagnosisPicList(newFileList);
    };
    const handleTreatmentVideoRemove = (file) => {
        const newFileList = treatmentVideo.filter((item) => item.uid !== file.uid);
        setTreatmentVideo(newFileList);
    };
    const handleTreatmentPicRemove = (file) => {
        const newFileList = treatmentPicList.filter((item) => item.uid !== file.uid);
        setTreatmentPicList(newFileList);
    };


    const symptomPicUploadProps = {
        // action: 'http://127.0.0.1:8000/case/upload/picture/',
        listType: 'picture-card',
        fileList: symptomPicList,
        onRemove: handleSymptomPicRemove,
        onPreview: handlePicturePreview,
        customRequest: ({onSuccess, onError, file}) => {
            const formData = new FormData();
            formData.append('pic', file);
            fetch('http://127.0.0.1:8000/case/upload/picture/', {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    const newFile = {
                        uid: file.uid,
                        name: data.name,
                        status: data.success ? 'done' : 'error',
                        url: data.url,
                        thumbUrl: data.thumbUrl,
                    };

                    const newFileList = [...symptomPicList];
                    const targetIndex = newFileList.findIndex(
                        (item) => item.uid === file.uid
                    );
                    if (targetIndex !== -1) {
                        newFileList.splice(targetIndex, 1, newFile);
                    } else {
                        newFileList.push(newFile);
                    }
                    setSymptomPicList(newFileList);
                    console.log("newfile", newFileList);
                    onSuccess(data, newFile);
                })
                .catch((error) => {
                    onError(error);
                });
        },
        getData: (file) => {
            return {
                name: file.name,
            };
        },
        showUploadList: {
            showPreviewIcon: true,
            showDownloadIcon: true,
            showRemoveIcon: true,
        },
        maxCount: 3,
        accept: 'image/*',
    };
    const diagnosisPicUploadProps = {
        // action: 'http://127.0.0.1:8000/case/upload/picture/',
        listType: 'picture-card',
        fileList: diagnosisPicList,
        onRemove: handleDiagnosisPicRemove,
        onPreview: handlePicturePreview,
        customRequest: ({onSuccess, onError, file}) => {
            const formData = new FormData();
            formData.append('pic', file);
            fetch('http://127.0.0.1:8000/case/upload/picture/', {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    const newFile = {
                        uid: file.uid,
                        name: data.name,
                        status: data.success ? 'done' : 'error',
                        url: data.url,
                        thumbUrl: data.thumbUrl,
                    };

                    const newFileList = [...diagnosisPicList];
                    const targetIndex = newFileList.findIndex(
                        (item) => item.uid === file.uid
                    );
                    if (targetIndex !== -1) {
                        newFileList.splice(targetIndex, 1, newFile);
                    } else {
                        newFileList.push(newFile);
                    }
                    setDiagnosisPicList(newFileList);
                    console.log("newfile", newFileList);
                    onSuccess(data, newFile);
                })
                .catch((error) => {
                    onError(error);
                });
        },
        getData: (file) => {
            return {
                name: file.name,
            };
        },
        showUploadList: {
            showPreviewIcon: true,
            showDownloadIcon: true,
            showRemoveIcon: true,
        },
        maxCount: 3,
        accept: 'image/*',
    };
    const treatmentPicUploadProps = {
        // action: 'http://127.0.0.1:8000/case/upload/picture/',
        listType: 'picture-card',
        fileList: treatmentPicList,
        onRemove: handleTreatmentPicRemove,
        onPreview: handlePicturePreview,
        customRequest: ({onSuccess, onError, file}) => {
            const formData = new FormData();
            formData.append('pic', file);
            fetch('http://127.0.0.1:8000/case/upload/picture/', {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    const newFile = {
                        uid: file.uid,
                        name: data.name,
                        status: data.success ? 'done' : 'error',
                        url: data.url,
                        thumbUrl: data.thumbUrl,
                    };

                    const newFileList = [...treatmentPicList];
                    const targetIndex = newFileList.findIndex(
                        (item) => item.uid === file.uid
                    );
                    if (targetIndex !== -1) {
                        newFileList.splice(targetIndex, 1, newFile);
                    } else {
                        newFileList.push(newFile);
                    }
                    setTreatmentPicList(newFileList);
                    console.log("newfile", newFileList);
                    onSuccess(data, newFile);
                })
                .catch((error) => {
                    onError(error);
                });
        },
        getData: (file) => {
            return {
                name: file.name,
            };
        },
        showUploadList: {
            showPreviewIcon: true,
            showDownloadIcon: true,
            showRemoveIcon: true,
        },
        maxCount: 3,
        accept: 'image/*',
    };

    const symptomVideoUploadProps = {
        // action: 'http://127.0.0.1:8000/case/upload/picture/',
        listType: 'picture-card',
        fileList: symptomVideo,
        onRemove: handleSymptomVideoRemove,
        onPreview: handleVideoPreview,
        customRequest: ({onSuccess, onError, file}) => {
            const formData = new FormData();
            formData.append('video', file);
            fetch('http://127.0.0.1:8000/case/upload/video/', {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    const newFile = {
                        uid: file.uid,
                        name: data.name,
                        status: data.success ? 'done' : 'error',
                        url: data.url,
                        thumbUrl: data.thumbUrl,
                    };

                    const newFileList = [...symptomVideo];
                    const targetIndex = newFileList.findIndex(
                        (item) => item.uid === file.uid
                    );
                    if (targetIndex !== -1) {
                        newFileList.splice(targetIndex, 1, newFile);
                    } else {
                        newFileList.push(newFile);
                    }
                    setSymptomVideo(newFileList);
                    console.log("symptom new video", newFileList);
                    onSuccess(data, newFile);
                })
                .catch((error) => {
                    onError(error);
                });
        },
        getData: (file) => {
            return {
                name: file.name,
            };
        },
        showUploadList: {
            showPreviewIcon: true,
            showDownloadIcon: true,
            showRemoveIcon: true,
        },
        maxCount: 2,
        accept: 'video/*',
    };
    const diagnosisVideoUploadProps = {
        // action: 'http://127.0.0.1:8000/case/upload/picture/',
        listType: 'picture-card',
        fileList: diagnosisVideo,
        onRemove: handleDiagnosisVideoRemove,
        onPreview: handleVideoPreview,
        customRequest: ({onSuccess, onError, file}) => {
            const formData = new FormData();
            formData.append('video', file);
            fetch('http://127.0.0.1:8000/case/upload/video/', {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    const newFile = {
                        uid: file.uid,
                        name: data.name,
                        status: data.success ? 'done' : 'error',
                        url: data.url,
                        thumbUrl: data.thumbUrl,
                    };

                    const newFileList = [...diagnosisVideo];
                    const targetIndex = newFileList.findIndex(
                        (item) => item.uid === file.uid
                    );
                    if (targetIndex !== -1) {
                        newFileList.splice(targetIndex, 1, newFile);
                    } else {
                        newFileList.push(newFile);
                    }
                    setDiagnosisVideo(newFileList);
                    console.log("diagnosis new video", newFileList);
                    onSuccess(data, newFile);
                })
                .catch((error) => {
                    onError(error);
                });
        },
        getData: (file) => {
            return {
                name: file.name,
            };
        },
        showUploadList: {
            showPreviewIcon: true,
            showDownloadIcon: true,
            showRemoveIcon: true,
        },
        maxCount: 2,
        accept: 'video/*',
    };
    const treatmentVideoUploadProps = {
        // action: 'http://127.0.0.1:8000/case/upload/picture/',
        listType: 'picture-card',
        fileList: treatmentVideo,
        onRemove: handleTreatmentVideoRemove,
        onPreview: handleVideoPreview,
        customRequest: ({onSuccess, onError, file}) => {
            const formData = new FormData();
            formData.append('video', file);
            fetch('http://127.0.0.1:8000/case/upload/video/', {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    const newFile = {
                        uid: file.uid,
                        name: data.name,
                        status: data.success ? 'done' : 'error',
                        url: data.url,
                        thumbUrl: data.thumbUrl,
                    };

                    const newFileList = [...treatmentVideo];
                    const targetIndex = newFileList.findIndex(
                        (item) => item.uid === file.uid
                    );
                    if (targetIndex !== -1) {
                        newFileList.splice(targetIndex, 1, newFile);
                    } else {
                        newFileList.push(newFile);
                    }
                    setTreatmentVideo(newFileList);
                    console.log("diagnosis new video", newFileList);
                    onSuccess(data, newFile);
                })
                .catch((error) => {
                    onError(error);
                });
        },
        getData: (file) => {
            return {
                name: file.name,
            };
        },
        showUploadList: {
            showPreviewIcon: true,
            showDownloadIcon: true,
            showRemoveIcon: true,
        },
        maxCount: 2,
        accept: 'video/*',
    };

    function transferData(fileType, fileLists) {
        const filteredArr = fileLists.filter(item => item.url); // 过滤出 url 不为空的对象

        const result = Array.from({length: 3}, (_, index) => ({
            [`${fileType}_pic${index + 1}`]: ""
        })).reduce((obj, item, index) => {
            if (filteredArr[index]) {
                obj[`${fileType}_pic${index + 1}`] = filteredArr[index].url;
            } else {
                obj[`${fileType}_pic${index + 1}`] = "";
            }
            return obj;
        }, {}); // 使用 reduce() 方法将对象转换为新的对象，重命名 url 字段并添加索引

        return result;
    }

    const [tableLittleType, setTableLittleType] = useState([]);
    const [tableLittleTypeValue, setTableLittleTypeValue] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [tableBigTypeValue, setTableBigTypeValue] = useState([]);

    function getTableLittleTypesData(value) {
        if (value === undefined) {
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


    async function addCase(caseData) {
        try {
            const res = await api.addCase(caseData)
            const data = await res.data
            console.log(data);
            success("添加成功！")
        } catch (error) {
            console.log(error);
            showError(error)
            showError("添加失败！")
        }
        props.getcasedata();
    }



    useEffect(()=>{
        console.log("casenew form useeffect")
    })



    async function checkValueInData(value) {
        if (props.caseNumbers.indexOf(value) > -1) {
            return Promise.reject('已存在该病例标识！');
        }
        return Promise.resolve();

    }

    return (
        <>
            {contextHolder}
            <ModalForm
                labelWidth="auto"
                trigger={
                    <Button type="primary">
                        <PlusOutlined/>
                        新建病例
                    </Button>
                }
                submitter={{
                    submitButtonProps: {}, resetButtonProps: {
                        style: {
                            // 隐藏重置按钮
                            display: 'none',
                        },
                    },
                }}
                onFinish={async (values) => {
                    values.symptom_video = symptomVideo.length > 0 ? symptomVideo[0].url : "";
                    values.diagnosis_video = diagnosisVideo.length > 0 ? diagnosisVideo[0].url : "";
                    values.treatment_video = treatmentVideo.length > 0 ? treatmentVideo[0].url : "";
                    let tot_values = {...values, ...transferData("symptom", symptomPicList), ...transferData("diagnosis", diagnosisPicList), ...transferData("treatment", treatmentPicList)}
                    try {
                        await addCase(tot_values)
                    } catch (error) {
                        showError("失败！")
                    }
                    await waitTime(500);
                    console.log(tot_values);
                    console.log(values);
                }}
                initialValues={[]}
            >
                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="case_number"
                        label="病例标识"
                        rules={[
                            {
                                required: true,
                                message: '请输入病例标识！',
                            },
                            {
                                validator: (_, value) => checkValueInData(value),
                            },
                        ]}
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
                        rules={[
                            {
                                required: true,
                                message: '请输入病例种类！',
                            },
                        ]}
                        onChange={handleBigTypeChange}
                        options={getTableBigTypesData()}
                    />
                    <ProFormSelect
                        width="md"
                        name="disease_name"
                        label="病种名称"
                        rules={[
                            {
                                required: true,
                                message: '请输入病种名称！',
                            },
                        ]}
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
                        rules={[
                            {
                                required: true,
                                message: '请输入宠物名称！',
                            },
                        ]}
                        placeholder="请输入宠物名称"
                    />
                    <ProFormText
                        width="md"
                        name="pet_species"
                        label="宠物种类"
                        rules={[
                            {
                                required: true,
                                message: '请输入宠物种类！',
                            },
                        ]}
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
                        rules={[
                            {
                                required: true,
                                message: '请输入宠物年龄！',
                            },
                        ]}
                        placeholder="请输入宠物年龄"
                        tooltip="仅支持整数数字"
                    />
                    <ProFormText
                        width="md"
                        name="owner_name"
                        label="宠物主人姓名"
                        rules={[
                            {
                                required: true,
                                message: '请输入宠物主人姓名！',
                            },
                        ]}
                        required
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

                    <div style={{width: "1000px"}}>
                        <ProForm.Item
                            label="主要病症图片"
                            name="symptom_pic"
                            width="xl"
                            tooltip={"照片不能超过三张！"}
                        >
                            <ImgCrop
                                rotationSlider>
                                <ImgCrop
                                    rotationSlider>
                                    <Upload {...symptomPicUploadProps}>
                                        {symptomPicList.length < 3 && '+ 点击上传'}
                                    </Upload>
                                </ImgCrop>
                            </ImgCrop>
                        </ProForm.Item>
                    </div>

                    <ProForm.Item
                        label="主要病症视频"
                        width="xl"
                        name="symptom_video"
                    >

                        <Upload {...symptomVideoUploadProps}>
                            {symptomVideo.length < 1 && '+ 点击上传'}
                        </Upload>
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

                    <div style={{width: "1000px"}}>
                        <ProForm.Item
                            label="诊断结果图片"
                            name="diagnosis_pic"
                            width="xl"
                            tooltip={"照片不能超过三张！"}
                        >
                            <ImgCrop
                                rotationSlider>
                                <ImgCrop
                                    rotationSlider>
                                    <Upload {...diagnosisPicUploadProps}>
                                        {diagnosisPicList.length < 3 && '+ 点击上传'}
                                    </Upload>
                                </ImgCrop>
                            </ImgCrop>
                        </ProForm.Item>
                    </div>

                    <ProForm.Item
                        label="诊断结果视频"
                        name="diagnosis_video"
                        width="xl"
                    >
                        <Upload {...diagnosisVideoUploadProps}>
                            {diagnosisVideo.length < 1 && '+ 点击上传'}
                        </Upload>
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

                    <div style={{width: "1000px"}}>
                        <ProForm.Item
                            label="治疗方案图片"
                            name="treatment_pic"
                            width="xl"
                            tooltip={"照片不能超过三张！"}
                        >
                            <ImgCrop
                                rotationSlider>
                                <Upload {...treatmentPicUploadProps}>
                                    {treatmentPicList.length < 3 && '+ 点击上传'}
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
                            <Upload {...treatmentVideoUploadProps}>
                                {treatmentVideo.length < 1 && '+ 点击上传'}
                            </Upload>
                        </div>
                    </ProForm.Item>
                </ProForm.Group>
            </ModalForm>
        </>
    )

};
CaseNewForm.propTypes = {
    tableCategory: PropTypes.array,
    getcasedata: PropTypes.func,
    caseNumbers:PropTypes.array,
}