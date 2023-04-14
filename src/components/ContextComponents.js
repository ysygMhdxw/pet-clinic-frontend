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
import {TestManagement} from "./caseTestManagement/testManagement";
import {RolePlay} from "./rolePlay/rolePlay";
import {UserCenter} from "./userCenter/userCenter";


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
    } else if (props.contextString === ContextString.testManagement) {
        return <TestManagement/>
    } else if (props.contextString == ContextString.fontDesk || props.contextString == ContextString.physicianAssistant || props.contextString == ContextString.veterinarians) {
        return <RolePlay roleName={props.contextString}/>
    }
    return (
        <>
            context
        </>
    )

}

ContextComponents.propTypes = {
    contextString: propTypes.string
};