import { Key } from "protractor";
import { Role } from "./Role";

export interface UsersList {
  userid: number;
  username: string;
  password: string;
  lastlogin: string;
  role: Role[];
  //roleid: number;
  // role: {
  //   [Key: number]: Role
  // };
}
