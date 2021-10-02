import { UsersList } from "./UsersList";
import { Key } from "protractor";

export interface School {
  id: number;
  name: string;
  address: string;
  mobileno: number;
  email: string;
  phoneno: number;
  // roleid: string;
  // rolename: string;
  schoolname: string;
  //userid: number;
  // usersList: {
  //   [Key: number]: UsersList;
  // };
  usersList: UsersList [];
  jwtToken: string;
}
