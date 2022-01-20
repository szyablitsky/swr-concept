import { useLoadCurrentAuth } from 'hooks/api/auth';
import Routes from 'lib/Routes';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Employees from './Employees';

export default function Resolver() {
  const { currentAuth: { user } } = useLoadCurrentAuth();

  if (user?.role === 'owner') return <Employees />;

  return <Navigate to={Routes.login()} />
}
