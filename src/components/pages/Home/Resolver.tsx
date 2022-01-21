import { useLoadCurrentAuth } from 'hooks/api/auth';
import Routes from 'lib/Routes';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from 'components/pages/Home/Home';

export default function Resolver() {
  const { currentAuth: { user } } = useLoadCurrentAuth();

  if (user) return <Home />;

  return <Navigate to={Routes.login()} />
}
