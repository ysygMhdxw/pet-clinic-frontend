import PropTypes from 'prop-types';
import { ContextString } from '../utils/enums';
import { CaseLearning } from './caseLearning';


export const ContextComponents = (props) => {
    if (props.contextString == ContextString.caseLearning) {
        return (
            <>
                <CaseLearning />
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
    contextString: PropTypes.string
};