import React from "react";
import SideMenu from "../components/SideMenu";
import { Layout } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/History/Content";

function Diagram(): JSX.Element {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu selected={3}></SideMenu>
      <Layout className="site-layout">
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}

export default Diagram;
