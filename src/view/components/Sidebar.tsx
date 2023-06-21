import { AuthenticatedContext, isAdminUser } from '@atom/authorization';
import { redirectToURL, useLocation, useTranslation } from '@atom/common';
import { Sidebar as DesignSystemSidebar, Icons } from '@atom/design-system';
import { useCallback, useContext, useMemo } from 'react';
import {
  BangitsLogo,
  BetCesarLogo,
  BetRabbitLogo,
  KingBetLogo,
  Logo,
  Mi7Bet,
  PingWinLogo,
  QantoApuestasLogo,
  RevolucionLogo
} from '../images';

export const Sidebar = () => {
  const { user } = useContext(AuthenticatedContext);

  const adminUser = isAdminUser(user);
  const isProvider = [8285, 8286, 8287, 28590].includes(+user.userId);
  const isPaymentSupporter = [8855, 8856, 8857].includes(+user.userId);
  const isSupport = [10815, 10825, 10826].includes(+user.userId);
  const isContentManager = [9221].includes(+user.userId);
  const isFinancialSupporter = [9222, 9756, 9755].includes(+user.userId);
  const isOnlyCasinoReports = [11001].includes(+user.userId);
  const isOnlyGameManager = [11091, 11065].includes(+user.userId);
  const isAffiliate = [10756, 10166, 8876, 8875, 8874, 8873, 8872, 8871, 8870, 8980].includes(+user.userId);
  const isKingbet = user.projectId === 3;
  const isRevolution = user.projectId === 7;
  const isMi7 = user.projectId === 6;
  const isBetCesar = user.projectId === 9;
  const isBetRabbit = user.projectId === 5;
  const isPingWin = user.projectId === 8;
  const isRuby = user.projectId === 11;
  const isWinGrade = user.projectId === 12;
  const isHarembet = user.projectId === 13;

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
      6: {
        logo: Mi7Bet,
        name: 'Mi7bet'
      },
      7: {
        logo: RevolucionLogo,
        name: 'Revolucion'
      },
      8: {
        logo: PingWinLogo,
        name: 'PingWin'
      },
      9: {
        logo: BetCesarLogo,
        name: 'Bet Cesar'
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
              onClick: createRedirectHandler('/partners/'),
              isActive: checkIfLocationIncludes('/partners/')
            }
          ],
          showWhen: false
        },
        {
          label: t.get('playerManagement'),
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
          ],
          showWhen: !isProvider && !isPaymentSupporter && !isAffiliate && !isOnlyCasinoReports && !isOnlyGameManager
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
          ],
          showWhen: isBetRabbit && !isPaymentSupporter && !isAffiliate && !isContentManager && !isFinancialSupporter
        },
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
          ],
          showWhen:
            (adminUser || isProvider || isOnlyGameManager) &&
            !isPaymentSupporter &&
            !isAffiliate &&
            !isContentManager &&
            !isFinancialSupporter
        },
        {
          label: t.get('paymentManagement'),
          icon: <Icons.PaymentManagementSidebarIcon />,
          isActive: checkIfLocationIncludes('/payment-content/'),
          subItems: [
            {
              label: t.get('providers'),
              onClick: createRedirectHandler('/payment-content/providers'),
              isActive: checkIfLocation('/payment-content/providers')
            },
            {
              label: t.get('paymentMethods'),
              onClick: createRedirectHandler('/payment-content/payment-methods'),
              isActive: checkIfLocation('/payment-content/payment-methods')
            }
          ],
          showWhen: adminUser && !isOnlyGameManager
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
              onClick: createRedirectHandler('/payment-requests/deposits'),
              isActive: checkIfLocation('/payment-requests/deposits')
            },
            {
              label: t.get('withdrawals'),
              onClick: createWindowRedirectHandler('/payment-requests/withdrawals'),
              isActive: checkIfLocation('/payment-requests/withdrawals')
            }
          ],
          showWhen: !isKingbet && !isAffiliate && !isOnlyCasinoReports && !isOnlyGameManager
        },
        {
          label: t.get('rules'),
          icon: <Icons.RuleIcon width='1.8rem' height='2.4rem' />,
          onClick: createRedirectHandler('/rule'),
          isActive: checkIfLocationIncludes('/rule'),
          subItems: [],
          showWhen:
            !isSupport &&
            !isKingbet &&
            !isPaymentSupporter &&
            !isAffiliate &&
            !isFinancialSupporter &&
            !isOnlyCasinoReports &&
            !isOnlyGameManager
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
            ...(isBetRabbit || isMi7 || isWinGrade || isHarembet
              ? [
                  {
                    label: t.get('loyaltyProgram'),
                    onClick: createRedirectHandler('/loyalty'),
                    isActive: checkIfLocationIncludes('/loyalty')
                  }
                ]
              : [])
          ],
          showWhen:
            !isAffiliate &&
            (isBetRabbit || isRevolution || isBetCesar || isMi7 || isRuby || isWinGrade || isHarembet || isPingWin) &&
            !isContentManager &&
            !isFinancialSupporter
        },
        {
          label: t.get('taskManagement'),
          icon: <Icons.TaskSideBarIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocation('/task'),
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
          ],
          showWhen: isBetRabbit || isMi7 || isWinGrade || isHarembet || isContentManager
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
          ],
          showWhen:
            (!isSupport &&
              !isKingbet &&
              !isPaymentSupporter &&
              !isRevolution &&
              !isContentManager &&
              !isFinancialSupporter &&
              !isOnlyCasinoReports &&
              !isOnlyGameManager) ||
            isAffiliate
        },
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
          ],
          showWhen:
            !isSupport &&
            !isProvider &&
            !isPaymentSupporter &&
            !isAffiliate &&
            !isContentManager &&
            !isFinancialSupporter &&
            !isOnlyCasinoReports &&
            !isOnlyGameManager
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
            ...(!isSupport
              ? [
                  {
                    label: t.get('paymentsInventory'),
                    onClick: createRedirectHandler('/cms-payment'),
                    isActive: checkIfLocationIncludes('/cms-payment')
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
              : [])
          ],
          showWhen:
            !isProvider &&
            !isPaymentSupporter &&
            !isAffiliate &&
            !isContentManager &&
            !isFinancialSupporter &&
            !isOnlyCasinoReports &&
            !isOnlyGameManager
        },
        {
          label: t.get('translation'),
          onClick: createRedirectHandler('/translations'),
          icon: <Icons.TranslationIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocation('/translations'),
          subItems: [],
          showWhen:
            !isSupport &&
            !isProvider &&
            !isPaymentSupporter &&
            !isAffiliate &&
            !isFinancialSupporter &&
            !isOnlyCasinoReports &&
            !isOnlyGameManager
        },
        {
          label: t.get('casinoReports'),
          icon: <Icons.ReportsIcon />,
          isActive: checkIfLocationIncludes('/reports/'),
          subItems: [
            {
              label: t.get('reportByBets'),
              onClick: createRedirectHandler('/reports/bets'),
              isActive: checkIfLocation('/reports/bets')
            },
            {
              label: t.get('reportByPlayers'),
              onClick: createRedirectHandler('/reports/players'),
              isActive: checkIfLocation('/reports/players')
            },
            {
              label: t.get('reportByProviders'),
              onClick: createRedirectHandler('/reports/providers'),
              isActive: checkIfLocation('/reports/providers')
            },
            {
              label: t.get('reportByGames'),
              onClick: createRedirectHandler('/reports/games'),
              isActive: checkIfLocation('/reports/games')
            },
            {
              label: t.get('reportByCountries'),
              onClick: createRedirectHandler('/reports/countries'),
              isActive: checkIfLocation('/reports/countries')
            }
          ],
          showWhen: !isPaymentSupporter && !isAffiliate && !isOnlyGameManager
        },
        {
          label: t.get('sportReports'),
          icon: <Icons.SportReportSideBarIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocationIncludes('/sport-reports'),
          subItems: [
            {
              label: t.get('reportByBets'),
              onClick: createRedirectHandler('/sport-reports/bets'),
              isActive: checkIfLocation('/sport-reports/bets')
            }
          ],
          showWhen: isRevolution || isBetCesar
        },
        {
          label: t.get('financicalReports'),
          icon: <Icons.FinacicalReportSideBarIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocationIncludes('/payment-requests/report'),
          subItems: [
            {
              label: t.get('reportByPayments'),
              onClick: createRedirectHandler('/payment-requests/report-by-payments'),
              isActive: checkIfLocation('/payment-requests/report-by-payments')
            },
            {
              label: t.get('reportByCorrections'),
              onClick: createRedirectHandler('/payment-requests/report-by-corrections'),
              isActive: checkIfLocation('/payment-requests/report-by-corrections')
            },
            {
              label: t.get('reportByPlayers'),
              onClick: createRedirectHandler('/payment-requests/report-by-players'),
              isActive: checkIfLocation('/payment-requests/report-by-players')
            }
          ],
          showWhen:
            !isSupport &&
            !isKingbet &&
            !isPaymentSupporter &&
            !isAffiliate &&
            !isOnlyCasinoReports &&
            !isOnlyGameManager
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
          ],
          showWhen:
            (isBetRabbit || isMi7 || isWinGrade || isHarembet) &&
            !isPaymentSupporter &&
            !isAffiliate &&
            !isContentManager &&
            !isFinancialSupporter
        }
      ].filter((i) => i.showWhen)}
      collapsedWidth={7.2}
      width={25}
      logoSrc={Logo}
      bottomLogoSrc={projectsInformation[user.projectId]?.logo}
      bottomTitle={projectsInformation[user.projectId]?.name}
    />
  );
};
