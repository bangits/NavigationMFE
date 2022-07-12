/* eslint-disable @typescript-eslint/ban-ts-comment */
import { historyService, useLocation, useTranslation } from '@atom/common';
import { Icons, Sidebar as DesignSystemSidebar } from '@atom/design-system';
import { useCallback } from 'react';
import { Logo } from '../images';

export const Sidebar = () => {
  const location = useLocation();
  const t = useTranslation();

  const createRedirectHandler = useCallback(
    (url: string) => () => {
      historyService.redirectToURL(url);
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
        },
        {
          label: t.get('gameManagement'),
          // onClick: createRedirectHandler('/game/'),
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
        {
          label: t.get('playerManagement'),
          icon: <Icons.UserIcon />,
          isActive: checkIfLocationIncludes('/players/'),
          subItems: [
            {
              label: t.get('players'),
              onClick: createRedirectHandler('/players'),
              isActive: checkIfLocationIncludes('/players')
            }
          ]
        },
        {
          label: t.get('reportManagement'),
          // onClick: createRedirectHandler('/game/'),
          icon: <Icons.ReportsIcon />,
          isActive: checkIfLocationIncludes('/reports/'),
          subItems: [
            {
              label: t.get('providers'),
              onClick: createRedirectHandler('/reports/providers'),
              isActive: checkIfLocation('/reports/providers')
            },
            {
              label: t.get('players'),
              onClick: createRedirectHandler('/reports/players'),
              isActive: checkIfLocation('/reports/players')
            },
            {
              label: t.get('games'),
              onClick: createRedirectHandler('/reports/games'),
              isActive: checkIfLocation('/reports/games')
            }
          ]
        },
        {
          label: t.get('cms'),
          icon: <Icons.CMSIcon />,
          isActive: checkIfLocationIncludes('/cms/'),
          subItems: [
            {
              label: t.get('website'),
              onClick: createRedirectHandler('/cms/website'),
              isActive: checkIfLocationIncludes('/cms/website')
            },
            {
              label: t.get('providersAndGames'),
              onClick: createRedirectHandler('/cms/providers-games'),
              isActive: checkIfLocationIncludes('/cms/providers-games')
            },
            {
              label: t.get('sliderAndBanners'),
              onClick: createRedirectHandler('/cms/slider-and-banners'),
              isActive: checkIfLocationIncludes('/cms/slider-and-banners')
            },
            {
              label: t.get('gameCategories'),
              onClick: createRedirectHandler('/cms/game-categories'),
              isActive: checkIfLocationIncludes('/cms/game-categories')
            },
            {
              label: t.get('pages'),
              onClick: createRedirectHandler('/cms/pages'),
              isActive: checkIfLocationIncludes('/cms/pages')
            },
            {
              label: t.get('labels'),
              onClick: createRedirectHandler('/cms/labels'),
              isActive: checkIfLocationIncludes('/cms/labels')
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
