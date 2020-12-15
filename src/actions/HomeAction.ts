import { Record } from "../components/Overview/Content";

export const UPDATE_USER_EMAIL = "update user email";
export const UPDATE_USER_NAME = "update user name";
export const UPDATE_USER_ID = "update user id";
export const UPDATE_RECORDS = "update records";

export interface UpdateEmail {
  type: typeof UPDATE_USER_EMAIL;
  email: string;
}

export interface UpdateName {
  type: typeof UPDATE_USER_NAME;
  name: string;
}

export interface UpdateUID {
  type: typeof UPDATE_USER_ID;
  uid: string;
}

export interface UpdateRecords {
  type: typeof UPDATE_RECORDS;
  records: Record[];
}

export type HomeAction = UpdateEmail | UpdateName | UpdateUID | UpdateRecords;
