import React from "react";
import { useNavigate } from 'react-router-dom';

import Routes from 'lib/Routes';

import useCurrentAuth from 'hooks/useCurrentAuth';
import useLogout from "hooks/useLogout";

import Loader from "components/atoms/Loader";
import Text from "components/atoms/Text";

import "./BaseLayout.css";

interface IProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function BaseLayout({ sidebar, children }: IProps) {
  const currentAuth = useCurrentAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const [isLogoutInProgress, setIsLogoutInProgress] = React.useState<boolean>(false);

  if (isLogoutInProgress) return <Loader />;

  const handleLogout = async () => {
    setIsLogoutInProgress(true);
    await logout();
    navigate(Routes.login());
  }

  return (
    <div className="base-layout">
      <div className="base-layout__sidebar">
        <div>
          {sidebar}
        </div>

        <div>
          <Text tag="span">{currentAuth.user.name} [{currentAuth.user.role}]</Text>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="base-layout__content">{children}</div>
    </div>
  );
}
