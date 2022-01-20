import SettingsForm from 'components/pages/Settings/SettingsForm';
import EmployeeLayout from 'components/shared/Layout/EmployeeLayout';
import Text from "components/uikit/Text";
import React from 'react';

export default function EmployeeSettings() {
  return (
    <EmployeeLayout>
      <Text tag="h1">Settings</Text>

      <SettingsForm />
    </EmployeeLayout>
  );
}
