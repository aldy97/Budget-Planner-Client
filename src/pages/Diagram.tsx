import React from "react";
import SideMenu from "../components/SideMenu";
import { Layout } from "antd";
import Header from "../components/Header";
import Content from "../components/Diagram/Content";
import Footer from "../components/Footer";

function Diagram() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu selected={2}></SideMenu>
      <Layout className="site-layout">
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}

export default Diagram;
