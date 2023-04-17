import {Button, Space} from 'antd';
import React from "react";
import {DepartmentDisplay} from "./departmentDisplay";


export const GuideShow = () => {

    return (
        <Space direction="vertical"
               size="middle"
               style={{
                   display: 'flex',
               }}>
            <Button size="middle" href={"http://localhost/guideIndex.html"}>3D导览</Button>
            <DepartmentDisplay/>
        </Space>
    );
}
