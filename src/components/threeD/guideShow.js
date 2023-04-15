import { Button, Space, Table } from 'antd';
// import propTypes from "prop-types";

export const GuideShow = ( ) => {
    const columns = [
        {
            title: '科室',
            dataIndex: 'name',
            key: 'name',
            width:'15%',
        },
        {
            title: '功能',
            dataIndex: 'function',
            key: 'function',
            width:'55%',
        },
        {
            title: '负责人',
            dataIndex: 'person',
            key: 'person',
            width:'15%',
        },
    ];
    const data = [
        {
            key: '1',
            name: '前台',
            function: '包括接待挂号、导医咨询、病历档案发出与回收、收费等',
            person: '前台',
        },
        {
            key: '2',
            name: '档案室',
            function: '包括病例档案的合理保存与数据统计等',
            person: '前台',
        },
        {
            key: '3',
            name: '诊室',
            function: '包括诊室的布局介绍；对宠物进行临床基本检查（视、听、触、嗅等）、疾病诊断；与宠物主人交流并根据情况开具处方',
            person: '执业兽医师',
        },
        {
            key: '4',
            name: '免疫室',
            function: '包括为健康宠物接种疫苗的流程，对常见并发症的处理流程，对常见免疫相关问题的解答等',
            person: '助理\n' +
                '执业兽医师\n',
        },
        {
            key: '5',
            name: '化验室',
            function: '包括对送检样本的预处理，对相应样本进行血常规、血液生化、电解质、血气、血凝指标、激素指标、尿常规、微生物学检查、药敏、皮肤刮片、粪便检查、传染病检查等检查操作流程z',
            person: '助理\n' +
                '执业兽医师\n',
        },
        {
            key: '6',
            name: '影像室',
            function: '包括X线检查、B超检查以及CT、MRI检查。如X线检查：X光机的结构功能介绍、全身各部位的摆位、拍摄条件的选择、拍摄流程、洗片的操作流程。B超检查：扫查探头的选择、全身各个部位扫查的摆位、腹部扫查流程',
            person: '助理\n' +
                '执业兽医师\n',
        },
        {
            key: '7',
            name: '专科检查室',
            function: '包括对眼科、骨科、神经科、心脏科等专科疾病的检查，如眼科（检眼镜检查、眼压检查、裂隙灯检查、眼底检查、泪液分泌量检查等）、心脏科检查（心脏听诊、心电图检查等）、神经学检查（步态检查、各种反射检查等）等',
            person: '执业兽医师',
        },
        {
            key: '8',
            name: '处置室',
            function: '包括口服投药、换药、清洗耳道、挤肛门腺、修剪指甲、鼻饲管放置、灌肠、安乐死等基本处置操作流程。',
            person: '助理\n' +
                '执业兽医师',
        },
        {
            key: '9',
            name: '药房',
            function: '包括对各种药物的存放要求、处方的审核流程、药物的发放流程、常见药物的使用说明等',
            person: '助理执业兽医师',
        },
        {
            key: '10',
            name: '注射室',
            function: '包括静脉注射、皮下注射、肌肉注射、局部封闭注射的操作流程，常见问题的处理方法，输液泵、加热垫的使用方法，注射室的消毒流程',
            person: '助理\n' +
                '执业兽医师\n',
        },
        {
            key: '11',
            name: '手术准备室',
            function: '包括术前对宠物进行麻前给药、注射麻醉、吸入麻醉的流程，保定、剃毛、消毒的流程，常见手术器械的介绍，手术器械包的准备、灭菌流程，手术人员的消毒、穿戴手术衣流程等。',
            person: '助理\n' +
                '执业兽医师\n',
        },
        {
            key: '12',
            name: '手术室',
            function: '包括手术室的布局介绍，手术室消毒流程，手术无菌要求，常规手术、特殊手等的操作规范',
            person: '执业兽医师',
        },
        {
            key: '13',
            name: '住院部',
            function: '包括对需要住院的病例进行护理分级，不同护理级别的要求，住院部的工作流程，住院部的消毒流程等',
            person: '住院执业兽医师或助理执业兽医师',
        },
        {
            key: '14',
            name: '病理剖检室',
            function: '包括对病死动物剖解的流程，病理剖检室的消毒流程，病历剖检过程的人员要求，病理剖检过程中的人道关怀',
            person: '执业兽医师',
        },
    ];

    return (
        <Space direction="vertical"
               size="middle"
               style={{
                   display: 'flex',
               }}>
            <Button size="middle" href={"http://localhost:3030/test.html"}>3D导览</Button>
        <Table columns={columns} dataSource={data}/>
        </Space>
    );
}

// GuideShow.propTypes = {
//     setKeshiView: propTypes.func,
//     setKeshiDetail: propTypes.func
// };