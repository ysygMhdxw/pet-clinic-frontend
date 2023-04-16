import {useState} from 'react';
import {Upload, Button, message} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

export const VideoUploader = () => {
    const [fileList, setFileList] = useState([]);

    const handleUpload = (file) => {
        const isVideo = file.type.startsWith('video/');
        const isLt100M = file.size / 1024 / 1024 < 100;
        if (!isVideo) {
            message.error('只能上传视频文件！');
            return false;
        }
        if (!isLt100M) {
            message.error('视频文件大小不能超过100MB！');
            return false;
        }
        return true;
    };

    const handleUploadChange = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-3); // 限制最多上传三个视频
        fileList = fileList.map((file) => {
            if (file.response) {
                file.url = file.response.url; // 将上传成功的视频的 URL 保存到 file 对象中
            }
            return file;
        });
        setFileList(fileList);
    };

    const handlePreview = (file) => {
        const url = file.url || URL.createObjectURL(file.originFileObj);
        window.open(url);
    };

    const uploadProps = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // 上传视频的接口地址
        onChange: handleUploadChange,
        beforeUpload: handleUpload, // 验证上传的视频文件是否符合要求
        fileList,
        multiple: true,
        showUploadList: {
            showPreviewIcon: true,
            showRemoveIcon: true,
            removeIcon: <Button size="small">删除</Button>,
            previewIcon: <Button size="small" onClick={handlePreview}>预览</Button>,
        },
    };

    return (
        <div>
            <Upload {...uploadProps}>
                <Button icon={<UploadOutlined/>}>上传视频</Button>
            </Upload>
        </div>
    );
}