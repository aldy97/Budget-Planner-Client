import { Record } from "../components/Overview/Content";
import { UPDATE_USER_INFO, UPDATE_RECORDS, HomeAction } from "../actions/HomeAction";

export interface User {
  name: string;
  _id: string;
  bio: string;
  email: string;
  password: string;
  budget: number;
  threshold: number;
  records: Record[];
  expenseList: string[];
  incomeList: string[];
  createdOn: string;
  updatedOn: string;
}

export interface HomeReducerProps {
  user: User;
  records: Record[];
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
    records: [],
    expenseList: [],
    incomeList: [],
    createdOn: "",
    updatedOn: "",
  },
  records: [],
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
    default:
      return state;
  }
};
