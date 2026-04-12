import { UserRole } from '../enums/user-role';

export class User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}
