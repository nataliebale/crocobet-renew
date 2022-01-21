export interface UserPPData {
  personalNumber: string;
  pinCode: string;
}
export type UserPPDataWithHash = UserPPData & { hash: string };
