import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import * as Yup from 'yup';

export default function SignUp() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Email Inválido')
      .required('Email Obrigatório'),
    password: Yup.string().required('Password Obrigatório'),
  });
  function handleSubmit(data) {
    console.log(data);
  }
  return (
    <>
      <img src={logo} alt='Logo' />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name='name' placeholder='Nome Completo' />
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
