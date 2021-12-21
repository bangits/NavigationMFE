import { BalanceSocketUseCase } from '@/domain';
import { createContext } from 'react';

export interface IAtomNavigationContext {
  balanceSocketUseCase: BalanceSocketUseCase;
}

export const AtomNavigationContext = createContext<IAtomNavigationContext>(null);
