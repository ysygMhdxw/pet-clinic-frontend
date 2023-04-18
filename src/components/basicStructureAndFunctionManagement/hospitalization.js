import {message} from "antd";
import api from "../../api/api";
import React, {useEffect, useState} from "react";
import {HospitalizationManagement} from "./hospitalizationManagement";


export const Hospitalization = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const showError = (msg) => {
        messageApi.error(msg);
    };
    const [caseNumbers,setCaseNumbers]=useState([]);
    async function getCaseNumbers() {
        try {
            const res = await api.getAllCases()
            const data = res.data
            const caseNumbersList = data.cases.map((caseObj) => caseObj.id);
            setCaseNumbers(convertToOptions(caseNumbersList))

        } catch (error) {
            console.error(error);
            showError("不存在病例数据！");
        }
    }


    useEffect(() => {
        getCaseNumbers()
        console.log(caseNumbers)
    }, []);


    function convertToOptions(arr) {
        return arr.map((item) => ({
            value: item.toString(),
            label: item.toString(),
        }));
    }

    return (
        <>
            {contextHolder}
           <HospitalizationManagement caseNumberOptions={caseNumbers}/>
        </>
    )
}