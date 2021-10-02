import { Key } from "protractor";
import { UserList } from "./UserList";

export interface School {
  jwtToken: string;
  school: SchoolObject[];
}

export interface SchoolObject {
  id: number;
  name: string;
  address: string;
  mobileno: number;
  email: string;
  phoneno: number;
  userList: UserList [];
}


