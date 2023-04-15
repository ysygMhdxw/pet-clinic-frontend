
import propTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {CaseDetail} from "./caseDetail";
import {CaseTable} from "./caseTable";
import {Divider} from "antd";


export const CaseRight = (props) => {

    const [displayFlg, setDisplayFlg] = useState(false)
    const [caseInfo, setCaseInfo] = useState()


    useEffect(() => {
        console.log("caseRight", props.caseName)
        setDisplayFlg(false)
    }, [props.caseName]);

    if (!displayFlg) {
        return (
            <>
                <h1 style={{marginBottom: "10"}}>{props.caseName===""?"所有":props.caseName}
                    <Divider type={"vertical"}></Divider>
                    病例列表
                </h1>
                <Divider></Divider>
                <CaseTable caseName={props.caseName} setDisplayFlg={setDisplayFlg} setCaseInfo={setCaseInfo}/>
            </>
        )
    } else {
        return (
            <>
                <CaseDetail caseInfo={caseInfo}/>
            </>
        )

    }


}
CaseRight.propTypes = {
    caseName: propTypes.string
};