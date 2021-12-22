import { redirectToURL, useLocation } from '@atom/common';
import { Icons, Sidebar as DesignSystemSidebar } from '@atom/design-system';
import { useCallback } from 'react';
import { Logo } from '../images';

export const Sidebar = () => {
  const location = useLocation();

  const createRedirectHandler = useCallback(
    (url: string) => () => {
      redirectToURL(url);
    },
    []
  );

  const checkIfLocationIncludes = useCallback((url: string) => location.pathname.includes(url), [location]);
  const checkIfLocation = useCallback(
    (url: string) => location.pathname === url || location.pathname === url + '/' || location.pathname + '/' === url,
    [location]
  );

  return (
    <DesignSystemSidebar
      defaultClosed={true}
      position='static'
      menuItems={[
        {
          label: 'Dashboard',
          onClick: createRedirectHandler('/'),
          icon: <Icons.HomeIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocation('/'),
          subItems: []
        },
        {
          label: 'Partner Management',
          icon: <Icons.PartnersIcon />,
          isActive: checkIfLocationIncludes('/partners/'),
          subItems: [
            {
              label: 'Partners',
              onClick: createRedirectHandler('/partners/'),
              isActive: checkIfLocationIncludes('/partners/')
            }
          ]
        },
        {
          label: 'User Management',
          icon: <Icons.UsersIcon />,
          isActive: checkIfLocationIncludes('/users/'),
          subItems: [
            {
              label: 'Users',
              onClick: createRedirectHandler('/users/'),
              isActive: checkIfLocationIncludes('/users/')
            }
          ]
        },
        {
          label: 'Game Management',
          // onClick: createRedirectHandler('/game/'),
          icon: <Icons.GamesIcon />,
          isActive: checkIfLocationIncludes('/game/'),
          subItems: [
            {
              label: 'Providers',
              onClick: createRedirectHandler('/game/providers'),
              isActive: checkIfLocation('/game/providers')
            },
            {
              label: 'Games',
              onClick: createRedirectHandler('/game/'),
              isActive: checkIfLocation('/game')
            }
          ]
        }
      ]}
      collapsedWidth={7.2}
      width={25}
      logoSrc={Logo}
    />
  );
};
