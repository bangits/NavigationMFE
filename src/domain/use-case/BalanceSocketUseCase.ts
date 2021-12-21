import { DI_CONSTANTS } from '@/di/constants';
import { Balance, IBalanceSocketService } from '@atom/account-management';
import { PrimaryKey } from '@atom/common';
import { inject, injectable } from 'inversify';

@injectable()
export class BalanceSocketUseCase {
  @inject(DI_CONSTANTS.BalanceSocketService)
  private readonly balanceSocketService: IBalanceSocketService;

  getBalance = (userId: PrimaryKey, isDefault = true): Promise<Balance | Balance[]> => {
    return new Promise((resolve) => {
      (async () => {
        await this.balanceSocketService.connectToBalanceHub();
        await this.balanceSocketService.getBalance(userId, (balances) => {
          resolve(isDefault ? balances.find((balance) => balance.isBalanceDefault) : balances);
        });
      })();
    });
  };

  subscribeToBalance = (cb: (balance: Balance) => void) => {
    this.balanceSocketService.subscribeForBalanceUpdate(cb);
  };
}
