import { AtomNavigationContext } from '@/adapter/react-context';
import { Balance } from '@atom/account-management';
import { AuthenticatedContext } from '@atom/authorization';
import { HttpService, historyService } from '@atom/common';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Header } from './Header';
import { ROUTES as AUTHORIZATION_ROUTES, LOCAL_STORAGE_CONSTANTS } from '@atom/authorization';
import { PasswordChangeTypes } from '@atom/user-management';

export const HeaderContainer = () => {
  const { user, updateUserInfo } = useContext(AuthenticatedContext);

  const { balanceSocketUseCase } = useContext(AtomNavigationContext);

  const [userBalance, setUserBalance] = useState({ money: 0, currency: '' });

  const onLogOut = useCallback(() => {
    // oidcService.logOut();
    HttpService.logoutCb();
  }, []);

  const updateBalanceInfo = useCallback(
    (balance: Balance) => {
      updateUserInfo({
        currencyId: balance?.currencyId,
        currencyName: balance?.currencyIso
      });

      setUserBalance({
        currency: balance?.currencyIso,
        money: balance?.balance
      });
    },
    [updateUserInfo]
  );

  const getUserBalance = useCallback(() => {
    balanceSocketUseCase.getBalance(user.userId).then((balance) => {
      if (Array.isArray(balance)) return;

      updateBalanceInfo(balance);

      balanceSocketUseCase.subscribeToBalance((balance) => {
        updateBalanceInfo(balance);
      });
    });
  }, [updateBalanceInfo, balanceSocketUseCase]);

  useEffect(() => {
    if (user.currencyName && user.currencyName !== userBalance.currency) {
      getUserBalance();
    }

    if (
      user &&
      // @ts-ignore
      (user.passwordChangeTypeId === PasswordChangeTypes.FORCED ||
        // @ts-ignore
        user.passwordChangeTypeId === PasswordChangeTypes.RECOMENDED) &&
      // @ts-ignore
      !localStorage.getItem(LOCAL_STORAGE_CONSTANTS.IS_CHANGE_PASSWORD_SKIPPED)
    ) {
      historyService.redirectToURL(AUTHORIZATION_ROUTES.baseUrl + AUTHORIZATION_ROUTES.passChange);
    }
  }, [user]);

  useEffect(() => {
    getUserBalance();
  }, []);

  return <Header username={user.email} currency={userBalance.currency} money={userBalance.money} onLogOut={onLogOut} />;
};
