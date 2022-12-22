import { AuthenticatedContext, isAdminUser } from '@atom/authorization';
import { redirectToURL, useLocation, useTranslation } from '@atom/common';
import { Icons, Sidebar as DesignSystemSidebar } from '@atom/design-system';
import { useCallback, useContext, useMemo } from 'react';
import { BangitsLogo, BetRabbitLogo, KingBetLogo, Logo, Mi7Bet, QantoApuestasLogo, RevolucionLogo } from '../images';

export const Sidebar = () => {
  const { user } = useContext(AuthenticatedContext);

  const isProvider = [8285, 8286, 8287, 28590].includes(+user.userId);
  const adminUser = isAdminUser(user);
  const isKingbet = user.projectId === 3;
  const isBetRabbit = user.projectId === 5;

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
      6: {
        logo: Mi7Bet,
        name: 'Mi7bet'
      },
      7: {
        logo: RevolucionLogo,
        name: 'Revolucion'
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
          showWhen: !isProvider
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
          showWhen: isBetRabbit
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
          showWhen: adminUser || isProvider
        },
        {
          label: t.get('paymentRequests'),
          onClick: createRedirectHandler('/payment/payments'),
          icon: <Icons.PaymentSideBarIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocation('/payment/payments'),
          subItems: [],
          showWhen: !isKingbet
        },
        {
          label: t.get('rules'),
          icon: <Icons.RuleIcon width='1.8rem' height='2.4rem' />,
          onClick: createRedirectHandler('/rule'),
          isActive: checkIfLocationIncludes('/rule'),
          subItems: [],
          showWhen: !isKingbet
        },
        {
          label: t.get('promotionalTools'),
          icon: <Icons.BonusIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocationIncludes('/bonus/') || checkIfLocationIncludes('/promocode/'),
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
            }
          ],
          showWhen: !isKingbet
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
          showWhen: !isKingbet
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
          showWhen: !isKingbet
        },
        {
          label: t.get('crm'),
          icon: <Icons.CRMIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocationIncludes('/crm/'),
          subItems: [
            {
              label: t.get('systemNotifications'),
              onClick: createRedirectHandler('/crm/system-notifications'),
              isActive: checkIfLocation('/crm/system-notifications')
            },
            {
              label: t.get('templates'),
              onClick: createRedirectHandler('/crm/templates'),
              isActive: checkIfLocation('/crm/templates')
            }
          ],
          showWhen: !isProvider
        },
        {
          label: t.get('cms'),
          // onClick: createRedirectHandler('/cms'),
          icon: <Icons.CMSIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocationIncludes('/cms/') || checkIfLocation('/segment/games-and-providers'),
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
              onClick: createRedirectHandler('/segment/games-and-providers'),
              isActive: checkIfLocation('/segment/games-and-providers')
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
          ],
          showWhen: !isProvider
        },
        {
          label: t.get('translation'),
          onClick: createRedirectHandler('/translations'),
          icon: <Icons.TranslationIcon width='1.8rem' height='2.4rem' />,
          isActive: checkIfLocation('/translations'),
          subItems: [],
          showWhen: !isProvider
        },
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
          ],
          showWhen: true
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
          ],
          showWhen: !isKingbet
        }
      ].filter((i) => i.showWhen)}
      collapsedWidth={7.2}
      width={25}
      logoSrc={Logo}
      bottomLogoSrc={projectsInformation[user.projectId].logo}
      bottomTitle={projectsInformation[user.projectId].name}
    />
  );
};
