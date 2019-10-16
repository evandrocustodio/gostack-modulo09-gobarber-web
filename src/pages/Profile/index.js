import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { updateProfileRequest } from '../../store/modules/user/actions';
import { logoutSuccess } from '../../store/modules/auth/actions';
import { Container } from './styles';
import AvatarInput from './AvatarInput';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleLogout() {
    dispatch(logoutSuccess());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name='avatar_id' />
        <Input name='name' type='text' placeholder='Nome Completo' />
        <Input name='email' type='email' placeholder='Seu endereço de email' />
        <hr />
        <Input
          name='oldpassword'
          type='password'
          placeholder='Sua Senha Atual'
        />
        <Input name='password' type='password' placeholder='Nova senha' />
        <Input
          name='confirmPassword'
          type='password'
          placeholder='Confirmação da nova senha'
        />
        <button type='submit'>Atualizar Perfil</button>
      </Form>
      <button onClick={handleLogout} type='button'>
        Sair do GoBarber
      </button>
    </Container>
  );
}
