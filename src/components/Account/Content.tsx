import React, { useState } from "react";
import { Layout, Input, Space, Button } from "antd";
import { message } from "antd";
import axios from "axios";
import Progress from "./Progress";
import { UPDATE_USER_INFO, UpdateUserInfo } from "../../actions/HomeAction";
import { User } from "../../reducers/HomeReducer";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";

interface ContenProps {
  user: User;
  updateUserInfo: (user: User) => void;
}

function Content({ user, updateUserInfo }: ContenProps) {
  const { Content } = Layout;
  const [currBudget, setCurrBudget] = useState<number>(user.budget);
  const [currThreshold, setCurrThrehold] = useState<number>(user.threshold);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrBudget(parseInt(e.target.value));
  };

  const handleConfirmBtnClick = async () => {
    if (currBudget < 0) {
      message.error("Budget must be greater than 0");
      return;
    }
    const request = {
      _id: user._id,
      updatedFields: { budget: currBudget, threshold: currThreshold },
    };
    const response = await axios.put("/api/updateUserInfo", request);
    if (response.data.status) {
      message.success(response.data.message);
    } else {
      message.error(response.data.message);
    }
  };

  return (
    <Content style={{ margin: "4px 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 30, minHeight: 360, marginTop: 30 }}
      >
        <Space direction="vertical" size="large">
          <div>
            <div>Name:</div>
            <Input defaultValue={user.name} disabled data-test="name"></Input>
          </div>
          <div>
            <div>Email:</div>
            <Input defaultValue={user.email} style={{ width: 224 }} disabled></Input>
          </div>
          <div>
            <div>Set monthly budget:</div>
            <Input
              defaultValue={currBudget}
              prefix="$"
              suffix="CAD"
              onChange={handleBudgetChange}
            />
          </div>
          {/* <div>
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
          </div> */}
          <div>
            <div>Set reminder for my budget:</div>
            <Progress
              threshold={currThreshold}
              changeThreshold={setCurrThrehold}
            ></Progress>
          </div>
          <Button type="primary" onClick={handleConfirmBtnClick}>
            Confirm
          </Button>
        </Space>
      </div>
    </Content>
  );
}

const mapState = (state: RootState) => {
  return {
    user: state.HomeReducer.user,
  };
};

const mapDispatch = (dispatch: Dispatch) => {
  return {
    updateUserInfo(user: User) {
      const action: UpdateUserInfo = {
        type: UPDATE_USER_INFO,
        user,
      };
      dispatch(action);
    },
  };
};

export default connect(mapState, mapDispatch)(Content);
