import Layout from "components/organisms/Layout";
import Text from "components/atoms/Text";
import { useLoadUsers } from "hooks/api/users";
import React, { useState } from 'react';

export default function ClientsPage() {
  const [name, setName] = useState<string>('');
  const { users } = useLoadUsers({ role: "client", q: name });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);

  return (
    <Layout>
      <Text tag="h1">Clients</Text>

      <label>Name: </label>
      <input type="text" value={name} onChange={handleNameChange} />


        {users ? users.map((user, i) => (
          <Text key={user.id}>{i + 1}. {user.name}</Text>
        )) : <div style={{ margin: '12px 0'}}>Loading...</div>}
    </Layout>
  );
}
