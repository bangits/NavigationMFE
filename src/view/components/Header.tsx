import { convertDate } from '@atom/common';
import { Header as DesignSystemHeader } from '@atom/design-system';
import { BalanceCorrection } from '@atom/player-management';
import { FC, useEffect, useState } from 'react';
import { calculateWifiSpeed } from '../helpers';

export interface HeaderProps {
  onLogOut: () => void;
  username: string;
  currency: string;
  money: number;
}

export const Header: FC<HeaderProps> = ({ onLogOut, username, money, currency }) => {
  const [wifiSpeed, setWifiSpeed] = useState<1 | 2 | 3>(calculateWifiSpeed());
  const [isOnline, setOnline] = useState(true);
  const [showCorrectionDialog, setShowCorrectionDialog] = useState(false);

  useEffect(() => {
    if (navigator?.connection) navigator.connection.addEventListener('change', () => setWifiSpeed(calculateWifiSpeed));

    window.addEventListener('online', () => setOnline(true));
    window.addEventListener('offline', () => setOnline(false));
  }, []);

  return (
    <>
      <DesignSystemHeader
        avatarProps={{
          dropdownLinks: [],

          bottomButtonLabel: 'Log Out',
          onBottomButtonClick: onLogOut,

          avatarLabel: username,
          imageSource: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
        }}
        notificationProps={{
          quantity: 0
        }}
        money={money}
        currency={currency}
        dateConverter={(date) => convertDate(date, 'MM/DD/YYYY HH:mm:ss', false)}
        localTime='Local Time'
        speed={wifiSpeed}
        isOffline={!isOnline}
        onCorrectBalanceClick={() => setShowCorrectionDialog(true)}
      />

      <BalanceCorrection open={showCorrectionDialog} onClose={() => setShowCorrectionDialog(false)} />
    </>
  );
};
