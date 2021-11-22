import { oidcService, OidcUser } from '@atom/authorization';
import { useCallback, useEffect, useState } from 'react';
import { Header } from './Header';

export const HeaderContainer = () => {
  const [user, setUser] = useState<OidcUser>(null);

  const onLogOut = useCallback(() => {
    oidcService.logOut();
  }, []);

  useEffect(() => {
    oidcService.getUser().then(setUser);
  }, []);

  if (!user) return null;

  return <Header username={user.profile.name} onLogOut={onLogOut} />;
};
