import React, { useState, useEffect, createContext, useCallback } from 'react';
import { isObjectRecord } from '../../common/utilities/types';
import { getLocalCookieValue } from '../../common/utilities/functions';

type nameRoleTokenLoad = {
  username: string;
  role: string;
  active: boolean;
  load: boolean;
};

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<nameRoleTokenLoad | undefined>(undefined);

export const AuthProvider = ({ children }: IProps): React.JSX.Element => {
  const [contextData, setContextData]
  = useState<nameRoleTokenLoad | undefined>(undefined);
  const [load, setLoad] = useState(false);

  const fetchAuthData = useCallback(async() => {
    try {
      if (typeof getLocalCookieValue() !== 'string') {
        return <div />;
      }
      const response = await fetch('http://localhost:3000/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();
      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: AuthContext.tsx');
      }
      if (typeof result.username !== 'string') {
        throw new Error('username variable not type string: AuthContext.tsx');
      }
      if (typeof result.role !== 'string') {
        throw new Error('role variable not type string: AuthContext.tsx');
      }
      if (typeof result.active !== 'boolean') {
        throw new Error('active variable not type boolean: AuthContext.tsx');
      }

      const { username, role, active } = result;
      setLoad(true);

      setContextData({ username, role, active, load });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  }, [load]);

  useEffect(() => {
    fetchAuthData().catch((err) => {
      console.log(err);
    });
  }, [fetchAuthData]);

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
