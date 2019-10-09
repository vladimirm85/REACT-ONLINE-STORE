import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

function LinkButton (props) {
    const {
        history,
        location,
        match,
        staticContext,
        to,
        ...other
    } = props;

    return <button
                {...other}
                onClick={ e => history.push(to)}
            />;
};

LinkButton.propTypes = {
    to: PropTypes.string.isRequired 
}

export default withRouter(LinkButton);