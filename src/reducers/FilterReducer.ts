import { UPDATE_FILTER, FilterAction } from "../actions/FilterAction";

export interface Filter {
  enabled: boolean;
  month: string;
  category: string;
}

export interface FilterReducerProps {
  filter: Filter;
}

const initialState: FilterReducerProps = {
  filter: { enabled: false, month: "", category: "" },
};

export const FilterReducer = (
  state: FilterReducerProps = initialState,
  action: FilterAction
): FilterReducerProps => {
  switch (action.type) {
    case UPDATE_FILTER: {
      return { ...state, filter: action.filter };
    }
    default:
      return state;
  }
};
