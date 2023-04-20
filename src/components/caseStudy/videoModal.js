import {useState} from "react";
import {Button, Modal} from "antd";
import {VideoCameraOutlined} from "@ant-design/icons";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
export const VideoModal = ({videoUrl}) => {
    const [visible, setVisible] = useState(false);
    const [playing, setPlaying] = useState(false);

    const handleCancel = async () => {
        // 停止视频播放
        setPlaying(false);
        await waitTime(200);
        setVisible(false);
    };

    const showModal = () => {
        setVisible(true);
    };

    return (
        <div>
            <Button type="primary" onClick={showModal} icon={<VideoCameraOutlined/>}>
                点击观看视频
            </Button>
            <Modal width={800} height={600} title="视频" open={visible} onCancel={handleCancel} footer={null}>

                    {videoUrl===""?
                        "暂时没有视频数据":
                        <ReactPlayer
                            playing={playing} // 控制视频播放状态
                            onPlay={() => setPlaying(true)} // 更新播放状态
                            onPause={() => setPlaying(false)} // 更新播放状态
                            url={videoUrl}
                            controls
                            width="100%" height="100%"/>
                    }

            </Modal>
        </div>
    );
};
VideoModal.propTypes = {
    videoUrl: PropTypes.string
}