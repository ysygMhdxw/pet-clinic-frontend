import React, { useState, useEffect, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import PropTypes from "prop-types";
import api from "../../api/api";
import {Button, DatePicker, InputNumber} from "antd";
import moment from 'moment';
import {SearchOutlined} from "@ant-design/icons";

export const TestTable=(props)=> {
    const [dataSource, setDataSource] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const actionRef = useRef(); // 用于获取 reload 方法的 ref

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dateFilteredInfo, setDateFilteredInfo] = useState({});
    const handleDateFilter = (value, record) => {
        const {bg_time:date_time} = record;
        const admissionDate = moment(startDate)
        const dischargeDate = moment(endDate);
        if (admissionDate && dischargeDate) {
            return date_time >= admissionDate && date_time <= dischargeDate;
        } else if (admissionDate) {
            return date_time >= admissionDate;
        } else if (dischargeDate) {
            return date_time <= dischargeDate;
        }
        return true;
    };
    const handleDateReset = () => {
        setStartDate(null);
        setEndDate(null);
        setDateFilteredInfo({});
    };
    const handleDateConfirm = () => {
        setDateFilteredInfo({
            bg_time: {
                ...dateFilteredInfo.bg_time,
                filters: [{text: `${startDate} - ${endDate}`, value: 'bg_time'}],
                filteredValue: [startDate, endDate],
            },
        });
    };
    // eslint-disable-next-line no-unused-vars
    const dateFilterDropdown = ({setSelectedKeys, confirm, clearFilters}) => (
        <div style={{ padding: 8 }}>
            <DatePicker
                placeholder="开始日期"
                style={{ width: 120, marginRight: 8 }}
                value={startDate ? moment(startDate, 'YYYY-MM-DD') : null}
                onPressEnter={confirm}
                onChange={(date, dateString) => setStartDate(dateString)}
            />
            <DatePicker
                placeholder="结束日期"
                style={{ width: 120, marginRight: 8 }}
                value={endDate ? moment(endDate, 'YYYY-MM-DD') : null}
                onPressEnter={confirm}
                onChange={(date, dateString) => setEndDate(dateString)}
            />
            <div style={{ marginTop: "10px", gap: "5px", display: "flex" }}>
                <Button onClick={handleDateReset}>重置</Button>
                <Button onClick={handleDateConfirm}>筛选</Button>
            </div>
        </div>
    );


    const fetchData = async () => {
        const res = await api.getCaseByDiseaseName(props.caseName)
        const data = res.data
        console.log(data);
        console.log("case_info");
        setDataSource(data.cases);
        setFilteredDataSource(data.cases);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 处理筛选操作
    const handleFilter = (filters) => {
        let filteredData = [...dataSource];

        // 根据筛选条件过滤数据
        if (filters && filters.length > 0) {
            filters.forEach((filter) => {
                const { value, dataIndex } = filter;
                filteredData = filteredData.filter((item) =>
                    item[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                );
            });
        }

        setFilteredDataSource(filteredData);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '病例编号',
            dataIndex: 'case_number',
            filters: [
                {
                    text: '包含数字1',
                    value: '1',
                },
                {
                    text: '包含数字2',
                    value: '2',
                },
            ],
            onFilter: (value, record) => record.case_number.includes(value),
        },
        {
            title: '疾病名称',
            dataIndex: 'disease_name',
        },
        {
            title: '宠物名称',
            dataIndex: 'pet_name',
        },
        {
            title: '主人姓名',
            dataIndex: 'owner_name',
        },
    ];

    return (
        <ProTable
            columns={columns}
            dataSource={filteredDataSource}
            actionRef={actionRef}
            search={{
                filterType: 'light',
                onFilter: handleFilter,
            }}
            options={{
                search: false,
            }}
            headerTitle="病例列表"
            rowKey="id"
            pagination={{
                pageSize: 10,
            }}
            tableAlertOptionRender={({ onCleanSelected }) => (
                <a onClick={() => onCleanSelected()}>清空筛选</a>
            )}
            toolBarRender={() => [
                <a key="refresh" onClick={() => actionRef.current.reload()}>
                    更新
                </a>,
            ]}
        />
    );
}
TestTable.propTypes = {
    caseName: PropTypes.string,
    setDisplayFlg: PropTypes.bool,
    setCaseInfo: PropTypes.object
}
