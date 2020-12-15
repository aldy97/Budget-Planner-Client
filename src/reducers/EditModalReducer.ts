import {
  UPDATE_RECORD_ID,
  EDIT_TITLE,
  EDIT_RECORD_DATE,
  EDIT_RECORD_TYPE,
  EDIT_CATEGORY,
  EDIT_AMOUNT,
  EDIT_DESCRIPTION,
  CLEAR_STATUS,
  EditModalAction,
} from "../actions/EditModallAction";

export interface EditModalReducerProps {
  recordID: string;
  title: string;
  date: string;
  recordType: string;
  category: string;
  amount: number;
  description: string;
}

const initialState: EditModalReducerProps = {
  recordID: "",
  title: "",
  date: "",
  recordType: "",
  category: "",
  amount: 0,
  description: "",
};

export const EditModalReducer = (
  state: EditModalReducerProps = initialState,
  action: EditModalAction
): EditModalReducerProps => {
  switch (action.type) {
    case UPDATE_RECORD_ID: {
      return { ...state, recordID: action.recordID };
    }
    case EDIT_TITLE: {
      return { ...state, title: action.title };
    }
    case EDIT_RECORD_DATE: {
      return { ...state, date: action.date };
    }
    case EDIT_RECORD_TYPE: {
      return { ...state, recordType: action.recordType };
    }
    case EDIT_AMOUNT: {
      return { ...state, amount: action.amount };
    }
    case EDIT_CATEGORY: {
      return { ...state, category: action.category };
    }
    case EDIT_DESCRIPTION: {
      return { ...state, description: action.description };
    }
    case CLEAR_STATUS: {
      return initialState;
    }
    default:
      return state;
  }
};
