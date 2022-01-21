import useLogin from 'hooks/useLogin';
import { db } from 'lib/API';
import React from "react";
import Text from "components/atoms/Text";
import Loader from "components/atoms/Loader";
import { useNavigate } from "react-router-dom";
import { UserRoleType } from 'types/api/user';

const { users } = db;

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();
  const [isLoginInProgress, setIsLoginInProgress] = React.useState<boolean>(false);

  if (isLoginInProgress) return <Loader />;

  const handleLogin = async (role: UserRoleType) => {
    setIsLoginInProgress(true);
    await login(role);
    navigate("/");
  };

  const client = users.find(({ role }) => role === 'client');
  const employee = users.find(({ role }) => role === 'employee');
  const owner = users.find(({ role }) => role === 'owner');

  return (
    <div style={{ textAlign: "center" }}>
      <Text tag="h1">Login:</Text>

      {(client && employee && owner) && (
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
      )}
    </div>
  );
}
