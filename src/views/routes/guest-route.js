import React from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate  } from 'react-router-dom';
import { connect } from 'react-redux';

// GuestRoute is used to render UI without authentication.
const GuestRoute = ({ isAuthenticated, element: Element, ...rest }) => {
    return (
        <Route {...rest} render={props => !isAuthenticated ? <Element {...props} /> : <Navigate  to='/dashboard' />} />
    );
}

GuestRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps)(GuestRoute);