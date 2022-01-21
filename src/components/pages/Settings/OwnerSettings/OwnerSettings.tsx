import SettingsForm from 'components/organisms/ProfileForm';
import OwnerLayout from 'components/organisms/Layout/OwnerLayout';
import SettingsNavMenu from 'components/molecules/SettingsNavMenu';
import Text from "components/atoms/Text";
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
