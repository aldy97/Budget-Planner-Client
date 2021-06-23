import React from "react";

import Account from "../components/Account/Content";
import Diagram from "../components/Diagram/Content";
import OverView from "../components/Overview/Content";
import History from "../components/History/Content";

import SideMenu from "../components/SideMenu";
import { Layout } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Switch, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const Home: React.FC = () => {
  const { hideSideMenu } = useSelector((s: RootState) => {
    return { hideSideMenu: s.HomeReducer.user.hideSideMenu };
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!hideSideMenu && <SideMenu></SideMenu>}
      <Layout className="site-layout">
        <Header></Header>
        <Switch>
          <Route path="/home/overview" component={OverView}></Route>
          <Route path="/home/diagram" component={Diagram}></Route>
          <Route path="/home/history" component={History}></Route>
          <Route path="/home/account" component={Account}></Route>
        </Switch>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
