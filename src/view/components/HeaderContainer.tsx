import { AtomNavigationContext } from '@/adapter/react-context';
import { Balance } from '@atom/account-management';
import { AuthenticatedContext, oidcService } from '@atom/authorization';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Header } from './Header';

export const HeaderContainer = () => {
  const { user, updateUserInfo } = useContext(AuthenticatedContext);

  const { balanceSocketUseCase } = useContext(AtomNavigationContext);

  const [userBalance, setUserBalance] = useState({ money: 0, currency: '' });

  const onLogOut = useCallback(() => {
    oidcService.logOut();
  }, []);

  const updateBalanceInfo = useCallback(
    (balance: Balance) => {
      updateUserInfo({
        currencyId: balance.currencyId,
        currencyName: balance.currencyIso
      });

      setUserBalance({
        currency: balance.currencyIso,
        money: balance.balance
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
  }, [user]);

  useEffect(() => {
    getUserBalance();
  }, []);

  return <Header username={user.email} currency={userBalance.currency} money={userBalance.money} onLogOut={onLogOut} />;
};
