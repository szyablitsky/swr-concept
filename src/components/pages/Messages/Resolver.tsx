import { useLoadCurrentAuth } from 'hooks/api/auth';
import Routes from 'lib/Routes';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Messages from './Messages';

export default function Resolver() {
  const { currentAuth: { user } } = useLoadCurrentAuth();

  if (user) return <Messages />;

  return <Navigate to={Routes.login()} />
}
