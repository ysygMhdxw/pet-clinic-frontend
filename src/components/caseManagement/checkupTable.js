import React, {useEffect, useRef, useState} from 'react';
import {
    EditableProTable,
    ModalForm,
    ProForm,
    ProFormText,
    ProFormTextArea
} from "@ant-design/pro-components";
import {Button, Carousel, Input, message, Popconfirm, Space, Table, Upload} from "antd";
import api from "../../api/api";
import PropTypes from "prop-types";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {CheckupEditForm} from "./checkupEditForm";
import ImgCrop from "antd-img-crop";

const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
export const CheckUpTable = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = (msg) => {
        messageApi.success(msg);
    };
    const showError = (msg) => {
        messageApi.error(msg);
    };
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [displayFlg, setDisplayFlg] = useState(false);
    const [checkupItem, setCheckupItem] = useState({});
    const handleRowSelection = (selectedRowKeys, selectedRows) => {
        console.log(selectedRows)
        setSelectedRows(selectedRows);
    };
    const handleBatchDelete = async () => {
        if (selectedRows.length === 0) {
            showError('请选择要删除的行！');
            return;
        }
        const keys = selectedRows.map((row) => row.id);
        console.log("keys: ", keys)
        try {
            const res = await api.deleteCaseCheckUpByCaseupIds(keys)
            const data = res.data
            console.log(data)
            success("批量删除检查项目成功！")
        } catch (error) {
            console.error(error);
            showError("批量删除检查项目失败，请稍后再试！");
        }
        getCheckupItemData()
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        console.log(selectedKeys);
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex, columnName) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`查询 ${columnName}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        查询
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        清空搜索
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        筛选
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        关闭
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

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


    const [checkupVideo, setCheckupVideo] = useState([]);
    const [checkupPicList, setCheckupPicList] = useState([]);
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

    const columns = [
            {
                title: '编号',
                dataIndex: 'id',
                key: 'id',
                width: "10%",
                sorter: (a, b) => a.id - b.id,
                ...getColumnSearchProps("id", "检查项目编号")
            },
            {
                title: '检查项目',
                dataIndex: 'checkup_item',
                key: 'checkup_item',
                width: "10%",
                ...getColumnSearchProps("checkup_item", "检查项目")
            },
            Table.EXPAND_COLUMN,
            {
                title: '病例检查图片',
                dataIndex: 'checkup_pics',
                key: 'checkup_pics',
                render: (pics) => {
                    const allEmpty = pics.every((pic) => pic === '');
                    pics = pics.filter((pic) => pic !== '');
                    if(allEmpty){
                        return (
                            <div>
                                暂无图片
                            </div>
                        )
                    }
                    else {
                        return (
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

                        )
                    }

                },
                width: "200px"
            },
            {
                title: '病例检查视频',
                dataIndex: 'checkup_video',
                key: 'checkup_video',
                render: (text) => {
                    if (text === "-") {
                        return (
                            <div>
                                暂无视频
                            </div>
                        )
                    } else {
                        return (
                            <video width="320px" height="240px" controls>
                                <source src={text} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        )
                    }

                },
                width: "400px"
            },
            {
                title: '操作',
                valueType: 'option',
                width: 150,
                // eslint-disable-next-line no-unused-vars
                render: (text, record, _, action) => [
                    <a
                        key="editable"
                        onClick={() => {
                            setCheckupItem(record)
                            setDisplayFlg(true);
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
                            deleteCheckupItemByIds([record.id], (error) => {
                                if (error) showError(error);
                            });
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
            }
            ,
        ]
    ;
    const [checkupData, setCheckupData] = useState([]);

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

    async function getCheckupItemData() {
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

    async function deleteCheckupItemByIds(checkupIds) {
        try {
            const res = await api.deleteCaseCheckUpByCaseupIds(checkupIds)
            const data = res.data
            console.log(data)
            success("删除检查项目成功！")
        } catch (error) {
            console.error(error);
            showError("删除检查项目失败！");
        }
        getCheckupItemData()
    }

    async function addCheckupData(checkupdata) {
        try {
            const res = await api.addCheckupData(checkupdata)
            const data = res.data
            console.log(data)
            success("添加检查项目成功！")
        } catch (error) {
            console.error(error);
            showError("添加检查项目失败！");
        }
        getCheckupItemData()
    }


    useEffect(() => {
        getCheckupItemData()
    }, [props])

    // const [visible, setVisible] = useState(false);
    // const formRef = useRef(null);
    //
    // const handleOpenModal = () => {
    //     setVisible(true);
    //     formRef.current && formRef.current.resetFields();
    // };
    //
    // const handleCloseModal = () => {
    //     setVisible(false);
    // };

    if (displayFlg) {
        return (
            <div>
                <div style={{marginBottom: "5%"}}>
                    <Button type={"primary"} onClick={() => {
                        getCheckupItemData()
                        setDisplayFlg(false)
                    }}>返回到病例检查表格</Button>
                </div>
                <CheckupEditForm checkupItem={checkupItem} getCheckupItemData={getCheckupItemData}/>
            </div>
        )
    } else {
        return (
            <div>
                {contextHolder}
                <div style={{display: "flex", justifyContent: "flex-end", gap: "10px", marginRight: "3%"}}>
                    <div style={{marginLeft: "auto"}}>
                        <ModalForm
                            initialValues={{}}
                            submitter={{// 配置按钮文本
                                searchConfig: {
                                    resetText: '重置',
                                    submitText: '提交',
                                },
                                // 配置按钮的属性
                                resetButtonProps: {
                                    style: {
                                        // 隐藏重置按钮
                                        display: 'none',
                                    },
                                },
                                submitButtonProps: {},}}
                            labelWidth="auto"
                            trigger={
                                <Button type="primary">
                                    <PlusOutlined/>
                                    新建检查项目
                                </Button>
                            }
                            onFinish={async (values) => {
                                values.checkup_video = checkupVideo.length > 0 ? checkupVideo[0].url : "";
                                console.log(values)
                                let tot_data = {
                                    ...values,
                                    case_number: props.caseNumber, ...transferData("checkup", checkupPicList),
                                }
                                addCheckupData(tot_data)
                                console.log(tot_data)
                                await waitTime(500);
                                return true;
                            }}
                        >
                            <ProForm.Group>
                                <ProFormText
                                    width="md"
                                    name="checkup_item"
                                    label="检查项目名称"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入检查项目名称！',
                                        },
                                    ]}
                                    tooltip="最长为 24 位"
                                    placeholder="请输入名称"
                                />
                            </ProForm.Group>
                            <ProForm.Group>
                                <ProFormTextArea
                                    name='checkup_text'
                                    width="md"
                                    label="检查项目简介"
                                    rules={[
                                        {
                                            required: true,
                                            message: '此项为必填项！',
                                        },
                                    ]}
                                    placeholder="请输入检查项目简介"
                                />
                                <div style={{width: "1000px"}}>
                                    <ProForm.Item
                                        label="检查项目图片"
                                        name="checkup_pic"
                                        width="xl"
                                        tooltip={"照片不能超过三张！"}
                                    >
                                        <ImgCrop
                                            rotationSlider>
                                            <ImgCrop
                                                rotationSlider>
                                                <Upload {...checkupPicUploadProps}>
                                                    {checkupPicList.length < 3 && '+ 点击上传'}
                                                </Upload>
                                            </ImgCrop>
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
                            </ProForm.Group>
                        </ModalForm>
                    </div>
                    <div>
                        <Button type="primary" onClick={handleBatchDelete}>
                            批量删除
                        </Button>
                    </div>
                </div>
                <EditableProTable
                    rowKey="id"
                    headerTitle="检查项目基本信息"
                    maxLength={5}
                    scroll={{
                        x: 960,
                    }}
                    pagination={{
                        pageSize: 10,
                        showQuickJumper: true,
                    }}
                    recordCreatorProps={false}
                    loading={false}
                    columns={columns}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: handleRowSelection
                    }}
                    value={checkupData}
                    onChange={setCheckupData}
                    expandable={{
                        expandedRowRender: (record) => <p style={{margin: 0}}>{record.checkup_text}</p>,
                    }}
                    search={false}
                    editable={{
                        type: 'multiple',
                        editableKeys,
                        // eslint-disable-next-line no-unused-vars
                        onSave: async (rowKey, data, _row) => {
                            // editCheckup(data)
                            await waitTime(500);
                        },
                        // eslint-disable-next-line no-unused-vars
                        onDelete: async (rowKey, data, _row) => {
                            deleteCheckupItemByIds([data.id], (error) => {
                                if (error) showError(error);
                            });
                            await waitTime(500);
                        },
                        onChange: setEditableRowKeys,
                    }}
                />
            </div>
        )
    }


};
CheckUpTable.propTypes = {
    caseNumber: PropTypes.string
}