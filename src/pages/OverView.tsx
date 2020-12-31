import React from "react";
import SideMenu from "../components/SideMenu";
import { Layout } from "antd";
import Content from "../components/Overview/Content";
import Header from "../components/Header";
import Footer from "../components/Footer";

function OverView(): JSX.Element {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu selected={1}></SideMenu>
      <Layout className="site-layout">
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}

export default OverView;
