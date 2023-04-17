import {
    ProForm,
    ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import {Divider, message, Upload} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import ImgCrop from "antd-img-crop";
import 'video.js/dist/video-js.css';
import propTypes from "prop-types";
import api from "../../api/api";


const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};


export const CheckupEditForm = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const caseFormRef = useRef();
    const showError = (msg) => {
        messageApi.error(msg);
    };
    const success = (msg) => {
        messageApi.success(msg);
    };
    // eslint-disable-next-line no-unused-vars
    const [checkUpData, setCheckUpData] = useState([])
    // file functions
    const [checkupVideo, setCheckupVideo] = useState([]);
    const [checkupPicList, setCheckupPicList] = useState([]);


    useEffect(() => {
        caseFormRef.current?.setFieldsValue(props.checkupItem)
        console.log(props.checkupItem)
        setCheckUpData(props)
        setCheckupPicList(newFileList(props.checkupItem.checkup_pics))
        setCheckupVideo(newVideoFileList([props.checkupItem.checkup_video]))
    }, [])

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

    const newVideoFileList = (record) => {
        let newFile = []
        record.map((videoUrl, index) => {
            if (videoUrl !== "") {
                newFile.push(
                    {
                        uid: `video-${index}`,
                        name: `video${index}.mp4`,
                        status: 'done',
                        url: videoUrl,
                    }
                )
            }
        });
        return newFile
    }

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


    const handleCheckupVideoRemove = (file) => {
        // 发送请求删除文件
        // 更新文件列表状态
        const newFileList = checkupVideo.filter((item) => item.uid !== file.uid);
        setCheckupVideo(newFileList);
    };
    const handleCheckupPicRemove = (file) => {
        const newFileList = checkupPicList.filter((item) => item.uid !== file.uid);
        setCheckupPicList(newFileList);
    };


    const checkupPicUploadProps = {
        // action: 'http://127.0.0.1:8000/case/upload/picture/',
        listType: 'picture-card',
        fileList: checkupPicList,
        onRemove: handleCheckupPicRemove,
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

                    const newFileList = [...checkupPicList];
                    const targetIndex = newFileList.findIndex(
                        (item) => item.uid === file.uid
                    );
                    if (targetIndex !== -1) {
                        newFileList.splice(targetIndex, 1, newFile);
                    } else {
                        newFileList.push(newFile);
                    }
                    setCheckupPicList(newFileList);
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

    const checkupVideoUploadProps = {
        // action: 'http://127.0.0.1:8000/case/upload/picture/',
        listType: 'picture-card',
        fileList: checkupVideo,
        onRemove: handleCheckupVideoRemove,
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

                    const newFileList = [...checkupVideo];
                    const targetIndex = newFileList.findIndex(
                        (item) => item.uid === file.uid
                    );
                    if (targetIndex !== -1) {
                        newFileList.splice(targetIndex, 1, newFile);
                    } else {
                        newFileList.push(newFile);
                    }
                    setCheckupVideo(newFileList);
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
    async function editCheckupData(checkupData) {
        try {
            const res = await api.editCheckupData(checkupData)
            const data = await res.data
            console.log(data);
            success("修改成功！")

        } catch (error) {
            console.log(error);
            showError("修改失败！")
        }
    }

    return (
        <>
            {contextHolder}
            <ProForm
                formRef={caseFormRef}
                onFinish={async (values) => {
                    await waitTime(500);
                    values.checkup_video = checkupVideo.length > 0 ? checkupVideo[0].url : "";
                    values.checkup_id=values.id;
                    let tot_values={...values,...transferData("checkup",checkupPicList)}
                    console.log(tot_values)
                    editCheckupData(tot_values)
                    return true
                }}
                onReset={false}
            >
                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="id"
                        label="检查项目编号"
                        disabled={true}
                    />
                    <ProFormText
                        width="md"
                        name="case_number"
                        label="病例编号"
                        disabled={true}
                    />
                    <ProFormText
                        width="md"
                        name="checkup_item"
                        label="检查项目"
                        placeholder="请输入检查项目"
                    />
                    <ProFormTextArea
                        width="lg"
                        name="checkup_text"
                        label="检查项目简介"
                        placeholder="请输入检查项目简介"
                    />
                </ProForm.Group>
                <div style={{width: "1200px"}}>
                    <ProForm.Item
                        label="检查项目图片"
                        name="checkup_pic"
                        width="xl"
                        tooltip={"照片不能超过三张！"}
                    >
                        <ImgCrop
                            rotationSlider>
                            <Upload {...checkupPicUploadProps}>
                                {checkupPicList.length < 3 && '+ 点击上传'}
                            </Upload>
                        </ImgCrop>
                    </ProForm.Item>
                </div>

                <ProForm.Item
                    label="检查项目视频"
                    width="xl"
                    name="checkup_video"
                >
                    <Upload {...checkupVideoUploadProps}>
                        {checkupVideo.length < 1 && '+ 点击上传'}
                    </Upload>
                </ProForm.Item>
                <Divider/>
            </ProForm>
        </>
    )

};

CheckupEditForm.propTypes = {
    checkupItem: propTypes.object,
};