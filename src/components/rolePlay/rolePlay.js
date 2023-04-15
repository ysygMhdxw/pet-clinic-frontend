import {Select, Steps, Card, Image} from 'antd';
import {useEffect, useState} from "react";
import propTypes from "prop-types";
import api from "../../api/api";

const {Option} = Select;
const {Step} = Steps;

const jobs = [
    {
        name: '',
        process: [
            {
                name: '',
                description: '',
            }
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
    const getRoleInfo = (async () => {
        let roleId=1;
        if(props.roleName==="前台"){
            roleId = 1
        }
        else if(props.roleName==="医助"){
            roleId = 2
        }
        else roleId=3
        const res = await api.getRoleInfo(roleId)
        if(res){
            const data = res.data
            setRoleInfo({description: data.description, role: data.role})
            setSelectedJob(data.jobs[0])
            setJobInfo(data.jobs)
            setCurrentStep(0)
            console.log(data.jobs)
            console.log(jobInfo)
            console.log(data);
        }
    });
    useEffect(() => {
        console.log(props.roleName)
        getRoleInfo();
    }, [props])


    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex',flexDirection:"row", marginTop: 20}}>
                <div style={{marginRight: 10,width:"20%"}}>角色：{props.roleName}</div>
                <div style={{marginLeft: 20}}>角色描述： {roleInfo.description}</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
                <div style={{marginRight: 20}}>选择项目</div>
                <Select value={selectedJob.name} style={{width: 120}} onChange={handleJobChange}>
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
                    { selectedJob.process[currentStep].name?
                    <Image
                        width={500}
                        src={`https://picsum.photos/seed/${selectedJob.process[currentStep].name}/400/300`}
                    />:""
                }

                </Card>
            </div>
        </div>
    );
}
RolePlay.propTypes = {
    roleName: propTypes.string
};