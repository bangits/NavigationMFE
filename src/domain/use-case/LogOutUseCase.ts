import { inject, injectable } from 'inversify';
import { ILogOutRepository } from '../boundaries';

@injectable()
export class LogInUseCase {
  @inject('ILogOutRepository')
  private readonly logOutRepository: ILogOutRepository;

  logOut = async (): Promise<void> => {
    return this.logOutRepository.logOut();
  };
}
