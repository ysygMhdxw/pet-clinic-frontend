import {useState} from "react";
import {Button, Modal} from "antd";
import {VideoCameraOutlined} from "@ant-design/icons";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

export const VideoModal = ({ videoUrl }) => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div >
            <Button type="primary" onClick={showModal} icon={<VideoCameraOutlined />}>
                点击观看视频
            </Button>
            <Modal title="Video" visible={visible} onCancel={handleCancel} footer={null}>
                <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
            </Modal>
        </div>
    );
};
VideoModal.propTypes = {
    videoUrl: PropTypes.string
}