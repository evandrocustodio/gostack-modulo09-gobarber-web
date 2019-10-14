import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { signUpRequest } from '../../store/modules/auth/actions';

export default function SignUp() {
  const dispatch = useDispatch();
  const schema = Yup.object().shape({
    name: Yup.string().required('Informe Um Nome'),
    email: Yup.string()
      .email('Email Inválido')
      .required('Email Obrigatório'),
    password: Yup.string().required('Password Obrigatório'),
  });

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt='Logo' />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name='name' type='text' placeholder='Nome Completo' />
        <Input name='email' type='email' placeholder='Seu E-mail' />
        <Input
          name='password'
          type='password'
          placeholder='Sua senha secreta'
        />
        <button type='submit'>Criar Conta</button>
        <Link to='/'>Já tenho conta</Link>
      </Form>
    </>
  );
}
