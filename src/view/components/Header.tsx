import { Header as DesignSystemHeader } from '@atom/design-system';
import { FC } from 'react';

export interface HeaderProps {
  onLogOut: () => void;
  username?: string;
}

export const Header: FC<HeaderProps> = ({ onLogOut, username }) => {
  return (
    <DesignSystemHeader
      avatarProps={{
        dropdownLinks: [],

        bottomButtonLabel: 'Log Out',
        onBottomButtonClick: onLogOut,

        avatarLabel: username,
        // dropdownTitle: 'dropdownTitle',
        // onTopButtonClick: () => console.log('onTopButtonClick'),
        // topButtonLabel: 'topButtonLabel',
        imageSource: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
      }}
      notificationProps={{
        quantity: 10
      }}
    />
  );
};
