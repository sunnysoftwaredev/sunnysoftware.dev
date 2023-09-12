import React, { Suspense, createContext } from 'react';
import { isObjectRecord } from '../../common/utilities/types';

type nameRoleToken = {
  username: string;
  role: string;
  active: boolean;
};

const AuthContext = createContext<nameRoleToken | undefined>(undefined);
export default AuthContext;

export const AuthProvider = async({ children }: { children: React.ReactNode }):
Promise<React.JSX.Element | undefined> => {
  try {
    const response = await fetch('http://localhost:3000/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin', // if not working try "include"
    });

    const result: unknown = response.json();
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

    const contextData = {
      username,
      role,
      active,
    };

    return (
      // try suspense to solve type issue
      <Suspense fallback={<div>Loading...</div>}>
        <AuthContext.Provider value={contextData}>
          {children}
        </AuthContext.Provider>
      </Suspense>
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
};
