import { AuthenticatedContext } from '@atom/authorization';
import { Dashboard } from '@atom/design-system';
import { useContext } from 'react';
import { Logo } from '../images';

export const DashboardContainer = () => {
  const { user } = useContext(AuthenticatedContext);

  return <Dashboard username={user.email} logoSrc={Logo} />;
};
