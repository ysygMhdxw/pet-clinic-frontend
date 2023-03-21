import propTypes from 'prop-types';
import { ContextString } from '../utils/enums';
import { CaseLearning } from './caseLearning';
import { CaseQuestions } from './Test/caseQuestions';


export const ContextComponents = (props) => {
    if (props.contextString == ContextString.caseLearning) {
        return (
            <>
                <CaseLearning />
            </>
        )
    }
    else if (props.contextString == ContextString.takeQuestions){
        return(
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