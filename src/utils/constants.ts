export const COLORS = {
  THEMEBLUE: "#1890ff",
  UNSELECTEDOPTION: "#000000a6",
  ORANGE: "#ffa940",
};

export const ExpenseCategories = [
  "Commute",
  "Meals",
  "Shoppings",
  "Grocery",
  "Snacks",
  "Sports",
  "Entertainment",
  "Phone Plan",
  "Make up",
  "Hotel",
  "Clothing",
  "Social",
  "Travelling",
  "Digitals",
  "Car",
  "Gas",
  "Medical Care",
  "Pets",
  "Gifts",
  "Maintainance",
];

export const IncomeCategories = [
  "Salary",
  "Part time",
  "Investment",
  "Gifts",
  "Others",
];

// production server and local dev server
export const URL = {
  production: "https://budget-planner-server.herokuapp.com",
  dev: "http://localhost:7001",
};

export const ErrorMessages = {
  MISSING_CATEGORY: "Category is not selected",
  INVALID_DATE: "The date can not be future date",
  MISSING_DATE: "Record date is not determined",
  INVALID_AMOUNT: "Amount must be a positive number",
  MISSING_AMOUNT: "Amount must be provided",
};
