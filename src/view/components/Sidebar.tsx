import { AuthenticatedContext, isAdminUser } from '@atom/authorization';
import { redirectToURL, useLocation, useTranslation } from '@atom/common';
import { Icons, Sidebar as DesignSystemSidebar } from '@atom/design-system';
import { useCallback, useContext, useMemo } from 'react';
import { BangitsLogo, KingBetLogo, Logo, QantoApuestasLogo } from '../images';

export const Sidebar = () => {
  const { user } = useContext(AuthenticatedContext);

  const isProvider = [8285, 8286, 8287].includes(+user.userId);
  const isTestUser = [8324].includes(+user.userId);
  const adminUser = isAdminUser(user);

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

  const projectsInformation = useMemo<
    Record<
      string,
      {
        name: string;
        logo: string;
      }
    >
  >(
    () => ({
      1: {
        logo: QantoApuestasLogo,
        name: 'Qanto Apuestas'
      },
      2: {
        logo: BangitsLogo,
        name: 'Bangits'
      },
      3: {
        logo: KingBetLogo,
        name: 'King Bet'
      }
    }),
    []
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
        ...(isProvider || isTestUser || !adminUser
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
        ...(adminUser || isProvider
          ? [
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
              }
            ]
          : []),
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
        },
        ...(!isProvider
          ? [
              {
                label: t.get('playerManagement'),
                // onClick: createRedirectHandler('/players'),
                icon: <Icons.UserIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocation('/players/'),
                subItems: [
                  {
                    label: t.get('players'),
                    onClick: createRedirectHandler('/players'),
                    isActive: checkIfLocationIncludes('/players')
                  }
                ]
              },
              {
                label: t.get('cms'),
                // onClick: createRedirectHandler('/cms'),
                icon: <Icons.CMSIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocationIncludes('/cms/'),
                subItems: [
                  {
                    label: t.get('providersAndGames'),
                    onClick: createRedirectHandler('/cms/providers-games'),
                    isActive: checkIfLocation('/cms/providers-games')
                  }
                ]
              }
            ]
          : []),
        ...(adminUser && !isProvider
          ? [
              {
                label: t.get('translation'),
                onClick: createRedirectHandler('/translations'),
                icon: <Icons.TranslationIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocation('/translations'),
                subItems: []
              }
            ]
          : [])
      ]}
      collapsedWidth={7.2}
      width={25}
      logoSrc={Logo}
      bottomLogoSrc={projectsInformation[user.projectId].logo}
      bottomTitle={projectsInformation[user.projectId].name}
    />
  );
};
