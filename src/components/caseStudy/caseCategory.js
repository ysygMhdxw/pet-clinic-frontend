import {Divider, message, Tree} from 'antd';
import propTypes from 'prop-types';
import {useEffect, useState} from 'react';
import api from "../../api/api";


export const CaseCategory = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    // const success = (msg) => {
    //     messageApi.success(msg);
    // };
    const showError = (msg) => {
        messageApi.error(msg);
    };
    const [expandedKeys, setExpandedKeys] = useState([0]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [treeData, setTreeData] = useState([])
    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    async function getTreeData() {
        try {
            const responce = await api.getCaseCategories()
            const data = responce.data
            let all = {
                title: "所有病例",
                key: "all cases",
            }
            let categories = [all, ...data.case_categories]
            console.log(categories)
            setTreeData(categories)
        } catch (error) {
            console.error(error);
            showError("不存在病例目录！");
        }
    }

    function getNodeName(selectedKeys, {node}) {
        console.log("getNodeName", node.title)
        let category = node.title
        if (node.title === "所有病例") category = "";
        props.setCaseName(category)
    }

    useEffect(() => {
        getTreeData()
        console.log(treeData);
    }, []);
    return (
        <div>
            {contextHolder}
            <h2>病例目录</h2>
            <Divider/>
            <Tree
                defaultExpandAll
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={treeData}
                onSelect={getNodeName}
            />
        </div>
    );
};

CaseCategory.propTypes = {
    setCaseName: propTypes.func
};