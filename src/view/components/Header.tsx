import { AuthenticatedContext, isBetShopUser } from '@atom/authorization';
import { convertDate, historyService, useTranslation } from '@atom/common';
import { Header as DesignSystemHeader } from '@atom/design-system';
import { AtomPlayerProvider, BalanceCorrection } from '@atom/player-management';
import { FC, useContext, useEffect, useState } from 'react';
import { calculateWifiSpeed } from '../helpers';

export interface HeaderProps {
  onLogOut: () => void;
  username: string;
  currency: string;
  money: number;
}

export const Header: FC<HeaderProps> = ({ onLogOut, username, money, currency }) => {
  const { user } = useContext(AuthenticatedContext);
  const isCommertionUser = [8365].includes(+user.userId);

  const [wifiSpeed, setWifiSpeed] = useState<1 | 2 | 3>(calculateWifiSpeed());
  const [isOnline, setOnline] = useState(true);
  const [showCorrectionDialog, setShowCorrectionDialog] = useState(false);
  const t = useTranslation();

  const correctBalanceLabel = isBetShopUser(user) ? t.get('cashInOut') : t.get('correctBalance');

  useEffect(() => {
    // @ts-expect-error Disable TS for navigator type cast
    if (navigator?.connection) navigator.connection.addEventListener('change', () => setWifiSpeed(calculateWifiSpeed));

    window.addEventListener('online', () => setOnline(true));
    window.addEventListener('offline', () => setOnline(false));
  }, []);

  return (
    <>
      <DesignSystemHeader
        avatarProps={{
          dropdownLinks: [
            {
              label: t.get('userDetails'),
              onClick: () => historyService.redirectToURL(`/users/${user.userId}?tab=1`)
            }
          ],

          bottomButtonLabel: 'Log Out',
          onBottomButtonClick: onLogOut,

          avatarLabel: username,
          imageSource: 'https://storageaccountatom.blob.core.windows.net/mfe/avatar.png'
        }}
        notificationProps={{
          quantity: 0
        }}
        money={money}
        currency={currency}
        dateConverter={(date) => convertDate(date, 'DD/MM/YYYY HH:mm:ss', false)}
        localTime='Local Time'
        speed={wifiSpeed}
        isOffline={!isOnline}
        // onCorrectBalanceClick={!isCommertionUser ? () => setShowCorrectionDialog(true) : undefined}
        onCorrectBalanceClick={undefined}
        correctBalanceLabel={correctBalanceLabel}
      />

      <AtomPlayerProvider>
        <BalanceCorrection open={showCorrectionDialog} onClose={() => setShowCorrectionDialog(false)} />
      </AtomPlayerProvider>
    </>
  );
};
