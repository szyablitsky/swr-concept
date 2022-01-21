import useCurrentAuth from 'hooks/useCurrentAuth';
import React, { Suspense } from "react";
import Loader from "components/atoms/Loader";

const ClientLayout = React.lazy(() => import("components/organisms/Layout/ClientLayout"));
const EmployeeLayout = React.lazy(() => import("components/organisms/Layout/EmployeeLayout"));
const OwnerLayout = React.lazy(() => import("components/organisms/Layout/OwnerLayout"));

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  const { user } = useCurrentAuth();

  const mapRoleToComponent = {
    client: ClientLayout,
    employee: EmployeeLayout,
    owner: OwnerLayout
  };

  const Layout = mapRoleToComponent[user.role];

  return (
    <Suspense fallback={<Loader />}>
      <Layout>{children}</Layout>
    </Suspense>
  );
}
