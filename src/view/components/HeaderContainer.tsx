import { AuthenticatedContext, oidcService } from '@atom/authorization';
import { useCallback, useContext } from 'react';
import { Header } from './Header';

export const HeaderContainer = () => {
  const { user } = useContext(AuthenticatedContext);

  const onLogOut = useCallback(() => {
    oidcService.logOut();
  }, []);

  return <Header username={user.email} onLogOut={onLogOut} />;
};
