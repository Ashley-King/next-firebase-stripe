import {createContext, useContext} from 'react';
import useFirebaseAuth from '../lib/useFirebaseAuth';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOutUser: async () => {},
});

export function AuthUserProvider({children}) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>
      {children}
    </authUserContext.Provider>
  );
  }

  export const useAuthUser = () => useContext(authUserContext);