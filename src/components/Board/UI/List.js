import React, { useState, useEffect } from "react";
import "../Styles/List.css";
import Card from "./Card";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import Popover from "@mui/material/Popover";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import axios from "axios";
import Loading from "../../Shared/Loading";
import { toast, ToastContainer } from "react-toastify";
import "../../../styles/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputName from "../../Shared/InputName";
import apiInstance from "../../../utilities/axiosConfig";

const List = (props) => {
  const [cards, setCards] = useState(props.card);
  const [isclicked, setIsclicked] = useState(false);
  const [inputName, setInputName] = useState("");
  const [isToast, setIsToast] = useState(false);
  const [isPost, setIsPost] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [name, setName] = useState(props.name);

  useEffect(() => {
    setIsToast(false);
    setIsDel(false);
    setIsOpen(false);
  }, [isPost]);

  useEffect(() => {
    setCards(props.card);
    // const order = [];
    // props.card.map((card) => order.push(card.id));
    // console.log("order");
    // console.log(order);
    // apiInstance.put(`workspaces/tasklist/${props.id}/reorder-tasks/`, {
    //   order: order,
    // });
  }, [props.card]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const reqCreateCard = async (data, id) =>
    await apiInstance
      .post(`workspaces/board/${id}/create-task/`, data)
      .then(() => {
        setIsToast(true);
        toast.success("کارت با موفقیت ساخته شد", {
          position: toast.POSITION.TOP_CENTER,
          rtl: true,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsToast(true);
          toast.error("عملیات با خطا مواجه شد", {
            position: toast.POSITION.TOP_CENTER,
            rtl: true,
          });
        }
      })
      .finally(() => {
        setIsPost(null);
        console.log("reqCreateCard Done");
        props.onPost(true);
      });

  const reqDeleteList = async (id) =>
    await apiInstance
      .delete(`workspaces/tasklist/${id}/delete-tasklist/`)
      .then(() => {
        setIsToast(true);
        toast.success("لیست با موفقیت حذف شد", {
          position: toast.POSITION.TOP_CENTER,
          rtl: true,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsToast(true);
          toast.error("عملیات با خطا مواجه شد", {
            position: toast.POSITION.TOP_CENTER,
            rtl: true,
          });
        }
      })
      .finally(() => {
        setIsPost(null);
        console.log("reqDeleteList Done");
        props.onPost(true);
      });

  const reqEditListName = async (data, id) =>
    await apiInstance
      .patch(`workspaces/tasklist/${id}/update-tasklist/`, data)
      .then(() => {
        setIsToast(true);
        toast.success("اسم لیست با موفقیت عوض شد", {
          position: toast.POSITION.TOP_CENTER,
          rtl: true,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsToast(true);
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
    setIsPost(true);
    reqDeleteList(props.id);
    handleClose();
  };

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

  const handleClose = () => {
    setIsOpen(false);
  };

  const onPostHandler = (isa) => {
    console.log("List isa ", isa);
    props.onPost(isa);
  };

  const changeNameHandler = (name) => {
    setName(name);
    const data = new FormData();
    data.append("title", name);
    setIsPost(true);
    reqEditListName(data, props.id);
  };

  return (
    <Draggable draggableId={String(props.id) + props.name} index={props.index}>
      {(provided) => (
        <div
          className="board_list"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isPost ? <Loading /> : null}
          {isToast ? (
            <ToastContainer autoClose={5000} style={{ fontSize: "1.2rem" }} />
          ) : null}
          <div className="board_header">
            {/* <p className="board_header-title">{props.name}</p> */}
            <InputName
              className="board_header-title"
              name={name}
              onChangeName={changeNameHandler}
            />
            <button
              className="board_header-button"
              onClick={optionClickHandler}
            >
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
                  <button
                    className="board_option-button"
                    onClick={clickHandler}
                  >
                    <p className="board_option-text">افزودن کارت</p>
                  </button>
                  <button
                    className="board_option-button"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    <p className="board_option-text">حذف کردن لیست</p>
                  </button>
                  <Dialog
                    open={isOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"آیا از حذف کردن لیست مطمئن هستید؟"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText
                        id="alert-dialog-description"
                        sx={{ color: "#fff" }}
                      >
                        اخطار: با حذف کردن لیست تمام کارت های داخل آن نیز حذف
                        میشود
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <div className="List_dialog-button-container">
                        <button
                          onClick={() => {
                            setIsDel(true);
                            deleteListHandler();
                          }}
                          className="List_dialog-button"
                        >
                          تایید
                        </button>
                        <button
                          onClick={handleClose}
                          autoFocus
                          className="List_dialog-button"
                        >
                          انصراف
                        </button>
                      </div>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </Popover>
          </div>
          <Droppable droppableId={String(props.id)}>
            {(provided, snapshot) => (
              <div
                className="board_card-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={
                  snapshot.draggingOverWith
                    ? {
                        backgroundColor: "var(--hover-color)",
                        borderRadius: "0.5rem",
                      }
                    : null
                }
              >
                {cards.map((card, index) => (
                  <Card
                    name={card.title}
                    key={card.id}
                    id={card.id}
                    index={index}
                    members={card.doers}
                    checkTotal={card.checklists_num}
                    checkDone={card.checked_checklists_num}
                    attachNum={card.attachments_num}
                    chatNum={card.comments_num}
                    labels={card.labels}
                    onPost={onPostHandler}
                    boardId={props.boardId}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* <div className="board_space"></div> */}
          <div className="board_add-card">
            {!isclicked ? (
              <div className="board_add-button">
                <button
                  className="board_add-card_button"
                  onClick={clickHandler}
                >
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
                      autoFocus
                      onChange={(e) => setInputName(e.target.value)}
                      placeholder="اسم کارت را در این بخش بنویسید"
                      sx={{
                        backgroundColor: "var(--main-item-color)",
                        border: "0.2rem solid var(--minor-item-color)",
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
      )}
    </Draggable>
  );
};

export default List;
