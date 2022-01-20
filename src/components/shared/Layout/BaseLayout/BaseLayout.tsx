import useCurrentAuth from 'hooks/useCurrentAuth';
import Routes from 'lib/Routes';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSWRConfig } from "swr";
import API from "API";
import Loader from "components/uikit/Loader";
import Text from "components/uikit/Text";
import "components/shared/Layout/BaseLayout/BaseLayout.css";

interface IProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function BaseLayout({ sidebar, children }: IProps) {
  const currentAuth = useCurrentAuth();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const [isLogoutInProgress, setIsLogoutInProgress] = React.useState<boolean>(
    false
  );

  if (isLogoutInProgress) return <Loader />;

  const handleLogout = async () => {
    setIsLogoutInProgress(true);
    await API("POST", "/api/auth", { role: null });
    await mutate('/api/auth', { user: null }, false)
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
