import React from "react";
import SideMenu from "../components/SideMenu";
import { Layout } from "antd";
import Content from "../components/Account/Content";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Account() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu selected={4}></SideMenu>
      <Layout className="site-layout">
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}

export default Account;
