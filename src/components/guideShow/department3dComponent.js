import React from 'react';
import "aframe";
import PropTypes from "prop-types";

const departments = {
    front_desk: '前台',
    archives: '档案室',
    examination_room: '诊室',
    immunization_room: '免疫室',
    laboratory: '化验室',
    imaging_room: '影像室',
    specialty_examination_room: '专科检查室',
    treatment_room: '处置室',
    pharmacy: '药房',
    injection_room: '注射室',
    surgery_preparation_room: '手术准备室',
    operating_room: '手术室',
    inpatient_department: '住院部',
    pathology_dissection_room: '病理剖检室',
};
const departmentsPic = {
    front_desk: 'qiantai.jpeg',
    archives: 'danganshi2.jpg',
    examination_room: 'zhenshi&binglijiepoushi.jpg',
    immunization_room: 'yaofang&mianyishi.jpg',
    laboratory: 'huayanshi&zhuankejianchashi&chuzhishi.jpg',
    imaging_room: 'yingxiangshi2.jpg',
    specialty_examination_room: 'huayanshi&zhuankejianchashi&chuzhishi.jpg',
    treatment_room: 'huayanshi&zhuankejianchashi&chuzhishi.jpg',
    pharmacy: 'yaofang&mianyishi.jpg',
    injection_room: '注射室',
    surgery_preparation_room: 'shoushushizhunbeishi.jpg',
    operating_room: 'shoushushi2.jpg',
    inpatient_department: 'zhuyuanbu.jpg',
    pathology_dissection_room: 'zhenshi&binglijiepoushi.jpg',
};

export const Department3dComponent = (props) => {
    if (props.departmentName === departments.archives) {
        return (
            <div style={{width: "1200px", height: "800px"}}>
                <a-scene embedded>
                    <a-sky src={`images/${departmentsPic.archives}`} rotation="0 -130 0"></a-sky>
                </a-scene>
            </div>
        );
    } else if (props.departmentName === departments.laboratory || props.departmentName === departments.specialty_examination_room || props.departmentName === departments.treatment_room) {
        return (
            <div style={{width: "1200px", height: "800px"}}>
                <a-scene embedded>
                    <a-sky src={`images/${departmentsPic.laboratory}`} rotation="0 -130 0"></a-sky>
                </a-scene>
            </div>
        );
    } else if (props.departmentName === departments.front_desk) {
        return (
            <div style={{width: "1200px", height: "800px"}}>
                <a-scene embedded>
                    <a-sky src={`images/${departmentsPic.front_desk}`} rotation="0 -130 0"></a-sky>
                </a-scene>
            </div>
        );
    } else if (props.departmentName === departments.operating_room) {
        return (
            <div style={{width: "1200px", height: "800px"}}>
                <a-scene embedded>
                    <a-sky src={`images/${departmentsPic.operating_room}`} rotation="0 -130 0"></a-sky>
                </a-scene>
            </div>
        );
    } else if (props.departmentName === departments.surgery_preparation_room) {
        return (
            <div style={{width: "1200px", height: "800px"}}>
                <a-scene embedded>
                    <a-sky src={`images/${departmentsPic.surgery_preparation_room}`} rotation="0 -130 0"></a-sky>
                </a-scene>
            </div>
        );
    } else if (props.departmentName === departments.pharmacy || props.departmentName === departments.immunization_room) {
        return (
            <div style={{width: "1200px", height: "800px"}}>
                <a-scene embedded>
                    <a-sky src={`images/${departmentsPic.pharmacy}`} rotation="0 -130 0"></a-sky>
                </a-scene>
            </div>
        );
    } else if (props.departmentName === departments.imaging_room) {
        return (
            <div style={{width: "1200px", height: "800px"}}>
                <a-scene embedded>
                    <a-sky src={`images/${departmentsPic.imaging_room}`} rotation="0 -130 0"></a-sky>
                </a-scene>
            </div>
        );
    } else if (props.departmentName === departments.examination_room || props.departmentName === departments.pathology_dissection_room) {
        return (
            <div style={{width: "1200px", height: "800px"}}>
                <a-scene embedded>
                    <a-sky src={`images/${departmentsPic.examination_room}`} rotation="0 -130 0"></a-sky>
                </a-scene>
            </div>
        );
    } else if (props.departmentName === departments.inpatient_department) {
        return (
            <div style={{width: "1200px", height: "800px"}}>
                <a-scene embedded>
                    <a-sky src={`images/${departmentsPic.inpatient_department}`} rotation="0 -130 0"></a-sky>
                </a-scene>
            </div>
        );
    } else {
        return (
            <div style={{width: "1200px", height: "800px"}}>
                暂时没有图片
            </div>
        )
    }

}
Department3dComponent.propTypes = {
    departmentName: PropTypes.string
}