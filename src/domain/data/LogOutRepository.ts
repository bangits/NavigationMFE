import { injectable } from 'inversify';

@injectable()
export class LogOutRepository {
  logOut = async (): Promise<void> => {
    return Promise.resolve();
  };
}
