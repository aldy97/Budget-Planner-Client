import {
  UPDATE_BUDGET,
  UPDATE_BUDGET_THRESHOLD,
  AccountAction,
} from "../actions/AccountAction";

export interface AccountReducerProps {
  budget: number;
  threshold: number;
}

const initialState: AccountReducerProps = {
  budget: 0,
  threshold: 0,
};

export const AccountReducer = (
  state: AccountReducerProps = initialState,
  action: AccountAction
): AccountReducerProps => {
  switch (action.type) {
    case UPDATE_BUDGET: {
      return { ...state, budget: action.budget };
    }
    case UPDATE_BUDGET_THRESHOLD: {
      return { ...state, threshold: action.threshold };
    }
    default:
      return state;
  }
};
