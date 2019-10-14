import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { signInRequest } from '../../store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Email Inválido')
      .required('Email Obrigatório'),
    password: Yup.string()
      .min(6, 'No mínimo 6 caracteres')
      .required('Password Obrigatório'),
  });
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt='Logo' />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name='email' type='email' placeholder='Seu E-mail aqui' />
        <Input
          name='password'
          type='password'
          placeholder='Sua senha secreta'
        />
        <button type='submit'>{loading ? 'Carregando ...' : 'Acessar'}</button>
        <Link to='/register'>Criar Conta</Link>
      </Form>
    </>
  );
}
