import { useState } from 'react';

interface ConnectFunction {
  (username: string, token: string): void;
}

interface AuthFormProps {
  connect: ConnectFunction;
}

const AuthForm = ({ connect }: AuthFormProps) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  return (
    <form>
      <div className="form-group">
        <label htmlFor="username">Github Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="token">Github Auth Token:</label>
        <input
          type="password"
          name="token"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>

      <div className="form-group">
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();

            connect(username, token);
          }}
        >
          Connect
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
