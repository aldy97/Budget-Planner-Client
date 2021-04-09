import React, { useState } from "react";
import { List, Divider, Input, Button, Space, message } from "antd";
import ListItem from "./ListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/index";
import { ExpenseCategories, IncomeCategories } from "../../utils/constants";
import { URL } from "../../utils/constants";
import {
  UpdateCategoriesList,
  UPDATE_CATEGORIES_LIST,
} from "../../actions/HomeAction";
import axios from "axios";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const BASE_URL = process.env.NODE_ENV === "production" ? URL.production : URL.dev;

type EdittorProps = {
  type: "expense" | "income";
  updateCategoriesList: (list: string[], recordType: "expense" | "income") => void;
};

const CategoriesEdittor: React.FC<EdittorProps> = (props: EdittorProps) => {
  const { type, updateCategoriesList } = props;
  const { userID, expenseList, incomeList } = useSelector((s: RootState) => {
    return {
      userID: s.HomeReducer.user._id,
      expenseList: s.HomeReducer.user.expenseList,
      incomeList: s.HomeReducer.user.incomeList,
    };
  });

  const itemList =
    type === "expense"
      ? expenseList || ExpenseCategories
      : incomeList || IncomeCategories;

  const [list, setList] = useState<string[]>(itemList);
  const [text, setText] = useState<string>("");

  const onAddBtnClick = (): void => {
    if (text) {
      if (list.includes(text)) {
        message.error("Duplicate appears");
        return;
      }
      setList([...list, text]);
      setText("");
    } else {
      message.warning("Category can not be empty");
    }
  };

  const onConfirmClick = async (): Promise<void> => {
    const reqestBody = {
      _id: userID,
      expenseList: type === "expense" ? list : expenseList,
      incomeList: type === "income" ? list : incomeList,
    };

    try {
      const response = await axios.put<{
        expenseList: string[];
        incomeList: string[];
      }>(`${BASE_URL}/api/updateCategories`, reqestBody);

      updateCategoriesList(response.data.expenseList, "expense");
      updateCategoriesList(response.data.incomeList, "income");
      message.success("Categories updated!");
    } catch (err) {
      message.error("Internal server error");
    }
  };

  const onDelClick = (word: string) => {
    setList(
      list.filter(w => {
        return w !== word;
      })
    );
  };

  return (
    <>
      <Divider orientation="left">
        {type === "expense" ? "Expense Categories" : "Income Categories"}
      </Divider>
      <List
        size="default"
        bordered
        dataSource={list}
        renderItem={item => (
          <ListItem onDelClick={onDelClick} itemName={item}>
            {item}
          </ListItem>
        )}
      ></List>
      <Space direction="vertical">
        <Space direction="horizontal" style={{ marginTop: 16 }}>
          <Input value={text} onChange={e => setText(e.target.value)}></Input>
          <Button type="primary" onClick={onAddBtnClick}>
            Add category
          </Button>
        </Space>
        <Button type="primary" onClick={onConfirmClick}>
          Confirm
        </Button>
      </Space>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateCategoriesList(list: string[], recordType: "expense" | "income") {
      const action: UpdateCategoriesList = {
        type: UPDATE_CATEGORIES_LIST,
        recordType,
        list,
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(CategoriesEdittor);
