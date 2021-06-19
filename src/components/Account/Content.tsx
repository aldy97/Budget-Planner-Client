import React, { useState, useEffect } from "react";
import CategoriesEdittor from "./CategoriesEdittor";
import { Layout, Input, Space, Button } from "antd";
import { message } from "antd";
import axios from "axios";
import Progress from "./Progress";
import { UPDATE_USER_INFO, UpdateUserInfo } from "../../actions/HomeAction";
import { User } from "../../reducers/HomeReducer";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "../../reducers/index";
import { URL } from "../../utils/constants";

const BASE_URL = process.env.NODE_ENV === "production" ? URL.production : URL.dev;

interface Error {
  isValid: boolean;
  errorMessage: string;
}

interface Request {
  _id: string;
  updatedFields: { budget: number; threshold: number };
}

interface ContenProps {
  user: User;
  updateUserInfo: (user: User) => void;
}

const Content: React.FC<ContenProps> = ({ user, updateUserInfo }: ContenProps) => {
  const { Content } = Layout;
  const [currBudget, setCurrBudget] = useState<string>(user.budget.toString());
  const [currThreshold, setCurrThrehold] = useState<number>(user.threshold);

  const [error, setError] = useState<Error>({ isValid: true, errorMessage: "" });

  // number only
  const reg = /^\d+$/;

  useEffect(() => {
    if (!error.isValid && reg.test(currBudget) && parseInt(currBudget) >= 0) {
      setError({ isValid: true, errorMessage: "" });
    }
  }, [currBudget]);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setCurrBudget(value);
  };

  const handleConfirmBtnClick = async (): Promise<void> => {
    // handles invalid input case:
    if (!reg.test(currBudget) || parseInt(currBudget) < 0) {
      setError({
        isValid: false,
        errorMessage: "Budget must be a positive whole number",
      });
      return;
    }

    const request: Request = {
      _id: user._id,
      updatedFields: { budget: parseInt(currBudget), threshold: currThreshold },
    };

    try {
      const response = await axios.put<{ user: User; message: string }>(
        `${BASE_URL}/api/updateUserInfo`,
        request
      );

      if (response.status === 200) {
        const user = response.data.user;
        updateUserInfo(user);
        message.success("Update success");
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error("Server error, pleae try again later");
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
            {!error.isValid && (
              <div style={{ color: "red", marginTop: 2 }}>{error.errorMessage}</div>
            )}
          </div>
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

      <div style={{ display: "flex" }}>
        <div
          className="site-layout-background"
          style={{
            flex: 1,
            padding: 30,
            minHeight: 360,
            marginTop: 30,
            width: 560,
          }}
        >
          <CategoriesEdittor type="expense"></CategoriesEdittor>
        </div>
        <div
          className="site-layout-background"
          style={{
            flex: 1,
            padding: 30,
            minHeight: 360,
            marginTop: 30,
            width: 560,
          }}
        >
          <CategoriesEdittor type="income"></CategoriesEdittor>
        </div>
      </div>
    </Content>
  );
};

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
