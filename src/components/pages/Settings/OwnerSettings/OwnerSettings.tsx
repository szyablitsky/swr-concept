import SettingsForm from 'components/pages/Settings/SettingsForm';
import OwnerLayout from 'components/shared/Layout/OwnerLayout';
import SettingsNavMenu from 'components/shared/SettingsNavMenu';
import Text from "components/uikit/Text";
import React from 'react';

export default function OwnerSettings() {
  return (
    <OwnerLayout>
      <SettingsNavMenu />

      <Text tag="h1">Settings</Text>

      <SettingsForm />
    </OwnerLayout>
  );
}
