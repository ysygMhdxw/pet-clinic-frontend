import {Select, Steps, Card, Image} from 'antd';
import {useCallback, useEffect, useState} from "react";
import propTypes from "prop-types";
import api from "../../api/api";

const {Option} = Select;
const {Step} = Steps;

const jobs = [
    {
        name: '消毒流程',
        picname:"Job A",
        process: [
            {
                title: '关闭手术室门窗',
                description: '确保手术室内环境尽可能无菌',
            },
            {
                title: '进行表面清洁',
                description: '使用清洁剂对手术室进行表面清洁',
            },
            {
                title: '进行彻底消毒',
                description: '使用消毒剂对手术室进行彻底消毒',
            },
            {
                title: '设置空气净化器',
                description: '对手术室内空气进行净化',
            },
            {
                title: '设置紫外线消毒灯',
                description: '对手术室内空气和物品进行紫外线消毒',
            },
            {
                title: '打开手术室门窗',
                description: '进行通风换气',
            }
        ],
    },
    {
        name: '手术准备流程',
        picname:"Job B",
        process: [
            {
                title: '穿戴手术衣',
                description: '确保手术人员穿戴符合规定的手术衣',
            },
            {
                title: '进行手部消毒',
                description: '对手术人员手部进行彻底消毒',
            },
            {
                title: '戴口罩和手套',
                description: '手术人员应戴上口罩和手套',
            },
        ],
    },
];
export const RolePlay = (props) => {
    const [selectedJob, setSelectedJob] = useState(jobs[0]);
    const [currentStep, setCurrentStep] = useState(0);
    const [jobInfo, setJobInfo] = useState(jobs);
    const [roleInfo, setRoleInfo] = useState({role:"",description:""});
    const handleJobChange = (value) => {
        setSelectedJob(jobInfo.find((job) => job.name === value));
        setCurrentStep(0);
    };

    const handleStepChange = (current) => {
        setCurrentStep(current);
    };
    // eslint-disable-next-line no-unused-vars
    const getRoleInfo = useCallback(async () => {
        const res = await api.getRoleInfo(props.roleName)
        if(res){
            const data = res.data
            setRoleInfo({description: data.description, role: data.description})
            setJobInfo(data.jobs)
            console.log(data.jobs)
            console.log(jobInfo)
            console.log(data);
        }
    }, []);
    useEffect(() => {
        getRoleInfo();
    }, [getRoleInfo,props])


    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex',flexDirection:"row", marginTop: 20}}>
                <div style={{marginRight: 10,width:"20%"}}>角色：{props.roleName}</div>
                <div style={{marginLeft: 20}}>角色描述： {roleInfo.description}</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
                <div style={{marginRight: 20}}>选择项目</div>
                <Select defaultValue={selectedJob.name} style={{width: 120}} onChange={handleJobChange}>
                    {jobInfo.map((job) => (
                        <Option key={job.name} value={job.name}>
                            {job.name}
                        </Option>
                    ))}
                </Select>
            </div>
            <div style={{display: 'flex', marginTop: 20}}>
                <div style={{marginRight: 10, width: "40%",}}>
                    <Steps direction="vertical" current={currentStep} onChange={handleStepChange}>
                        {selectedJob.process.map((process) => (
                            <Step key={process.name} title={process.name} description={process.description}/>
                        ))}
                    </Steps>
                </div>
                <Card style={{width: "50%", display: "flex", justifyContent: "center"}}>
                    <Image
                        width={500}
                        src={`https://picsum.photos/seed/${selectedJob.process[currentStep].name}/400/300`}
                    />
                </Card>
            </div>
        </div>
    );
}
RolePlay.propTypes = {
    roleName: propTypes.string
};