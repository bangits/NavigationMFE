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
  const checkIfLocation = useCallback((url: string) => location.pathname === url, [location]);

  return (
    <DesignSystemSidebar
      defaultClosed={true}
      position='static'
      menuItems={[
        {
          label: 'Game Management',
          // onClick: createRedirectHandler('/game/'),
          icon: <Icons.HomeIcon />,
          isActive: checkIfLocationIncludes('/game/') || checkIfLocation('/'),
          subItems: [
            {
              label: 'Game',
              onClick: createRedirectHandler('/game/')
            },
            {
              label: 'Providers',
              onClick: createRedirectHandler('/game/providers')
            }
          ]
        },
        {
          label: 'Partners',
          onClick: createRedirectHandler('/partners/'),
          icon: <Icons.HomeIcon />,
          isActive: checkIfLocationIncludes('/partners')
        }
      ]}
      collapsedWidth={7.2}
      width={24}
    />
  );
};
