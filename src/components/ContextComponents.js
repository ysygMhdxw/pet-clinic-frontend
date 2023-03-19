import propTypes from 'prop-types';
import { ContextString } from '../utils/enums';
import {CaseLearning} from "./caseStudy/caseLearning";
import {DepartmentManagement} from "./basicStructureAndFunctionManagement/departmentManagement";



export const ContextComponents = (props) => {
    if (props.contextString === ContextString.caseLearning) {
        return (
            <>
                <CaseLearning />
            </>
        )
    }
    else if(props.contextString===ContextString.departmentManagement){
        return <DepartmentManagement/>
    }
    else if(props.contextString===ContextString.personnelManagement){
        // return <TestComponents/>
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