import PropTypes from 'prop-types';
import { ContextString } from '../utils/enums';

ContextComponents.propTypes = {
    contextString: PropTypes.String
};
export const ContextComponents = (props) => {
    if (props.contextString == ContextString.caseManagement) {
        return (
            <>

            </>
        )
    }

}