import Layout from "components/organisms/Layout";
import SettingsNavMenu from 'components/molecules/SettingsNavMenu';
import Text from "components/atoms/Text";
import { useLoadUsers } from "hooks/api/users";
import React from 'react';

export default function EmployeesPage() {
  const { users } = useLoadUsers({ role: "employee", includes: ['firm', 'policy'] });

  return (
    <Layout>
      <SettingsNavMenu />

      <Text tag="h1">Employees</Text>

      {users
        ? users.map((user, i) => (
          <div key={user.id}>
            <Text tag="h5">{i + 1}. {user.name}</Text>

            <Text tag="code">Firm name: {user.firm.title}</Text><br />
            <Text tag="code">Can edit: {user.policy.canEdit ? 'yes' : 'no'}</Text>
            <br /><br />
          </div>
          ))
        : "Loading..."}
    </Layout>
  );
}
