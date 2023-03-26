import propTypes from 'prop-types';
import {ContextString} from '../utils/enums';

import {DepartmentManagement} from "./basicStructureAndFunctionManagement/departmentManagement";
import {CaseLearning} from "./caseStudy/caseLearning";
import {CaseQuestions} from './Test/caseQuestions';
import {MedicineManagement} from "./basicStructureAndFunctionManagement/medicineManagement";
import {VaccineManagement} from "./basicStructureAndFunctionManagement/vaccineManagement";
import {CaseManagement} from "./caseManagement/caseManagement";
import {CaseExam} from './Test/caseExam.js';



export const ContextComponents = (props) => {
    if (props.contextString === ContextString.caseLearning) {
        return (
            <>
                <CaseLearning/>
            </>
        )
    } else if (props.contextString === ContextString.departmentManagement) {
        return <DepartmentManagement/>
    } else if (props.contextString === ContextString.medicineManagement) {
        return <MedicineManagement/>
    } else if (props.contextString === ContextString.vaccineManagement) {
        return <VaccineManagement/>
    }  else if (props.contextString === ContextString.caseManagement) {
        return <CaseManagement/>
    }
    else if (props.contextString === ContextString.takeQuestions) {
        return  <CaseQuestions/>   
    }
    else if (props.contextString === ContextString.takeExam){
        return <CaseExam/>
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