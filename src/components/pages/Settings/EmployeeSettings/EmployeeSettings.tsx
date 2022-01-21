import ProfileForm from 'components/organisms/ProfileForm';
import EmployeeLayout from 'components/organisms/Layout/EmployeeLayout';
import Text from "components/atoms/Text";
import React from 'react';

export default function EmployeeSettings() {
  return (
    <EmployeeLayout>
      <Text tag="h1">Settings</Text>

      <ProfileForm />
    </EmployeeLayout>
  );
}
