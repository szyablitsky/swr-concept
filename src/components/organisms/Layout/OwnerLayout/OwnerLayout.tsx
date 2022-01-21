import Badge from 'components/atoms/Badge';
import useNewMessagesCount from 'hooks/useNewMessagesCount';
import Routes from 'lib/Routes';
import React from "react";
import { Link } from "react-router-dom";

import Text from "components/atoms/Text";
import BaseLayout from "components/organisms/Layout/BaseLayout";

interface IProps {
  children: React.ReactNode;
}

export default function OwnerLayout({ children }: IProps) {
  const newMessageCount = useNewMessagesCount();

  const sidebar = (
    <>
      <Text color="white">
        <Link to={Routes.home()}>Home</Link>
      </Text>
      <Text color="white">
        <Link to={Routes.messages()}>Messages{newMessageCount ? <Badge>{newMessageCount}</Badge> : null}</Link>
      </Text>
      <Text color="white">
        <Link to={Routes.clients()}>Clients</Link>
      </Text>
      <Text color="white">
        <Link to={Routes.settings()}>Settings</Link>
      </Text>
    </>
  );

  return <BaseLayout sidebar={sidebar}>{children}</BaseLayout>;
}
