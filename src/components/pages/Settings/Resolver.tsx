import LoadablePage from 'components/uikit/LoadablePage';
import { useLoadCurrentAuth } from 'hooks/api/auth';
import Routes from 'lib/Routes';
import React from 'react';
import { Navigate } from 'react-router-dom';

const ClientSettings = React.lazy(() => import('components/pages/Settings/ClientSettings'));
const EmployeeSettings = React.lazy(() => import('components/pages/Settings/EmployeeSettings'));
const OwnerSettings = React.lazy(() => import('components/pages/Settings/OwnerSettings'));

export default function Resolver() {
  const { currentAuth: { user } } = useLoadCurrentAuth();

  if (user?.role === 'client') return <LoadablePage component={ClientSettings} />;
  if (user?.role === 'employee') return <LoadablePage component={EmployeeSettings} />;
  if (user?.role === 'owner') return <LoadablePage component={OwnerSettings} />;

  return <Navigate to={Routes.login()} />
}
