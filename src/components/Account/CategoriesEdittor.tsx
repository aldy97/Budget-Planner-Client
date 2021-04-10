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

const MAX_LIST_LENGTH = 20;

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
      ? expenseList && expenseList.length > 0
        ? expenseList
        : ExpenseCategories
      : incomeList && incomeList.length > 0
      ? incomeList
      : IncomeCategories;

  const [list, setList] = useState<string[]>(itemList);
  const [text, setText] = useState<string>("");
  const [updated, setUpdated] = useState(false);

  const onAddBtnClick = (): void => {
    if (text) {
      if (list.includes(text)) {
        message.error("Duplicate appears");
        return;
      }

      if (list.length === MAX_LIST_LENGTH) {
        message.error("Reached max list size");
        return;
      }

      setList([...list, text]);
      setText("");
      setUpdated(true);
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
      setUpdated(false);
    } catch (err) {
      message.error("Internal server error");
    }
  };

  const onDelClick = (word: string): void => {
    setList(
      list.filter(w => {
        return w !== word;
      })
    );
    setUpdated(true);
  };

  const onArrowUp = (index: number): void => {
    const temp = list[index - 1];
    const listCopy = [...list];
    listCopy[index - 1] = list[index];
    listCopy[index] = temp;
    setList(listCopy);
    setUpdated(true);
  };

  const onArrowDown = (index: number): void => {
    const temp = list[index + 1];
    const listCopy = [...list];
    listCopy[index + 1] = list[index];
    listCopy[index] = temp;
    setList(listCopy);
    setUpdated(true);
  };

  return (
    <>
      <Divider orientation="left">
        {type === "expense"
          ? `Expense Categories (${MAX_LIST_LENGTH - list.length} remaining)`
          : `Income Categories (${MAX_LIST_LENGTH - list.length} remaining)`}
      </Divider>
      <List
        size="default"
        bordered
        dataSource={list}
        renderItem={(item, index) => (
          <ListItem
            index={index}
            onDelClick={onDelClick}
            onArrowUp={onArrowUp}
            onArrowDown={onArrowDown}
            isFirst={index === 0}
            isLast={index === list.length - 1}
            itemName={item}
          >
            {item}
          </ListItem>
        )}
      ></List>
      <Space direction="vertical">
        <Space direction="horizontal" style={{ marginTop: 16 }}>
          <Input value={text} onChange={e => setText(e.target.value)}></Input>
          <Button type="primary" onClick={onAddBtnClick}>
            Add new category
          </Button>
        </Space>
        <Button type="primary" onClick={onConfirmClick} disabled={!updated}>
          Confirm change
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
