import { AuthenticatedContext } from '@atom/authorization';
import { PermissionSlugs, projects, redirectToURL, useHasPermission, useLocation, useTranslation } from '@atom/common';
import { Sidebar as DesignSystemSidebar, Icons } from '@atom/design-system';
import { useCallback, useContext } from 'react';
import { Logo } from '../images';

export const Sidebar = () => {
  const { user } = useContext(AuthenticatedContext);

  const hasPermission = useHasPermission();

  const location = useLocation();
  const t = useTranslation();

  const createRedirectHandler = useCallback(
    (url: string) => () => {
      // historyService.redirectToURL(url);
      redirectToURL(url);
    },
    []
  );

  const createWindowRedirectHandler = useCallback(
    (url: string) => () => {
      // historyService.redirectToURL(url);
      window.location.replace(url);
    },
    []
  );

  const checkIfLocationIncludes = useCallback((url: string) => location.pathname.includes(url), [location]);
  const checkIfLocation = useCallback(
    (url: string) => location.pathname === url || location.pathname === url + '/' || location.pathname + '/' === url,
    [location]
  );
  const checkIfLocationStartsWith = useCallback((url: string) => location.pathname.startsWith(url), [location]);

  return (
    <DesignSystemSidebar
      defaultClosed={true}
      position='static'
      menuItems={[
        {
          label: t.get('dashboard'),
          href: '/',
          onClick: createRedirectHandler('/'),
          icon: <Icons.DashboardIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocation('/'),
          subItems: [],
          showWhen: true
        },
        {
          label: t.get('partnerManagement'),
          icon: <Icons.PartnersIcon />,
          isActive: checkIfLocationIncludes('/partners/'),
          subItems: [
            {
              label: t.get('partners'),
              href: '/partners/',
              onClick: createRedirectHandler('/partners/'),
              isActive: checkIfLocationIncludes('/partners/'),
              showWhen: hasPermission(PermissionSlugs.PARTNERS_GET_PARTNERS_NAME)
            }
          ]
        },
        {
          label: t.get('playerManagement'),
          icon: <Icons.UserIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocationIncludes('/players/') || checkIfLocationIncludes('/segment/players'),
          subItems: [
            {
              label: t.get('players'),
              href: '/players',
              onClick: createRedirectHandler('/players'),
              isActive: checkIfLocation('/players'),
              showWhen: hasPermission(PermissionSlugs.WEB_USERS_GET)
            },
            {
              label: t.get('segments'),
              href: '/segment/players',
              onClick: createRedirectHandler('/segment/players'),
              isActive: checkIfLocationIncludes('/segment/players'),
              showWhen: hasPermission(PermissionSlugs.GET_SEGMENT)
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
              href: '/users/',
              onClick: createRedirectHandler('/users/'),
              isActive: checkIfLocationIncludes('/users/'),
              showWhen: hasPermission(PermissionSlugs.ADMIN_USERS_GET)
            },
            {
              label: t.get('roles'),
              href: '/role-permission/roles',
              onClick: createRedirectHandler('/role-permission/roles'),
              isActive: checkIfLocationIncludes('/role-permission/roles'),
              showWhen: hasPermission(PermissionSlugs.GET_ROLES)
            },
            {
              label: t.get('permissions'),
              href: '/role-permission/permissions',
              onClick: createRedirectHandler('/role-permission/permissions'),
              isActive: checkIfLocationIncludes('/role-permission/permissions'),
              showWhen: hasPermission(PermissionSlugs.GET_PERMISSIONS)
            }
          ]
        },
        {
          label: t.get('paymentManagement'),
          icon: <Icons.PaymentManagementSidebarIcon />,
          isActive: checkIfLocationIncludes('/payment-content/'),
          subItems: [
            {
              label: t.get('providers'),
              href: '/payment-content/providers',
              onClick: createRedirectHandler('/payment-content/providers'),
              isActive: checkIfLocation('/payment-content/providers'),
              showWhen: hasPermission(PermissionSlugs.GET_PAYMENT_MANAGER_PROVIDERS)
            },
            {
              label: t.get('paymentMethods'),
              href: '/payment-content/payment-methods',
              onClick: createRedirectHandler('/payment-content/payment-methods'),
              isActive: checkIfLocation('/payment-content/payment-methods'),
              showWhen: hasPermission(PermissionSlugs.GET_PAYMENT_MANAGER_METHODS)
            }
          ]
        },
        {
          label: t.get('gameManagement'),
          icon: <Icons.GamesIcon />,
          isActive: checkIfLocationIncludes('/game/'),
          subItems: [
            {
              label: t.get('providers'),
              href: '/game/providers',
              onClick: createRedirectHandler('/game/providers'),
              isActive: checkIfLocation('/game/providers'),
              showWhen: hasPermission(PermissionSlugs.GAME_MANAGMENT_PROVIDERS_GET)
            },
            {
              label: t.get('games'),
              href: '/game/',
              onClick: createRedirectHandler('/game/'),
              isActive: checkIfLocation('/game'),
              showWhen: hasPermission(PermissionSlugs.GAMES_GET)
            }
          ]
        },
        {
          label: t.get('paymentRequests'),
          icon: <Icons.PaymentSideBarIcon width='1.8rem' height='2.4rem' />,
          isActive:
            checkIfLocationStartsWith('/payment-requests/deposits') ||
            checkIfLocationStartsWith('/payment-requests/withdrawals'),
          subItems: [
            {
              label: t.get('deposits'),
              href: '/payment-requests/deposits',
              onClick: createRedirectHandler('/payment-requests/deposits'),
              isActive: checkIfLocation('/payment-requests/deposits'),
              showWhen: hasPermission(PermissionSlugs.PAYMENT_GATEWAY_TRANSACTION_GET_DEPOSITS)
            },
            {
              label: t.get('withdrawals'),
              onClick: createWindowRedirectHandler('/payment-requests/withdrawals'),
              isActive: checkIfLocation('/payment-requests/withdrawals'),
              showWhen: hasPermission(PermissionSlugs.PAYMENT_GATEWAY_TRANSACTION_GET_WITHDRAWALS)
            }
          ]
        },
        {
          label: t.get('rules'),
          icon: <Icons.RuleIcon width='1.8rem' height='2.4rem' />,
          href: '/rule',
          onClick: createRedirectHandler('/rule'),
          isActive: checkIfLocationIncludes('/rule'),
          subItems: [],
          showWhen: hasPermission(PermissionSlugs.GET_RULE)
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
              href: '/bonus/bonuses',
              onClick: createRedirectHandler('/bonus/bonuses'),
              isActive: checkIfLocation('/bonus/bonuses'),
              showWhen: hasPermission(PermissionSlugs.GET_BONUSES)
            },
            {
              label: t.get('promoCampaigns'),
              href: '/promocode ',
              onClick: createRedirectHandler('/promocode '),
              isActive: checkIfLocationIncludes('/promocode'),
              showWhen: hasPermission(PermissionSlugs.PROMO_CAMPAIGN_STATUS_ASYNC)
            },
            {
              label: t.get('loyaltyProgram'),
              href: '/loyalty',
              onClick: createRedirectHandler('/loyalty'),
              isActive: checkIfLocationIncludes('/loyalty'),
              showWhen: hasPermission(PermissionSlugs.GET_LOYALTY_PROGRAMS)
            }
          ]
        },
        {
          label: t.get('taskManagement'),
          icon: <Icons.TaskSideBarIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocation('/task'),
          subItems: [
            {
              label: t.get('tasks'),
              href: '/task',
              onClick: createRedirectHandler('/task'),
              isActive: checkIfLocation('/task'),
              showWhen: hasPermission(PermissionSlugs.GET_TASKS)
            },
            {
              label: t.get('configuration'),
              href: '/task/configuration',
              onClick: createRedirectHandler('/task/configuration'),
              isActive: checkIfLocation('/task/configuration'),
              showWhen: hasPermission(PermissionSlugs.GET_TASK_TYPES)
            }
          ]
        },
        {
          label: t.get('affiliateManagement'),
          //           href// : createRedirectHandler('/affiliate/commission-plans'),
          onC: createRedirectHandler('/affiliate/commission-plans'),
          icon: <Icons.AffilateIcon width='1.8rem' height='2.4rem' />,
          isActive:
            checkIfLocationIncludes('/affiliate/commission-plans') ||
            checkIfLocationIncludes('/affiliate/report-by-affiliates') ||
            checkIfLocationIncludes('/affiliate/media'),
          subItems: [
            {
              label: t.get('commissionPlans'),
              href: '/affiliate/commission-plans',
              onClick: createRedirectHandler('/affiliate/commission-plans'),
              isActive: checkIfLocation('/affiliate/commission-plans'),
              showWhen: hasPermission(PermissionSlugs.GET_COMMISION_PLANS)
            },
            {
              label: t.get('reportByAffiliates'),
              href: '/affiliate/report-by-affiliates',
              onClick: createRedirectHandler('/affiliate/report-by-affiliates'),
              isActive: checkIfLocation('/affiliate/report-by-affiliates'),
              showWhen: hasPermission(PermissionSlugs.GET_REPORT_BY_AFFILIATE)
            },
            {
              label: t.get('links'),
              href: '/affiliate/media/links',
              onClick: createRedirectHandler('/affiliate/media/links'),
              isActive: checkIfLocation('/affiliate/media/links'),
              showWhen: hasPermission(PermissionSlugs.GET_LINKS)
            },
            {
              label: t.get('reportByLinks'),
              href: '/affiliate/media/report-by-media',
              onClick: createRedirectHandler('/affiliate/media/report-by-media'),
              isActive: checkIfLocation('/affiliate/media/report-by-media'),
              showWhen: hasPermission(PermissionSlugs.GET_REPORT_BY_MEDIA)
            }
          ]
        },
        {
          label: t.get('crm'),
          icon: <Icons.CRMIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocationIncludes('/crm/'),
          subItems: [
            {
              label: t.get('leads'),
              href: '/crm/leads',
              onClick: createRedirectHandler('/crm/leads'),
              isActive: checkIfLocation('/crm/leads'),
              showWhen: hasPermission(PermissionSlugs.GET_LEADS)
            },
            {
              label: t.get('templates'),
              href: '/crm/templates',
              onClick: createRedirectHandler('/crm/templates'),
              isActive: checkIfLocation('/crm/templates'),
              showWhen: hasPermission(PermissionSlugs.GET_HTML_TEMPLATE)
            },
            {
              label: t.get('campaigns'),
              href: '/crm/campaigns',
              onClick: createRedirectHandler('/crm/campaigns'),
              isActive: checkIfLocation('/crm/campaigns'),
              showWhen: hasPermission(PermissionSlugs.GET_TRIGGER_CAMPAIGN)
            },
            {
              label: t.get('systemNotifications'),
              href: '/crm/system-notifications',
              onClick: createRedirectHandler('/crm/system-notifications'),
              isActive: checkIfLocation('/crm/system-notifications'),
              showWhen: hasPermission(PermissionSlugs.GET_TRIGGER_NOTIFICATIONS)
            },
            {
              label: t.get('reportsByChannels'),
              href: '/crm/report-by-channels',
              onClick: createRedirectHandler('/crm/report-by-channels'),
              isActive: checkIfLocation('/crm/report-by-channels'),
              showWhen: hasPermission(PermissionSlugs.GET_COUNTS_NOTIFICATION_REPORT)
            }
          ]
        },
        {
          label: t.get('cms'),
          //           href// : createRedirectHandler('/cms'),
          onC: createRedirectHandler('/cms'),
          icon: <Icons.CMSIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocationIncludes('/cms/') || checkIfLocation('/segment/'),
          subItems: [
            {
              label: t.get('providersAndGames'),
              href: '/cms/providers-games',
              onClick: createRedirectHandler('/cms/providers-games'),
              isActive: checkIfLocation('/cms/providers-games'),
              showWhen: hasPermission(PermissionSlugs.PROVIDERS_GET)
            },
            {
              label: t.get('paymentsInventory'),
              href: '/cms-payment',
              onClick: createRedirectHandler('/cms-payment'),
              isActive: checkIfLocationIncludes('/cms-payment'),
              showWhen: hasPermission([
                PermissionSlugs.CMS_MANAGER_GET_PAYMENT_GENERAL_SETTINGS,
                PermissionSlugs.CMS_MANAGER_PAYMENT_METHOD_GET,
                PermissionSlugs.CMS_MANAGER_PAYMENT_PROVIDER_GET
              ])
            },
            {
              label: t.get('website'),
              href: '/cms/website',
              onClick: createRedirectHandler('/cms/website'),
              isActive: checkIfLocationIncludes('/cms/website'),
              showWhen: hasPermission(PermissionSlugs.WEBSITE_SETTINGS_GET)
            },
            {
              label: t.get('sliders'),
              href: '/cms/sliders',
              onClick: createRedirectHandler('/cms/sliders'),
              isActive: checkIfLocationIncludes('/cms/sliders'),
              showWhen: hasPermission(PermissionSlugs.SLIDER_SECTION_GET_ALL_SECTIONS)
            },
            {
              label: t.get('labels'),
              href: '/cms-label',
              onClick: createRedirectHandler('/cms-label'),
              isActive: checkIfLocationIncludes('/cms-label'),
              showWhen: hasPermission(PermissionSlugs.LABELS_GET)
            },
            {
              label: t.get('banners'),
              href: '/cms/banners',
              onClick: createRedirectHandler('/cms/banners'),
              isActive: checkIfLocationIncludes('/cms/banners'),
              showWhen: hasPermission(PermissionSlugs.BANNER_GET)
            },
            {
              label: t.get('categoriesAndGroups'),
              href: '/cms/game-categories',
              onClick: createRedirectHandler('/cms/game-categories'),
              isActive: checkIfLocationIncludes('/cms/game-categories'),
              showWhen: hasPermission(PermissionSlugs.CATEGORY_GET)
            },
            {
              label: t.get('pages'),
              href: '/cms/pages',
              onClick: createRedirectHandler('/cms/pages'),
              isActive: checkIfLocationIncludes('/cms/pages'),
              showWhen: hasPermission(PermissionSlugs.PAGE_FILTER_PAGES)
            },
            {
              label: t.get('cards'),
              href: '/cms/cards',
              onClick: createRedirectHandler('/cms/cards'),
              isActive: checkIfLocationIncludes('/cms/cards'),
              showWhen: hasPermission(PermissionSlugs.CARD_SECTION_GET_CARDS)
            },
            {
              label: t.get('segments'),
              href: '/segment/',
              onClick: createRedirectHandler('/segment/'),
              isActive: checkIfLocation('/segment/'),
              showWhen: hasPermission(PermissionSlugs.GET_SEGMENT)
            },
            {
              label: t.get('infoSection'),
              href: '/cms/info-section',
              onClick: createRedirectHandler('/cms/info-section'),
              isActive: checkIfLocation('/cms/info-section'),
              showWhen: hasPermission(PermissionSlugs.INFO_SECTION_GET)
            },
            {
              label: t.get('imageGalleries'),
              href: '/cms/image-gallery',
              onClick: createRedirectHandler('/cms/image-gallery'),
              isActive: checkIfLocationIncludes('/cms/image-gallery'),
              showWhen: hasPermission(PermissionSlugs.GALLERY_SECTION_GET)
            }
          ]
        },
        {
          label: t.get('translation'),
          href: '/translations',
          onClick: createRedirectHandler('/translations'),
          icon: <Icons.TranslationIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocation('/translations'),
          subItems: [],
          showWhen: hasPermission(PermissionSlugs.TRANSLATION_CATEGORY_GET)
        },
        {
          label: t.get('betReports'),
          icon: <Icons.ReportsIcon />,
          isActive: checkIfLocationIncludes('/reports/'),
          subItems: [
            {
              label: t.get('reportByProviders'),
              href: '/reports/providers',
              onClick: createRedirectHandler('/reports/providers'),
              isActive: checkIfLocation('/reports/providers'),
              showWhen: hasPermission(PermissionSlugs.GET_REPORT_BY_PROVIDERS)
            },
            {
              label: t.get('reportByPlayers'),
              href: '/reports/players',
              onClick: createRedirectHandler('/reports/players'),
              isActive: checkIfLocation('/reports/players'),
              showWhen: hasPermission(PermissionSlugs.GET_REPORT_BY_PLAYERS)
            },
            {
              label: t.get('reportByGames'),
              href: '/reports/games',
              onClick: createRedirectHandler('/reports/games'),
              isActive: checkIfLocation('/reports/games'),
              showWhen: hasPermission(PermissionSlugs.GET_ALL_GAME_NAMES)
            },
            {
              label: t.get('reportByBets'),
              href: '/reports/bets',
              onClick: createRedirectHandler('/reports/bets'),
              isActive: checkIfLocation('/reports/bets'),
              showWhen: hasPermission(PermissionSlugs.GET_REPORT_BY_BETS)
            }
            // {
            //   label: t.get('reportByCashInOut'),
            //               href//   : createRedirectHandler('/reports/transfers'),
            // onClick createRedirectHandler('/reports/transfers'),
            //   isActive: checkIfLocation('/reports/transfers')
            // }
          ]
        },
        {
          label: t.get('sportReports'),
          icon: <Icons.SportReportSideBarIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocationIncludes('/sport-reports'),
          subItems: [
            {
              label: t.get('reportByBets'),
              href: '/sport-reports/bets',
              onClick: createRedirectHandler('/sport-reports/bets'),
              isActive: checkIfLocation('/sport-reports/bets'),
              showWhen: hasPermission(PermissionSlugs.SPORT_PLAYER)
            }
          ]
        },
        {
          label: t.get('financicalReports'),
          icon: <Icons.FinacicalReportSideBarIcon width='1.8rem' height='2.4rem' />,
          isActive:
            checkIfLocationIncludes('/payment-requests/report') ||
            checkIfLocationIncludes('/payment-requests/player-balances'),
          subItems: [
            {
              label: t.get('reportByPayments'),
              href: '/payment-requests/report-by-payments',
              onClick: createRedirectHandler('/payment-requests/report-by-payments'),
              isActive: checkIfLocation('/payment-requests/report-by-payments'),
              showWhen: hasPermission(PermissionSlugs.PAYMENT_GET_REPORT_BY_PAYMENTS)
            },
            {
              label: t.get('reportByCorrections'),
              href: '/payment-requests/report-by-corrections',
              onClick: createRedirectHandler('/payment-requests/report-by-corrections'),
              isActive: checkIfLocation('/payment-requests/report-by-corrections'),
              showWhen: hasPermission(PermissionSlugs.CORRECTION_REPORTS_GET)
            },
            {
              label: t.get('reportByPlayers'),
              href: '/payment-requests/report-by-players',
              onClick: createRedirectHandler('/payment-requests/report-by-players'),
              isActive: checkIfLocation('/payment-requests/report-by-players'),
              showWhen: hasPermission(PermissionSlugs.USER_TRANSACTIONS)
            },
            {
              label: t.get('reportByBalances'),
              href: '/payment-requests/player-balances',
              onClick: createRedirectHandler('/payment-requests/player-balances'),
              isActive: checkIfLocation('/payment-requests/player-balances'),
              showWhen: hasPermission(PermissionSlugs.USER_TRANSACTIONS)
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
              href: '/shop/items',
              onClick: createRedirectHandler('/shop/items'),
              isActive: checkIfLocation('/shop/items'),
              showWhen: hasPermission(PermissionSlugs.GET_CASINO_SHOP)
            },
            {
              label: t.get('orders'),
              href: '/shop/orders',
              onClick: createRedirectHandler('/shop/orders'),
              isActive: checkIfLocation('/shop/orders'),
              showWhen: hasPermission(PermissionSlugs.GET_CASINO_SHOP_ORDER)
            }
          ]
        }
      ].filter((i) => (i.subItems.length > 0 ? i.subItems.some((item) => item.showWhen) : i.showWhen))}
      collapsedWidth={7.2}
      width={25}
      logoSrc={Logo}
      bottomLogoSrc={projects[user.projectId]?.logo}
      bottomTitle={projects[user.projectId]?.name}
    />
  );
};
