export enum UserRoleEnum {
  ADMIN = 'admin',
  RM = 'rm',
}

export interface AgentInterface {
  id: number;
  email: string;
  fname: string;
  lname: string;
  role?: UserRoleEnum;
  phoneNumber?: string | null;
}
