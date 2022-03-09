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
        <div className="base-layout__sidebar-logo">
          <svg height="12" viewBox="0 0 291 69" fill="none">
            <path d="M0 36.53c.07 17.6 14.4 32.01 32.01 32.01a32.05 32.05 0 0032.01-32V32a13.2 13.2 0 0123.4-8.31h20.7A32.07 32.07 0 0077.2 0a32.05 32.05 0 00-32 32.01v4.52A13.2 13.2 0 0132 49.71a13.2 13.2 0 01-13.18-13.18 3.77 3.77 0 00-3.77-3.77H3.76A3.77 3.77 0 000 36.53zM122.49 68.54a32.14 32.14 0 01-30.89-23.7h20.67a13.16 13.16 0 0023.4-8.3V32A32.05 32.05 0 01167.68 0c17.43 0 31.64 14 32 31.33l.1 5.2a13.2 13.2 0 0023.4 8.31h20.7a32.07 32.07 0 01-30.91 23.7c-17.61 0-31.94-14.42-32.01-32l-.1-4.7v-.2a13.2 13.2 0 00-13.18-12.81 13.2 13.2 0 00-13.18 13.18v4.52a32.05 32.05 0 01-32.01 32.01zM247.94 23.7a13.16 13.16 0 0123.4 8.31 3.77 3.77 0 003.77 3.77h11.3a3.77 3.77 0 003.76-3.77A32.05 32.05 0 00258.16 0a32.07 32.07 0 00-30.92 23.7h20.7z" fill="currentColor" />
          </svg>
          <span className="base-layout__sidebar-logo__title">SWR</span>
        </div>

        <div className="base-layout__sidebar-nav">
          {sidebar}
        </div>

        <div className="base-layout__sidebar-footer">
          <Text tag="span">{currentAuth.user.name} [{currentAuth.user.role}]</Text>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="base-layout__content">{children}</div>
    </div>
  );
}
