import { AuthenticatedContext } from '@atom/authorization';
import { Dashboard } from '@atom/design-system';
import { useContext } from 'react';

export const DashboardContainer = () => {
  const { user } = useContext(AuthenticatedContext);

  return <Dashboard username={user.email} />;
};
