import { useLoadCurrentAuth } from 'hooks/api/auth';
import Routes from 'lib/Routes';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Clients from './Clients';


export default function Resolver() {
  const { currentAuth: { user } } = useLoadCurrentAuth();

  if (user?.role === 'employee' || user?.role === 'owner') return <Clients />;

  return <Navigate to={Routes.login()} />
}
