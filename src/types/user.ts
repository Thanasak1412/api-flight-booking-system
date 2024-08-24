export type IUser = {
  name: string;
  email: string;
  password: string;
  booking: string[];
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
};

// Put all user instance methods in this interface
export interface IUserMethods {
  comparePassword(inputPassword: string): Promise<boolean>;
}

export enum UserRoles {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}
