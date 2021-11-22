import { redirectToURL, useLocation } from '@atom/common';
import { Icons, Sidebar as DesignSystemSidebar } from '@atom/design-system';
import { useCallback } from 'react';

export const Sidebar = () => {
  const location = useLocation();

  const createRedirectHandler = useCallback(
    (url: string) => () => {
      redirectToURL(url);
    },
    []
  );

  const checkIfLocationIncludes = useCallback((url: string) => location.pathname.includes(url), [location]);

  return (
    <DesignSystemSidebar
      position='static'
      menuItems={[
        {
          label: 'Providers',
          onClick: createRedirectHandler('/game/providers'),
          icon: <Icons.HomeIcon />,
          isActive: checkIfLocationIncludes('/providers')
        },
        {
          label: 'Players',
          onClick: createRedirectHandler('/players/'),
          icon: <Icons.HomeIcon />,
          isActive: checkIfLocationIncludes('/players')
        }
      ]}
      collapsedWidth={7.2}
      width={21.5}
    />
  );
};