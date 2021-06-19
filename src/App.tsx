import React, { useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BackTop } from "antd";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./reducers/index";

export const store = configureStore();

const App: React.FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      document.title = "Budget Planner Development";
    }
  }, []);

  return (
    <Provider store={store}>
      <BackTop />
      <BrowserRouter>
        <Route path="/" exact component={() => <Login></Login>}></Route>
        <Route path="/home" component={Home}></Route>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
