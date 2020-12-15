import { Record } from "../components/Overview/Content";
import {
  UPDATE_USER_EMAIL,
  UPDATE_USER_NAME,
  UPDATE_USER_ID,
  UPDATE_RECORDS,
  HomeAction,
} from "../actions/HomeAction";

export interface HomeReducerProps {
  email: string;
  name: string;
  uid: string;
  records: Record[];
}

const initialState: HomeReducerProps = {
  email: "",
  name: "",
  uid: "",
  records: [],
};

export const HomeReducer = (
  state: HomeReducerProps = initialState,
  action: HomeAction
): HomeReducerProps => {
  switch (action.type) {
    case UPDATE_USER_EMAIL: {
      return { ...state, email: action.email };
    }
    case UPDATE_USER_NAME: {
      return { ...state, name: action.name };
    }
    case UPDATE_USER_ID: {
      return { ...state, uid: action.uid };
    }
    case UPDATE_RECORDS: {
      return { ...state, records: action.records };
    }
    default:
      return state;
  }
};
