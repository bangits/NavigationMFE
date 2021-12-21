import { BalanceSocketUseCase } from '@/domain';
import { BalanceSocketService, configureSharedDependencies, IBalanceSocketService } from '@atom/account-management';
import { Container } from 'inversify';
import { DI_CONSTANTS } from './constants';

export class DiContainer {
  public diContainer: Container;

  public configure = () => {
    this.diContainer = new Container({
      defaultScope: 'Singleton'
    });

    // Services
    this.diContainer.bind<IBalanceSocketService>(DI_CONSTANTS.BalanceSocketService).to(BalanceSocketService);

    // Repositories

    // Use cases
    this.diContainer.bind<BalanceSocketUseCase>(DI_CONSTANTS.BalanceSocketUseCase).to(BalanceSocketUseCase);

    // Account management dependencies
    configureSharedDependencies(this.diContainer);
  };
}

export const containerInstance = new DiContainer();
