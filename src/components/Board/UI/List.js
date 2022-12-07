import React, { useState, useEffect } from "react";
import "../Styles/List.css";
import Card from "./Card";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import Popover from "@mui/material/Popover";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import axios from "axios";
import Loading from "../../Shared/Loading";
import { toast, ToastContainer } from "react-toastify";
import "../../../styles/ReactToastify.css";

const List = (props) => {
  const [cards, setCards] = useState(props.card);
  const [isclicked, setIsclicked] = useState(false);
  const [inputName, setInputName] = useState("");
  const [isFail, setIsFail] = useState(false);
  const [isPost, setIsPost] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {}, [isPost]);

  const optionClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const optionsHandler = () => {
    setAnchorEl(null);
  };

  const clickHandler = () => {
    setIsclicked(!isclicked);
  };

  const deleteListHandler = () => {
    console.log("teksjasda");
    setIsPost(true);
    reqDeleteList(props.id);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const reqCreateCard = async (data, id) =>
    await axios
      .post(`http://127.0.0.1:8000/workspaces/board/${id}/create_task/`, data)
      .then(() => {
        setIsFail(true);
        toast.success("کارت با موفقیت ساخته شد", {
          position: toast.POSITION.TOP_CENTER,
          rtl: true,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsFail(true);
          toast.error("عملیات با خطا مواجه شد", {
            position: toast.POSITION.TOP_CENTER,
            rtl: true,
          });
        }
      })
      .finally(() => {
        setIsPost(null);
        props.onPost(true);
      });

  const reqDeleteList = async (id) =>
    await axios
      .delete(`http://127.0.0.1:8000/workspaces/tasklist/${id}/delete_tasklist/`)
      .then(() => {
        setIsFail(true);
        toast.success("لیست با موفقیت حذف شد", {
          position: toast.POSITION.TOP_CENTER,
          rtl: true,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsFail(true);
          toast.error("عملیات با خطا مواجه شد", {
            position: toast.POSITION.TOP_CENTER,
            rtl: true,
          });
        }
      })
      .finally(() => {
        setIsPost(null);
        props.onPost(true);
      });

  const submitHandler = (event) => {
    event.preventDefault();
    // setCards((pervList) => {
    //   return [...pervList, { name: inputName, id: keycard.toString() }];
    // });
    const data = new FormData();
    data.append("title", inputName);
    setIsPost(true);
    reqCreateCard(data, props.id);
    setIsclicked(false);
    setInputName("");
    // keycard++;
  };

  return (
    <div className="board_list">
      {isPost ? <Loading /> : null}
      {isFail ? (
        <ToastContainer autoClose={5000} style={{ fontSize: "1.2rem" }} />
      ) : null}
      <div className="board_header">
        <p className="board_header-title">{props.name}</p>
        <button className="board_header-button" onClick={optionClickHandler}>
          <p className="board_button-title">...</p>
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={optionsHandler}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="board_option">
            <p className="board_option-text board_option-title">
              فهرست اقدامات لیست
            </p>
            <div className="board_option-button-container">
              <button className="board_option-button" onClick={clickHandler}>
                <p className="board_option-text">افزودن کارت</p>
              </button>
              <button
                className="board_option-button"
                onClick={deleteListHandler}
              >
                <p className="board_option-text">حذف کردن لیست</p>
              </button>
            </div>
          </div>
        </Popover>
      </div>
      <div className="board_card-list">
        {cards.map((card, index) => (
          <Card name={card.title} key={uuid()} id={card.id} index={index} />
        ))}
      </div>
      {/* <div className="board_space"></div> */}
      <div className="board_add-card">
        {!isclicked ? (
          <div className="board_add-button">
            <button className="board_add-card_button" onClick={clickHandler}>
              + افزودن کارت
            </button>
          </div>
        ) : (
          <div className="board_add-list-form">
            <form className="board_add-form-card" onSubmit={submitHandler}>
              <PerTextField>
                <StyledTextField
                  margin="normal"
                  label="اسم کارت"
                  variant="filled"
                  required
                  fullWidth
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="اسم کارت را در این بخش بنویسید"
                  sx={{
                    backgroundColor: "#132F4C",
                    border: "0.2rem solid #5090D3",
                    borderRadius: "0.5rem",
                  }}
                />
              </PerTextField>
              <button type="submit" className="board_form-button">
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
