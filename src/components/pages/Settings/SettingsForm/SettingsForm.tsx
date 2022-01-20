import API from 'API';
import useCurrentAuth from 'hooks/useCurrentAuth';
import React, { useState } from 'react';
import { useSWRConfig } from "swr";


export default function SettingsForm() {
  const { user } = useCurrentAuth();
  const { mutate } = useSWRConfig();
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const fields = { id: user.id, name, email };

    const updatedUser = await API('PATCH', '/api/users', fields);
    mutate('/api/auth', { user: updatedUser }, false);

    setIsLoading(false);
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input type="text" value={name} onChange={handleNameChange} />
      <label>Email: </label>
      <input type="text" value={email} onChange={handleEmailChange} />
      <p>
        <input type="submit" disabled={isLoading} value={isLoading ? 'Loading' : 'Apply'} />
      </p>
    </form>
  );
}
