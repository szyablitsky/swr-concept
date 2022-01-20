import SettingsForm from 'components/pages/Settings/SettingsForm';
import ClientLayout from "components/shared/Layout/ClientLayout";
import Text from "components/uikit/Text";
import React from 'react';

export default function ClientSettings() {
  return (
    <ClientLayout>
      <Text tag="h1">Settings</Text>

      <SettingsForm />
    </ClientLayout>
  );
}
