import { UserEntityWithoutTimestamps } from '../entities';

export type CreateUserEntity = Omit<UserEntityWithoutTimestamps, 'id'>;
