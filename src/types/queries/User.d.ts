import { PreUser, User } from './..';

export interface GetPreUsersData {
  getPreUsers: {
    count: number;
    data: PreUser[];
  };
}

export interface GetUsersData {
  getAllUsers: {
    count: number;
    data: User[];
  };
}
