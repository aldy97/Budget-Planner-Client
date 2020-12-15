export const UPDATE_RECORD_ID = "update_record_id";
export const EDIT_TITLE = "edit_title";
export const EDIT_RECORD_DATE = "edit_record_date";
export const EDIT_RECORD_TYPE = "edit_record_type";
export const EDIT_CATEGORY = "edit_category";
export const EDIT_AMOUNT = "edit_amount";
export const EDIT_DESCRIPTION = "edit_description";
export const CLEAR_STATUS = "clear_status";

export interface UpdateRecordID {
  type: typeof UPDATE_RECORD_ID;
  recordID: string;
}

export interface EditTitle {
  type: typeof EDIT_TITLE;
  title: string;
}

export interface EditRecordDate {
  type: typeof EDIT_RECORD_DATE;
  date: string;
}

export interface EditRecordType {
  type: typeof EDIT_RECORD_TYPE;
  recordType: string;
}

export interface EditCategory {
  type: typeof EDIT_CATEGORY;
  category: string;
}

export interface EditAmount {
  type: typeof EDIT_AMOUNT;
  amount: number;
}

export interface EditDescription {
  type: typeof EDIT_DESCRIPTION;
  description: string;
}

export interface ClearStatus {
  type: typeof CLEAR_STATUS;
}

export type EditModalAction =
  | UpdateRecordID
  | EditTitle
  | EditRecordDate
  | EditRecordType
  | EditAmount
  | EditCategory
  | EditDescription
  | ClearStatus;
