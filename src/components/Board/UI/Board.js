import React, { useState } from "react";
import List from "./List";
import "../Styles/Board.css";
import "../Styles/Add.css";
import PerTextField from "./PerTextField";
import StyledTextField from "../../Password/StyledTextField";
import { data, statuses } from "../../../data";
import { v4 as uuid } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Board = () => {
  const [items, setItems] = useState(data);
  const [lists, setLists] = useState(statuses);
  const [isclicked, setIsclicked] = useState(false);
  const [inputName, setInputName] = useState("");
  const onDrop = (item, monitor, status) => {
    const mapping = lists.find((si) => si.status === status);
    const dragIndex = items.findIndex((i) => i.id === item.id);
    if (items[dragIndex].status == status) {
      return;
    }
    const hoverIndex = items.findIndex((i) => i.status === status);
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status, icon: mapping.icon });
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    if (dragIndex === hoverIndex) {
      return;
    }
    const item = items[dragIndex];
    console.log("all cards");
    console.log(items);
    console.log(item);
    console.log("dragIndex", dragIndex);
    console.log("hoverIndex", hoverIndex);
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  const clickHandler = () => {
    setIsclicked(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLists((pervList) => {
      return [
        ...pervList,
        {
          title: inputName,
          id: uuid(),
          status: inputName,
          icon: "",
          color: "",
        },
      ];
    });
    console.log("in submit list handler");
    console.log(lists);
    setIsclicked(false);
    setInputName("");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="list-container">
        <div className="list-container-minor">
          {lists.map((list) => (
            <List
              title={list.title}
              status={list.status}
              icon={list.icon}
              key={list.id}
              items={items.filter((i) => i.status === list.status)}
              all_cards={items}
              onDrop={onDrop}
              moveItem={moveItem}
              setItems={setItems}
              lists={lists}
            />
          ))}
        </div>
        <div className="add-container">
          {!isclicked ? (
            <div className="add-button">
              <button className="add-list_button" onClick={clickHandler}>
                <p className="add-list-button-title">+ ایجاد لیست</p>
              </button>
            </div>
          ) : (
            <div className="add-list-form">
              <form className="add-form" onSubmit={submitHandler}>
                <PerTextField>
                  <StyledTextField
                    margin="normal"
                    label="اسم لیست"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="اسم لیست را در این بخش بنویسید"
                    sx={{ mt: 1 }}
                  />
                </PerTextField>
                <button type="submit" className="form-button">
                  افزودن
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default Board;
