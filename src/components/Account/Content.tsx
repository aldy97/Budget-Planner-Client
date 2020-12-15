import React from "react";
import { Layout, Input, Space, Button, message } from "antd";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface ContenProps {
  name?: string;
  email?: string;
}

function Content({ name, email }: ContenProps) {
  const { Content } = Layout;

  const handleConfirmBtnClick = () => {
    message.info("This feature is under construction");
  };

  return (
    <Content style={{ margin: "4px 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 30, minHeight: 360, marginTop: 30 }}
      >
        <Space direction="vertical" size="large">
          <div>
            <div>Name</div>
            <Input defaultValue={name}></Input>
          </div>
          <div>
            <div>Email</div>
            <Input defaultValue={email} style={{ width: 224 }} disabled></Input>
          </div>
          <div>
            <div>Set Monthly Budget</div>
            <Input prefix="$" suffix="CAD" />
          </div>
          <div>
            <div>New Password</div>
            <Input.Password
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            ></Input.Password>
          </div>
          <div>
            <div>Confirm Password</div>
            <Input.Password
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            ></Input.Password>
          </div>
          <Button onClick={handleConfirmBtnClick} type="primary">
            Confirm
          </Button>
        </Space>
      </div>
    </Content>
  );
}

const mapState = (state: RootState) => {
  return {
    name: state.HomeReducer.name,
    email: state.HomeReducer.email,
  };
};

export default connect(mapState, null)(Content);
