import { AuthenticatedContext, isAdminUser } from '@atom/authorization';
import { redirectToURL, useLocation, useTranslation } from '@atom/common';
import { Icons, Sidebar as DesignSystemSidebar } from '@atom/design-system';
import { useCallback, useContext, useMemo } from 'react';
import { BangitsLogo, BetRabbitLogo, KingBetLogo, Logo, Mi7Bet, QantoApuestasLogo, RevolucionLogo } from '../images';

export const Sidebar = () => {
  const { user } = useContext(AuthenticatedContext);

  const isProvider = [8285, 29531, 8286, 8287, 28435, 28590, 28675, 28788, 29402].includes(+user.userId);
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
      },
      7: {
        logo: RevolucionLogo,
        name: 'Revolucion'
      },
      8: {
        logo: Mi7Bet,
        name: 'Mi7bet'
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
                  // ...(isCommertionUser
                  // ? [
                  {
                    label: 'Roles',
                    onClick: createRedirectHandler('/role-permission/roles'),
                    isActive: checkIfLocationIncludes('/role-permission/roles')
                  },
                  {
                    label: 'Permissions',
                    onClick: createRedirectHandler('/role-permission/permissions'),
                    isActive: checkIfLocationIncludes('/role-permission/permissions')
                  }
                  // ]
                  // : [])
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
                isActive: checkIfLocationIncludes('/players/') || checkIfLocationIncludes('/segment/players'),
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
                isActive: checkIfLocationIncludes('/cms/') || checkIfLocation('/segment/'),
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
                    label: t.get('sliders'),
                    onClick: createRedirectHandler('/cms/sliders'),
                    isActive: checkIfLocationIncludes('/cms/sliders')
                  },
                  {
                    label: t.get('banners'),
                    onClick: createRedirectHandler('/cms/banners'),
                    isActive: checkIfLocationIncludes('/cms/banners')
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
                    label: t.get('cards'),
                    onClick: createRedirectHandler('/cms/cards'),
                    isActive: checkIfLocationIncludes('/cms/cards')
                  },
                  {
                    label: t.get('segments'),
                    onClick: createRedirectHandler('/segment/'),
                    isActive: checkIfLocation('/segment/')
                  },
                  {
                    label: t.get('infoSection'),
                    onClick: createRedirectHandler('/cms/info-section'),
                    isActive: checkIfLocation('/cms/info-section')
                  },
                  {
                    label: t.get('imageGalleries'),
                    onClick: createRedirectHandler('/cms/image-gallery'),
                    isActive: checkIfLocationIncludes('/cms/image-gallery')
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
        ...(!isProvider
          ? [
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
              }
            ]
          : []),

        ...(isCommertionUser
          ? [
              {
                label: 'Affiliates Management',
                onClick: createRedirectHandler('/affiliate'),
                icon: <Icons.AffilateIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocation('/affiliate'),
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
        ...(!isProvider
          ? [
              {
                label: t.get('crm'),
                icon: <Icons.CRMIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocationIncludes('/crm/'),
                subItems: [
                  {
                    label: t.get('leads'),
                    onClick: createRedirectHandler('/crm/leads'),
                    isActive: checkIfLocation('/crm/leads')
                  },
                  {
                    label: t.get('templates'),
                    onClick: createRedirectHandler('/crm/templates'),
                    isActive: checkIfLocation('/crm/templates')
                  },
                  {
                    label: t.get('campaigns'),
                    onClick: createRedirectHandler('/crm/campaigns'),
                    isActive: checkIfLocation('/crm/campaigns')
                  },
                  {
                    label: t.get('systemNotifications'),
                    onClick: createRedirectHandler('/crm/system-notifications'),
                    isActive: checkIfLocation('/crm/system-notifications')
                  },
                  {
                    label: t.get('reportsByChannels'),
                    onClick: createRedirectHandler('/crm/report-by-channels'),
                    isActive: checkIfLocation('/crm/report-by-channels')
                  }
                ]
              },

              {
                label: t.get('rules'),
                icon: <Icons.RuleIcon width='1.8rem' height='2.4rem' />,
                onClick: createRedirectHandler('/rule'),
                isActive: checkIfLocationIncludes('/rule'),
                subItems: []
              },
              {
                label: t.get('promotionalTools'),
                icon: <Icons.BonusIcon width='1.8rem' height='2.4rem' />,
                isActive:
                  checkIfLocationIncludes('/bonus/') ||
                  checkIfLocationIncludes('/promocode/') ||
                  checkIfLocationIncludes('/loyalty/'),
                subItems: [
                  {
                    label: t.get('bonuses'),
                    onClick: createRedirectHandler('/bonus/bonuses'),
                    isActive: checkIfLocation('/bonus/bonuses')
                  },
                  {
                    label: t.get('promoCampaigns'),
                    onClick: createRedirectHandler('/promocode '),
                    isActive: checkIfLocationIncludes('/promocode')
                  },
                  {
                    label: t.get('loyaltyProgram'),
                    onClick: createRedirectHandler('/loyalty '),
                    isActive: checkIfLocationIncludes('/loyalty')
                  }
                ]
              },
              {
                label: t.get('affiliateManagement'),
                // onClick: createRedirectHandler('/affiliate/commission-plans'),
                icon: <Icons.AffilateIcon width='1.8rem' height='2.4rem' />,
                isActive:
                  checkIfLocationIncludes('/affiliate/commission-plans') ||
                  checkIfLocationIncludes('/affiliate/report-by-affiliates') ||
                  checkIfLocationIncludes('/affiliate/media'),
                subItems: [
                  {
                    label: t.get('commissionPlans'),
                    onClick: createRedirectHandler('/affiliate/commission-plans'),
                    isActive: checkIfLocation('/affiliate/commission-plans')
                  },
                  {
                    label: t.get('reportByAffiliates'),
                    onClick: createRedirectHandler('/affiliate/report-by-affiliates'),
                    isActive: checkIfLocation('/affiliate/report-by-affiliates')
                  },
                  {
                    label: t.get('links'),
                    onClick: createRedirectHandler('/affiliate/media/links'),
                    isActive: checkIfLocation('/affiliate/media/links')
                  },
                  {
                    label: t.get('reportByLinks'),
                    onClick: createRedirectHandler('/affiliate/media/report-by-media'),
                    isActive: checkIfLocation('/affiliate/media/report-by-media')
                  }
                ]
              },
              // {
              //   label: t.get('media'),
              //   // onClick: createRedirectHandler('/media/links'),
              //   icon: <Icons.MediaIcon width='1.8rem' height='2.4rem' />,
              //   isActive: checkIfLocationIncludes('/affiliate/media'),
              //   subItems: []
              // },
              {
                label: t.get('tasks'),
                icon: <Icons.TaskSideBarIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocationIncludes('/task'),
                subItems: [
                  {
                    label: t.get('tasks'),
                    onClick: createRedirectHandler('/task'),
                    isActive: checkIfLocation('/task')
                  },
                  {
                    label: t.get('configuration'),
                    onClick: createRedirectHandler('/task/configuration'),
                    isActive: checkIfLocation('/task/configuration')
                  }
                ]
              },
              {
                label: t.get('paymentRequests'),
                onClick: createRedirectHandler('/payment/payments'),
                icon: <Icons.PaymentSideBarIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocation('/payment/payments'),
                subItems: []
              },
              {
                label: t.get('financicalReports'),
                icon: <Icons.FinacicalReportSideBarIcon width='1.8rem' height='2.4rem' />,
                isActive:
                  checkIfLocationIncludes('/payment/report-by-balances') ||
                  checkIfLocationIncludes('/payment/report-by-payments'),
                subItems: [
                  {
                    label: t.get('reportByPayments'),
                    onClick: createRedirectHandler('/payment/report-by-payments'),
                    isActive: checkIfLocation('/payment/report-by-payments')
                  },
                  {
                    label: t.get('reportByBalances'),
                    onClick: createRedirectHandler('/payment/report-by-balances'),
                    isActive: checkIfLocation('/payment/report-by-balances')
                  }
                ]
              },
              {
                label: t.get('shop'),
                icon: <Icons.ShopSideBarIcon width='1.8rem' height='2.4rem' />,
                isActive: checkIfLocationIncludes('/shop'),
                subItems: [
                  {
                    label: t.get('items'),
                    onClick: createRedirectHandler('/shop/items'),
                    isActive: checkIfLocation('/shop/items')
                  },
                  {
                    label: t.get('orders'),
                    onClick: createRedirectHandler('/shop/orders'),
                    isActive: checkIfLocation('/shop/orders')
                  }
                ]
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
