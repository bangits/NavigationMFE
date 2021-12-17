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
          label: 'Partner Management',
          icon: <Icons.PartnersIcon />,
          isActive: checkIfLocationIncludes('/partners/') || checkIfLocation('/'),
          subItems: [
            {
              label: 'Partners',
              onClick: createRedirectHandler('/partners/')
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
              onClick: createRedirectHandler('/users/')
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
              label: 'Games',
              onClick: createRedirectHandler('/game/')
            },
            {
              label: 'Providers',
              onClick: createRedirectHandler('/game/providers')
            }
          ]
        }
      ]}
      collapsedWidth={7.2}
      width={24}
      logoSrc='https://www.tattooforaweek.com/files/modules/products/5135/photos/full_the-atom-tattoonie-temporary-tattoo-s.jpg?v=0'
    />
  );
};
