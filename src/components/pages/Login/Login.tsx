import { useLoadUsers } from 'hooks/api/users';
import React from "react";
import Text from "components/uikit/Text";
import Loader from "components/uikit/Loader";
import API from "API";
import { useSWRConfig } from "swr";
import { useNavigate } from "react-router-dom";
import { UserRoleType } from 'types/api/user';

export default function LoginPage() {
  const { users = [], isValidating } = useLoadUsers();
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const [isLoginInProgress, setIsLoginInProgress] = React.useState<boolean>(false);

  if (isLoginInProgress) return <Loader />;

  const handleLogin = async (role: UserRoleType) => {
    setIsLoginInProgress(true);

    const currentAuth = await API("POST", "/api/auth", { role });

    await mutate("/api/auth", currentAuth, false);
    await mutate("/api/notifications");
    navigate("/");
  };

  const client = users.find(({ role }) => role === 'client');
  const employee = users.find(({ role }) => role === 'employee');
  const owner = users.find(({ role }) => role === 'owner');

  return (
    <div style={{ textAlign: "center" }}>
      <Text tag="h1">Login:</Text>

      {(client && employee && owner) && !isValidating ? (
        <>
          <p>
            <button onClick={() => handleLogin("client")}>{client.name} [{client.role}]</button>
          </p>
          <p>
            <button onClick={() => handleLogin("employee")}>{employee.name} [{employee.role}]</button>
          </p>
          <p>
            <button onClick={() => handleLogin("owner")}>{owner.name} [{owner.role}]</button>
          </p>
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
}
