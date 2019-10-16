import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './styles';
import Header from '../../../components/Header';

export default function Default({ children }) {
  return (
    <>
      <Wrapper>
        <Header />
        {children}
      </Wrapper>
    </>
  );
}

Default.propTypes = {
  children: PropTypes.element.isRequired,
};
