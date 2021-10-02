import { Key } from "protractor";
import { Role } from "./Role";

export interface UserList {
  id: number;
  username: string;
  password: string;
  lastlogin: string;
  role: Role[];
}
