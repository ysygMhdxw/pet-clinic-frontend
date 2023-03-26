import React, {useState} from 'react';
import {Form, Input, Upload, Button, message} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';

const {Item} = Form;

const EditableForm = ({initialValues}) => {
    const [form] = Form.useForm();
    const [checkupPicList, setCheckupPicList] = useState(initialValues?.case?.checkup?.checkup_pic || []);
    const [symptomPicList, setSymptomPicList] = useState(initialValues?.case?.symptom_pic || []);
    const [symptomVideo, setSymptomVideo] = useState(initialValues?.case?.symptom_video || '');
    const [checkupVideo, setCheckupVideo] = useState(initialValues?.case?.checkup?.checkup_video || '');

    const handleCheckupPicChange = (info) => {
        if (info.file.status === 'done') {
            setCheckupPicList([...checkupPicList, info.file.response.url]);
            message.success('上传成功');
        } else if (info.file.status === 'error') {
            message.error('上传失败');
        }
    };

    const handleSymptomPicChange = (info) => {
        if (info.file.status === 'done') {
            setSymptomPicList([...symptomPicList, info.file.response.url]);
            message.success('上传成功');
        } else if (info.file.status === 'error') {
            message.error('上传失败');
        }
    };

    const handleSymptomVideoChange = (info) => {
        if (info.file.status === 'done') {
            setSymptomVideo(info.file.response.url);
            message.success('上传成功');
        } else if (info.file.status === 'error') {
            message.error('上传失败');
        }
    };

    const handleCheckupVideoChange = (info) => {
        if (info.file.status === 'done') {
            setCheckupVideo(info.file.response.url);
            message.success('上传成功');
        } else if (info.file.status === 'error') {
            message.error('上传失败');
        }
    };

    const handleDeleteCheckupPic = (index) => {
        const newPicList = [...checkupPicList];
        newPicList.splice(index, 1);
        setCheckupPicList(newPicList);
    };

    const handleDeleteSymptomPic = (index) => {
        const newPicList = [...symptomPicList];
        newPicList.splice(index, 1);
        setSymptomPicList(newPicList);
    };

    const handleDeleteSymptomVideo = () => {
        setSymptomVideo('');
    };

    const handleDeleteCheckupVideo = () => {
        setCheckupVideo('');
    };

    return (
        <Form
            layout="vertical"
            form={form}
            initialValues={initialValues}
            onFinish={(values) => console.log(values)}
        >
            <Item label="病例编号" name={['case', 'checkup', 'case_number']} rules={[{required: true}]}>
                <Input/>
            </Item>
            <Item label="体检图片" name={['case', 'checkup', 'checkup_pic']}>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={checkupPicList.map((url, index) => ({
                        uid: index,
                        name: `checkup,
...${index}, status: 'done', url, thumbUrl: url, }))} onChange={handleCheckupPicChange} > <Button>上传图片</Button> </Upload> </Item> <Item label="体检视频" name={['case', 'checkup', 'checkup_video']}> <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" fileList={checkupVideo ? [ { uid: '1', name: 'checkup_video.mp4', status: 'done', url: checkupVideo, }, ] : []} onChange={handleCheckupVideoChange} > <Button>上传视频</Button> </Upload> {checkupVideo && ( <Button onClick={handleDeleteCheckupVideo} style={{ marginTop: 8 }}> <DeleteOutlined /> 删除视频 </Button> )} </Item> <Item label="症状图片" name={['case', 'symptom_pic']}> <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card" fileList={symptomPicList.map((url, index) => ({ uid: index, name: symptom_${index}`,
                        status: 'done',
                        url,
                        thumbUrl: url,
                    }))}
                    onChange={handleSymptomPicChange}
                >
                    <Button>上传图片</Button>
                </Upload>
            </Item>
            <Item label="症状视频" name={['case', 'symptom_video']}>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    fileList={symptomVideo ? [
                        {
                            uid: '1',
                            name: 'symptom_video.mp4',
                            status: 'done',
                            url: symptomVideo,
                        },
                    ] : []}
                    onChange={handleSymptomVideoChange}
                >
                    <Button>上传视频</Button>
                </Upload>
                {symptomVideo && (
                    <Button onClick={handleDeleteSymptomVideo} style={{marginTop: 8}}>
                        <DeleteOutlined/>
                        删除视频
                    </Button>
                )}
            </Item>
            <Item>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Item>
        </Form>
    );
};

export default EditableForm;