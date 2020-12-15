import {
  TOGGLEFILTER,
  CHOOSEMONTH,
  CHOOSECATEGORY,
  FilterAction,
} from "../actions/FilterAction";

export interface FilterReducerProps {
  enabled: boolean;
  month: string;
  category: string;
}

const initialState: FilterReducerProps = {
  enabled: false,
  month: "",
  category: "",
};

export const FilterReducer = (
  state: FilterReducerProps = initialState,
  action: FilterAction
): FilterReducerProps => {
  switch (action.type) {
    case TOGGLEFILTER: {
      return { ...state, enabled: action.enabled };
    }
    case CHOOSEMONTH: {
      return { ...state, month: action.month };
    }
    case CHOOSECATEGORY: {
      return { ...state, category: action.category };
    }
    default:
      return state;
  }
};
