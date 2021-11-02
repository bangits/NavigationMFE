import { redirectToURL } from '@atom/common';
import { Header as DesignSystemHeader } from '@atom/design-system';
import { useCallback } from 'react';

export const Header = () => {
  const onLogOut = useCallback(() => {
    redirectToURL('/login');
  }, []);

  return (
    <DesignSystemHeader
      avatarProps={{
        dropdownLinks: [
          {
            label: 'Settings'
          }
        ],

        bottomButtonLabel: 'Log Out',
        onBottomButtonClick: onLogOut,

        avatarLabel: 'User',
        dropdownTitle: 'dropdownTitle',
        onTopButtonClick: () => console.log('onTopButtonClick'),
        topButtonLabel: 'topButtonLabel',
        imageSource: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'
      }}
      notificationProps={{
        quantity: 10
      }}
    />
  );
};
