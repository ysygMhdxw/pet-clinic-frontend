import { Input, Tree } from 'antd';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import api from '../api/api';
const { Search } = Input;

const dataList = [];

const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item) => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};
const CaseCategory = (props) => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [treeData, setTreeData] = useState([])
    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };
    const onChange = (e) => {
        const { value } = e.target;
        const newExpandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, treeData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        setExpandedKeys(newExpandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };

    function getTreeData() {
        api.getCaseCategories()
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setTreeData(result.case_categories)
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    function getNodeName(selectedKeys, { node }) {
        console.log(selectedKeys);
        console.log(node);
        props.setCaseName(node.key)
        props.setTableFlg(true)
    }

    useEffect(() => {
        getTreeData()
        console.log(treeData);
    }, [searchValue]);
    return (
        <div>
            <Search
                style={{
                    marginBottom: 8,
                }}
                placeholder="Search"
                onChange={onChange}
            />
            <Tree
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={treeData}
                onSelect={getNodeName}
            />
        </div>
    );
};
export default CaseCategory;

CaseCategory.propTypes = {
    setCaseName: propTypes.func,
    setTableFlg: propTypes.func
};