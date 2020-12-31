import { applyMiddleware, combineReducers, createStore, Middleware } from "redux";
import { HomeReducer, HomeReducerProps } from "./HomeReducer";
import { ModalReducer, ModalReducerProps } from "./ModalReducer";
import { FilterReducer, FilterReducerProps } from "./FilterReducer";
import { EditModalReducer, EditModalReducerProps } from "./EditModalReducer";
import { AccountReducer, AccountReducerProps } from "./AccountReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export interface RootState {
  HomeReducer: HomeReducerProps;
  ModalReducer: ModalReducerProps;
  FilterReducer: FilterReducerProps;
  EditModalReducer: EditModalReducerProps;
  AccountReducer: AccountReducerProps;
}

const rootReducer = combineReducers({
  HomeReducer,
  ModalReducer,
  FilterReducer,
  EditModalReducer,
  AccountReducer,
});

export const configureStore = () => {
  const middlewares: Middleware[] = [];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));
  return store;
};
