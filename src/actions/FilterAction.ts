import { Filter } from "../reducers/FilterReducer";
export const UPDATE_FILTER = "update_filter";

export interface UpdateFilter {
  type: typeof UPDATE_FILTER;
  filter: Filter;
}

export type FilterAction = UpdateFilter;
