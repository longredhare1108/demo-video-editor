import React from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate  } from 'react-router-dom';
import { connect } from 'react-redux';

// UserRoute is used to render UI with authentication.
const UserRoute = ({ name, isAuthenticated, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => isAuthenticated ? <Component {...props} /> : <Navigate  to='/' />} />
        );
}

UserRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps, {  })(UserRoute);