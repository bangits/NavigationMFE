import { AuthenticatedContext, isAdminUser } from '@atom/authorization';
import { redirectToURL, useLocation, useTranslation } from '@atom/common';
import { Icons, Sidebar as DesignSystemSidebar } from '@atom/design-system';
import { useCallback, useContext, useMemo } from 'react';
import { BangitsLogo, BetRabbitLogo, KingBetLogo, Logo, QantoApuestasLogo } from '../images';

export const Sidebar = () => {
  const { user } = useContext(AuthenticatedContext);

  const isProvider = [8285, 8286, 8287, 28435].includes(+user.userId);
  const isTestUser = [8324].includes(+user.userId);
  const isCommertionUser = [8365].includes(+user.userId);
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
      },
      5: {
        logo: BetRabbitLogo,
        name: 'Bet Rabbit'
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
          icon: <Icons.DashboardIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocation('/'),
          subItems: []
        },
        ...(!isCommertionUser && (isProvider || isTestUser || !adminUser)
          ? []
          : [
              {
                label: t.get('userManagement'),
                icon: <Icons.UsersIcon />,
                isActive: checkIfLocationIncludes('/users/'),
                subItems: [
                  {
                    label: t.get('users'),
                    onClick: createRedirectHandler('/users/'),
                    isActive: checkIfLocationIncludes('/users/')
                  },
                  ...(isCommertionUser
                    ? [
                        {
                          label: 'Roles',
                          onClick: createRedirectHandler('/users/roles'),
                          isActive: checkIfLocationIncludes('/users/roles')
                        },
                        {
                          label: 'Permissions',
                          onClick: createRedirectHandler('/users/permissions'),
                          isActive: checkIfLocationIncludes('/users/permissions')
                        }
                      ]
                    : [])
                ]
              },
              ...(!isCommertionUser
                ? [
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
                    }
                  ]
                : [])
            ]),
        ...(!isCommertionUser && (adminUser || isProvider)
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
        ...(!isProvider || isCommertionUser
          ? [
              {
                label: t.get('playerManagement'),
                // onClick: createRedirectHandler('/players'),
                icon: <Icons.UserIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocationIncludes('/players/'),
                subItems: [
                  {
                    label: t.get('players'),
                    onClick: createRedirectHandler('/players'),
                    isActive: checkIfLocation('/players')
                  },
                  {
                    label: t.get('segments'),
                    onClick: createRedirectHandler('/segment/players'),
                    isActive: checkIfLocationIncludes('/segment/players')
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
                  },
                  {
                    label: t.get('website'),
                    onClick: createRedirectHandler('/cms/website'),
                    isActive: checkIfLocationIncludes('/cms/website')
                  },
                  {
                    label: t.get('slidersAndBanners'),
                    onClick: createRedirectHandler('/cms/slider-and-banners'),
                    isActive: checkIfLocationIncludes('/cms/slider-and-banners')
                  },
                  {
                    label: t.get('categoriesAndGroups'),
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
            ]
          : []),
        ...(!isProvider
          ? [
              {
                label: t.get('translation'),
                onClick: createRedirectHandler('/translations'),
                icon: <Icons.TranslationIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocation('/translations'),
                subItems: []
              }
            ]
          : []),
        ...(isCommertionUser
          ? [
              {
                label: 'Risk Management',
                onClick: createRedirectHandler('/risks'),
                icon: <Icons.RiskIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocation('/risks'),
                subItems: []
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
            },
            {
              label: t.get('reportByCashInOut'),
              onClick: createRedirectHandler('/reports/transfers'),
              isActive: checkIfLocation('/reports/transfers')
            }
          ]
        },
        ...(isCommertionUser
          ? [
              {
                label: 'Affiliates Management',
                onClick: createRedirectHandler('/affiliates'),
                icon: <Icons.AffilateIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocation('/affiliates'),
                subItems: []
              },
              {
                label: 'Promotional Tools',
                onClick: createRedirectHandler('/promotions'),
                icon: <Icons.PromotionalIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocation('/promotions'),
                subItems: [
                  {
                    label: 'Free bet and Wagering',
                    onClick: createRedirectHandler('/bonuses/wagering'),
                    isActive: checkIfLocationIncludes('/bonuses/wagering')
                  },
                  {
                    label: 'Cashback Bonuses',
                    onClick: createRedirectHandler('/bonuses/cashback'),
                    isActive: checkIfLocationIncludes('/bonuses/cashback')
                  }
                ]
              },
              {
                label: 'CRM',
                onClick: createRedirectHandler('/crm'),
                icon: <Icons.CRMIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocation('/crm'),
                subItems: [
                  {
                    label: 'Partners',
                    onClick: createRedirectHandler('/crm/partners'),
                    isActive: checkIfLocationIncludes('/crm/partners')
                  },
                  {
                    label: 'Templates',
                    onClick: createRedirectHandler('/crm/templates'),
                    isActive: checkIfLocationIncludes('/crm/templates')
                  },
                  {
                    label: 'Triggers',
                    onClick: createRedirectHandler('/crm/triggers'),
                    isActive: checkIfLocationIncludes('/crm/triggers')
                  },
                  {
                    label: 'Campaigns',
                    onClick: createRedirectHandler('/crm/campaigns'),
                    isActive: checkIfLocationIncludes('/crm/campaigns')
                  },
                  {
                    label: 'Messages',
                    onClick: createRedirectHandler('/crm/messages'),
                    isActive: checkIfLocationIncludes('/crm/messages')
                  }
                ]
              }
            ]
          : []),
        {
          label: t.get('crm'),
          icon: <Icons.CRMIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocationIncludes('/crm/'),
          subItems: [
            {
              label: t.get('systemNotifications'),
              onClick: createRedirectHandler('/crm/system-notifications'),
              isActive: checkIfLocation('/crm/system-notifications')
            }
          ]
        },

        {
          label: t.get('rules'),
          icon: <Icons.RuleIcon width='1.8rem' height='2.4rem' />,
          onClick: createRedirectHandler('/rule'),
          isActive: checkIfLocationIncludes('/rule'),
          subItems: []
        }
      ]}
      collapsedWidth={7.2}
      width={25}
      logoSrc={Logo}
      bottomLogoSrc={projectsInformation[user.projectId].logo}
      bottomTitle={projectsInformation[user.projectId].name}
    />
  );
};
