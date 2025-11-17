import { UserEntity } from '../entities';

export type CreateUserEntity = Omit<UserEntity, 'id'>;