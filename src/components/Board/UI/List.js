import React, { useState, useRef } from "react";
import "../Styles/List.css";
import "../Styles/Add.css";
import Card from "./Card";
import DropWrapper from "./DropWrapper";
import Col from "./Col";
import PerTextField from "./PerTextField";
import StyledTextField from "../../Password/StyledTextField";
import { v4 as uuid } from "uuid";

const List = (props) => {
  const [isclicked, setIsclicked] = useState(false);
  const [inputName, setInputName] = useState("");
  // console.log("all cards");
  // console.log(props.all_cards);
  const clickHandler = () => {
    setIsclicked(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.setItems((pervList) => {
      return [
        ...pervList,
        {
          title: inputName,
          id: uuid(),
          icon: props.icon,
          status: props.status,
          content: "nothing",
        },
      ];
    });
    setIsclicked(false);
    setInputName("");
  };

  return (
    <div className="list">
      <div className="header">
        <p className="header-title">{props.title}</p>
        <button className="header-button">
          <p className="button-title">...</p>
        </button>
      </div>
      <div className="card-list">
        <DropWrapper
          onDrop={props.onDrop}
          status={props.status}
          lists={props.lists}
        >
          <Col>
            {props.items.map((i, idx) => {
              const myindex = props.all_cards.findIndex(
                (card) => card.id === i.id
              );
              return (
                <Card
                  key={i.id}
                  item={i}
                  ind={myindex}
                  moveItem={props.moveItem}
                  status={props.status}
                  all_cards={props.all_cards}
                />
              );
            })}
          </Col>
        </DropWrapper>
      </div>
      {/* <div className="space"></div> */}
      <div className="add-card">
        {!isclicked ? (
          <div className="add-button">
            <button className="add-card_button" onClick={clickHandler}>
              + افزودن کارت
            </button>
          </div>
        ) : (
          <div className="add-list-form">
            <form className="add-form" onSubmit={submitHandler}>
              <PerTextField>
                <StyledTextField
                  margin="normal"
                  label="اسم کارت"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="اسم کارت را در این بخش بنویسید"
                  sx={{ mt: 0 }}
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
  );
};

export default List;
