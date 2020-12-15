export const TOGGLEFILTER = "toogle_filter";
export const CHOOSEMONTH = "choose_month";
export const CHOOSECATEGORY = "choose_category";

export interface ToggleFilter {
  type: typeof TOGGLEFILTER;
  enabled: boolean;
}

export interface ChooseMonth {
  type: typeof CHOOSEMONTH;
  month: string;
}

export interface ChooseCategory {
  type: typeof CHOOSECATEGORY;
  category: string;
}

export type FilterAction = ToggleFilter | ChooseCategory | ChooseMonth;
