import React from "react";
import Login from "./pages/Login";
import OverView from "./pages/OverView";
import Diagram from "./pages/Diagram";
import History from "./pages/History";
import Account from "./pages/Account";
import { BackTop } from "antd";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./reducers/index";

export const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BackTop />
      <BrowserRouter>
        <Route path="/" exact component={() => <Login></Login>}></Route>
        <Route
          path="/overview"
          exact
          component={() => <OverView></OverView>}
        ></Route>
        <Route path="/diagram" exact component={() => <Diagram></Diagram>}></Route>
        <Route path="/history" exact component={() => <History></History>}></Route>
        <Route path="/account" exact component={() => <Account></Account>}></Route>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
