import { User } from "../reducers/HomeReducer";
import { Record } from "../components/Overview/Content";

export const UPDATE_USER_INFO = "update user information";
export const UPDATE_RECORDS = "update records";

export interface UpdateUserInfo {
  type: typeof UPDATE_USER_INFO;
  user: User;
}

export interface UpdateRecords {
  type: typeof UPDATE_RECORDS;
  records: Record[];
}

export type HomeAction = UpdateUserInfo | UpdateRecords;
