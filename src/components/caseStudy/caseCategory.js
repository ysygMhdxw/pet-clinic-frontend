import {message, Tree} from 'antd';
import propTypes from 'prop-types';
import {useEffect, useState} from 'react';
import api from "../../api/api";

// const {Search} = Input;
//
// const dataList = [];

// const getParentKey = (key, tree) => {
//     let parentKey;
//     for (let i = 0; i < tree.length; i++) {
//         const node = tree[i];
//         if (node.children) {
//             if (node.children.some((item) => item.key === key)) {
//                 parentKey = node.key;
//             } else if (getParentKey(key, node.children)) {
//                 parentKey = getParentKey(key, node.children);
//             }
//         }
//     }
//     return parentKey;
// };
export const CaseCategory = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    // const success = (msg) => {
    //     messageApi.success(msg);
    // };
    const showError = (msg) => {
        messageApi.error(msg);
    };
    const [expandedKeys, setExpandedKeys] = useState([]);
    // const [searchValue, setSearchValue] = useState('');
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
            setTreeData(data.case_categories)
        } catch (error) {
            console.error(error);
            showError("不存在病例目录！");
        }
    }

    function getNodeName(selectedKeys, {node}) {
        console.log("getNodeName", node.title)
        props.setCaseName(node.title)
    }

    useEffect(() => {
        getTreeData()
        console.log(treeData);
    }, []);
    return (
        <div>
            {contextHolder}
            <h2>病例目录</h2>
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