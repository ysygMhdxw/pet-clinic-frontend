import { Divider, Space, Table } from 'antd';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import api from '../api/api';
import { CaseDisplay } from './caseDisplay';



export const CaseTable = (props) => {
    const [tableData, setTableData] = useState([])
    const [displayFlg, setDisplayFlg] = useState(false)
    const [caseInfo, setCaseInfo] = useState()
    const columns = [
        {
            title: '病例编号',
            dataIndex: 'case_number',
            key: 'case_number',
        },
        {
            title: '宠物名称',
            dataIndex: 'pet_name',
            key: 'pet_name',
        },
        {
            title: '宠物种类',
            dataIndex: 'disease_type',
            key: 'disease_type',
        },
        {
            title: '宠物主人名称',
            dataIndex: 'owner_name',
            key: 'owner_name'
        },
        {
            title: '操作',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <a onClick={() => {
                        Promise.all([console.log(record),
                        setCaseInfo(record)]).then(() => {
                            setDisplayFlg(true);
                        });
                    }}
                    >查看病例详情</a>
                </Space>
            ),
        },
    ];

    async function getCasesData() {
        const res = await api.getCaseByDiseaseName({ caseName: props.caseName })
        const data = await res.json()
        console.log(data);
        console.log("case_info");
        setTableData(data.case_info)
        setDisplayFlg(false)
    }
    useEffect(() => {
        getCasesData()
    }, [props]);

    if (!displayFlg) {
        return (
            <>
                <h1 style={{ marginBottom: "10" }}>{props.caseName}<Divider type='vertical'></Divider>病例信息</h1>
                <Table columns={columns} dataSource={tableData} />
            </>
        )
    }
    else {
        return (
            <>
                <div>
                    <h1 style={{ marginBottom: "10" }}>{props.caseName}<Divider type='vertical'></Divider>病例详情信息</h1>
                </div>

                <CaseDisplay caseInfo={caseInfo} />
            </>
        )

    }



}
CaseTable.propTypes = {
    caseName: propTypes.string
};