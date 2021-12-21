import { PrimaryKey } from '@atom/common';
import { AutoMap } from '@automapper/classes';

export class GetBalanceViewModel {
  @AutoMap()
  providerId: PrimaryKey;
  @AutoMap()
  externalId: string;
  @AutoMap()
  name: string;
  @AutoMap()
  releaseDate: string;
  @AutoMap()
  volatilityId: PrimaryKey;
  @AutoMap()
  classId: PrimaryKey;
  @AutoMap()
  createdByUserId: PrimaryKey;
  @AutoMap()
  createdByUserEmail: string;

  rtp: PrimaryKey | '';
  hasDemo: '0' | '1';
  typeId: PrimaryKey;
  subTypeId: PrimaryKey;
}
