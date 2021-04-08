export class User {
  id: number;
  userFirstName: string;
  userLastName: string;
  email: string;
  password: string;
  status: boolean;
  passwordHash: string;
  passwordSalt: string;
  userFindexScore: number;
}
