import PropTypes from 'prop-types';
import { ContextString } from '../utils/enums';
import { CaseManagement } from './caseManagement';


export const ContextComponents = (props) => {
    if (props.contextString == ContextString.caseLearning) {
        return (
            <>
                <CaseManagement />
            </>
        )
    }

    return (
        <>
            context
        </>)

}

ContextComponents.propTypes = {
    contextString: PropTypes.string
};