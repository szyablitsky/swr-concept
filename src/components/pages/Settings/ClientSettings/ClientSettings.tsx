import ProfileForm from 'components/organisms/ProfileForm';
import ClientLayout from "components/organisms/Layout/ClientLayout";
import Text from "components/atoms/Text";
import React from 'react';

export default function ClientSettings() {
  return (
    <ClientLayout>
      <Text tag="h1">Settings</Text>

      <ProfileForm />
    </ClientLayout>
  );
}
