export const USERS_TABLE_NAME = 'users';

export class UserEntity {
  public id: string;
  public username: string;
  public password: string;
  public created_at: Date;
  public updated_at: Date;
}

export type UserEntityWithoutTimestamps = Omit<
  UserEntity, 'created_at' | 'updated_at'
>;