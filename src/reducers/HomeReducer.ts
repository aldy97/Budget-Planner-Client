import { Record } from "../components/Overview/Content";
import {
  UPDATE_USER_INFO,
  UPDATE_RECORDS,
  HomeAction,
  UPDATE_CATEGORIES_LIST,
  SET_LOADED,
} from "../actions/HomeAction";

export interface User {
  name: string;
  _id: string;
  bio: string;
  email: string;
  password: string;
  budget: number;
  threshold: number;
  showNumber: boolean;
  hideSideMenu: boolean;
  records: Record[];
  expenseList: string[];
  incomeList: string[];
  createdOn: string;
  updatedOn: string;
}

export interface HomeReducerProps {
  user: User;
  records: Record[];
  loaded: boolean;
}

const initialState: HomeReducerProps = {
  user: {
    name: "",
    _id: "",
    bio: "",
    email: "",
    password: "",
    budget: 0,
    threshold: 0,
    showNumber: true,
    hideSideMenu: false,
    records: [],
    expenseList: [],
    incomeList: [],
    createdOn: "",
    updatedOn: "",
  },
  records: [],
  loaded: false,
};

export const HomeReducer = (
  state: HomeReducerProps = initialState,
  action: HomeAction
): HomeReducerProps => {
  switch (action.type) {
    case UPDATE_USER_INFO: {
      return { ...state, user: action.user };
    }
    case UPDATE_RECORDS: {
      return { ...state, records: action.records };
    }
    case UPDATE_CATEGORIES_LIST: {
      const newUser = state.user;
      if (action.recordType === "expense") {
        newUser.expenseList = action.list;
      } else {
        newUser.incomeList = action.list;
      }
      return { ...state, user: newUser };
    }
    case SET_LOADED: {
      return { ...state, loaded: true };
    }
    default:
      return state;
  }
};
