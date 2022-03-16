import { AuthenticatedContext } from '@atom/authorization';
import { redirectToURL, useLocation, useTranslation } from '@atom/common';
import { Icons, Sidebar as DesignSystemSidebar } from '@atom/design-system';
import { useCallback, useContext } from 'react';
import { Logo } from '../images';

export const Sidebar = () => {
  const { user } = useContext(AuthenticatedContext);

  const isProvider = [8285, 8286, 8287].includes(user.userId);

  const location = useLocation();
  const t = useTranslation();

  const createRedirectHandler = useCallback(
    (url: string) => () => {
      // historyService.redirectToURL(url);
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
          label: t.get('dashboard'),
          onClick: createRedirectHandler('/'),
          icon: <Icons.HomeIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocation('/'),
          subItems: []
        },
        ...(isProvider
          ? []
          : [
              {
                label: t.get('partnerManagement'),
                icon: <Icons.PartnersIcon />,
                isActive: checkIfLocationIncludes('/partners/'),
                subItems: [
                  {
                    label: t.get('partners'),
                    onClick: createRedirectHandler('/partners/'),
                    isActive: checkIfLocationIncludes('/partners/')
                  }
                ]
              },
              {
                label: t.get('userManagement'),
                icon: <Icons.UsersIcon />,
                isActive: checkIfLocationIncludes('/users/'),
                subItems: [
                  {
                    label: t.get('users'),
                    onClick: createRedirectHandler('/users/'),
                    isActive: checkIfLocationIncludes('/users/')
                  }
                ]
              }
            ]),
        {
          label: t.get('gameManagement'),
          icon: <Icons.GamesIcon />,
          isActive: checkIfLocationIncludes('/game/'),
          subItems: [
            {
              label: t.get('providers'),
              onClick: createRedirectHandler('/game/providers'),
              isActive: checkIfLocation('/game/providers')
            },
            {
              label: t.get('games'),
              onClick: createRedirectHandler('/game/'),
              isActive: checkIfLocation('/game')
            }
          ]
        },
        ...(isProvider
          ? []
          : [
              {
                label: t.get('betReports'),
                icon: <Icons.ReportsIcon />,
                isActive: checkIfLocationIncludes('/reports/'),
                subItems: [
                  {
                    label: t.get('reportByProviders'),
                    onClick: createRedirectHandler('/reports/providers'),
                    isActive: checkIfLocation('/reports/providers')
                  },
                  {
                    label: t.get('reportByPlayers'),
                    onClick: createRedirectHandler('/reports/players'),
                    isActive: checkIfLocation('/reports/players')
                  },
                  {
                    label: t.get('reportByGames'),
                    onClick: createRedirectHandler('/reports/games'),
                    isActive: checkIfLocation('/reports/games')
                  }
                ]
              }
            ])
      ]}
      collapsedWidth={7.2}
      width={25}
      logoSrc={Logo}
    />
  );
};
