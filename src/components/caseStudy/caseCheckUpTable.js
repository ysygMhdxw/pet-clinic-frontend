import React, {useEffect, useState} from 'react';
import {ProTable} from "@ant-design/pro-components";
import {Carousel, Descriptions, message, Table} from "antd";
import api from "../../api/api";
import PropTypes from "prop-types";


export const CaseCheckUpTable = (props) => {
    const columns = [
        {
            title: '病例检查编号',
            dataIndex: 'id',
            key: 'id',
            width: "10%"
        },
        {
            title: '病例检查项目',
            dataIndex: 'checkup_item',
            key: 'checkup_item',
            width: "10%"
        },
        Table.EXPAND_COLUMN,
        {
            title: '病例检查图片',
            dataIndex: 'checkup_pics',
            key: 'checkup_pics',
            render: (pics) => (
                <div style={{width: "200px", height: "300px", alignContent: "center"}}>
                    <Carousel>
                        {pics.map((pic, index) => (
                            <div key={index} style={{display: "flex", justifyContent: "center", width: "100%"}}>
                                <img width={"200px"} height={"200px"} src={pic} alt={`checkup_pic_${index}`}
                                     style={{marginTop: "60px"}}/>
                            </div>
                        ))}
                    </Carousel>
                </div>

            ),
            width: "200px"
        },
        {
            title: '病例检查视频',
            dataIndex: 'checkup_video',
            key: 'checkup_video',
            render: (text) => (
                <video width="320px" height="240px" controls>
                    <source src={text} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            ),
            width: "400px"
        },
    ];
    const [messageApi, contextHolder] = message.useMessage();

    const showError = (msg) => {
        messageApi.error(msg);
    };
    const [checkupData, setCheckupData] = useState([]);

    async function getCheckupData() {
        try {
            const res = await api.getCaseCheckUpByCaseNumber(props.caseNumber)
            const data = res.data.checkups
            data.forEach((item) => {
                const pics = [item.checkup_pic1, item.checkup_pic2, item.checkup_pic3];
                item.checkup_pics = pics.filter((pic) => pic !== null && pic !== undefined);
                delete item.checkup_pic1;
                delete item.checkup_pic2;
                delete item.checkup_pic3;
            });
            setCheckupData(data)
            console.log(data);
        } catch (error) {
            console.error(error);
            setCheckupData([]);
            showError("不存在病例数据！");
        }
    }

    useEffect(() => {
        getCheckupData()
    }, [props])
    return (
        <div style={{marginTop: "10%"}}>
            {contextHolder}
            <Descriptions
                title={"病例检查信息表"}
                bordered
                column={1}
            >
            </Descriptions>
            <ProTable
                columns={columns}
                dataSource={checkupData}
                expandable={{
                    expandedRowRender: (record) => <p style={{margin: 0}}>{record.checkup_text}</p>,
                }}
                search={false}
                toolBarRender={false}
            />
        </div>
    )
};
CaseCheckUpTable.propTypes = {
    caseNumber: PropTypes.number
}