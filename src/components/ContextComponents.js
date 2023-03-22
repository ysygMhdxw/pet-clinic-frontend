import propTypes from 'prop-types';
import {ContextString} from '../utils/enums';

import {DepartmentManagement} from "./basicStructureAndFunctionManagement/departmentManagement";
import {CaseLearning} from "./caseStudy/caseLearning";
import {CaseQuestions} from './Test/caseQuestions';
import {MedicineManagement} from "./basicStructureAndFunctionManagement/medicineManagement";
import {VaccineManagement} from "./basicStructureAndFunctionManagement/vaccineManagement";


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
    } else if (props.contextString == ContextString.takeQuestions) {
        return (
            <>
                <CaseQuestions/>
            </>
        )
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