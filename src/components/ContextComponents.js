import propTypes from 'prop-types';
import {ContextString} from '../utils/enums';

import {DepartmentManagement} from "./basicStructureAndFunctionManagement/departmentManagement";
import {MedicineManagement} from "./basicStructureAndFunctionManagement/medicineManagement";
import {VaccineManagement} from "./basicStructureAndFunctionManagement/vaccineManagement";
import {CaseManagement} from "./caseManagement/caseManagement";
import {CaseLearning} from "./caseStudy/caseLearning";
import {CaseExam} from './Test/caseExam.js';
import {CaseQuestions} from './Test/caseQuestions';
import {UserManagement} from "./personnelManagement/userManagement";
import { QuestionManagement } from "./caseTestManagement/questionManagement";
import { QuizManagement } from './caseTestManagement/quizManagement';
import {RolePlay} from "./rolePlay/rolePlay";
import {UserCenter} from "./userCenter/userCenter";
import {GuideShow} from "./guideShow/guideShow";
import {InstrumentManagement} from "./basicStructureAndFunctionManagement/instrumentManagement";
import {CheckUpManagement} from "./basicStructureAndFunctionManagement/checkupManagement";
import {Hospitalization} from "./basicStructureAndFunctionManagement/hospitalization";

export const ContextComponents = (props) => {
    if(props.contextString===ContextString.userCenter){
        return <UserCenter/>
    }
    else if (props.contextString === ContextString.caseLearning) {
        return <CaseLearning/>
    } else if (props.contextString === ContextString.departmentManagement) {
        return <DepartmentManagement/>
    } else if (props.contextString === ContextString.medicineManagement) {
        return <MedicineManagement/>
    } else if (props.contextString === ContextString.vaccineManagement) {
        return <VaccineManagement/>
    } else if (props.contextString === ContextString.caseManagement) {
        return <CaseManagement/>
    } else if (props.contextString === ContextString.takeQuestions) {
        return <CaseQuestions/>
    } else if (props.contextString === ContextString.takeExam) {
        return <CaseExam/>
    } else if (props.contextString === ContextString.userManagement) {
        return <UserManagement/>
    }
    else if(props.contextString === ContextString.questionManagement){
        return <QuestionManagement/>
    }
    else if(props.contextString === ContextString.quizManagement){
        return <QuizManagement/>
    } 
    else if (props.contextString == ContextString.fontDesk || props.contextString == ContextString.physicianAssistant || props.contextString == ContextString.veterinarians) {
        return <RolePlay roleName={props.contextString}/>
    }
    else if(props.contextString === ContextString.guide3dShow){
        return <GuideShow/>
    }
    else if(props.contextString === ContextString.fileManagement){
        return "诶呀！有这个东西吗"
    }
    else if(props.contextString === ContextString.instrumentManagement){
        return <InstrumentManagement/>
    }
    else if(props.contextString===ContextString.hospitalizationManagement){
        return <Hospitalization/>
    }
    else if(props.contextString===ContextString.checkupManagement){
        return <CheckUpManagement/>
    }
    return (
        <>
            欢迎来到我们的网站
        </>
    )

}

ContextComponents.propTypes = {
    contextString: propTypes.string
};