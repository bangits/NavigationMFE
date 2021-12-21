import { DiContainer } from '@/di';
import { DI_CONSTANTS } from '@/di/constants';
import { FC, useEffect, useState } from 'react';
import { AtomNavigationContext } from './AtomNavigationContext';

export const AtomNavigationProvider: FC = ({ children }) => {
  const [containerInstance, setContainerInstance] = useState<DiContainer>(null);

  useEffect(() => {
    const containerInstance = new DiContainer();

    containerInstance.configure();

    setContainerInstance(containerInstance);
  }, []);

  if (!containerInstance) return null;

  return (
    <AtomNavigationContext.Provider
      value={{
        balanceSocketUseCase: containerInstance.diContainer.get(DI_CONSTANTS.BalanceSocketUseCase)
      }}>
      {children}
    </AtomNavigationContext.Provider>
  );
};
