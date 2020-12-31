export const UPDATE_BUDGET = "update_budget";
export const UPDATE_BUDGET_THRESHOLD = "update_budget_threshold";

export interface UpdateBudget {
  type: typeof UPDATE_BUDGET;
  budget: number;
}

export interface UpdateBudgetThreshold {
  type: typeof UPDATE_BUDGET_THRESHOLD;
  threshold: number;
}

export type AccountAction = UpdateBudget | UpdateBudgetThreshold;
