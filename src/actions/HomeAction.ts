import { User } from "../reducers/HomeReducer";
import { Record } from "../components/Overview/Content";

export const UPDATE_USER_INFO = "update user information";
export const UPDATE_RECORDS = "update records";
export const UPDATE_CATEGORIES_LIST = "update categories list";

export const SET_LOADED = "set loaded";

export interface UpdateUserInfo {
  type: typeof UPDATE_USER_INFO;
  user: User;
}

export interface UpdateRecords {
  type: typeof UPDATE_RECORDS;
  records: Record[];
}

export interface UpdateCategoriesList {
  type: typeof UPDATE_CATEGORIES_LIST;
  list: string[];
  recordType: "expense" | "income";
}

export interface SetLoaded {
  type: typeof SET_LOADED;
}

export type HomeAction =
  | UpdateUserInfo
  | UpdateRecords
  | UpdateCategoriesList
  | SetLoaded;
