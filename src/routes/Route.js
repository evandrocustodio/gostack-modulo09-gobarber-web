import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import AuthLayout from '../pages/_layouts/auth/';
import DefaultLayout from '../pages/_layouts/default';

export default function RouterWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signIn = false;

  const Layout = signIn ? DefaultLayout : AuthLayout;

  if (!signIn && isPrivate) {
    return <Redirect to='/' />;
  }
  if (signIn && !isPrivate) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouterWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouterWrapper.defaultProps = {
  isPrivate: false,
};
