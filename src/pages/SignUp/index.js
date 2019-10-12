import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt='Logo' />
      <form>
        <input placeholder='Nome Completo' />
        <input type='email' placeholder='Seu E-mail' />
        <input type='password' placeholder='Sua senha secreta' />
        <button type='submit'>Criar Conta</button>
        <Link to='/'>Já tenho conta</Link>
      </form>
    </>
  );
}
