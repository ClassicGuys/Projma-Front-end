import * as React from "react";
import { useState, useSelector } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import StyledTextField from "../../Shared/StyledTextField";
import PerTextField from "../../Shared/PerTextField.js";
import x from "../../../static/images/workspace_management/create_board/board.jpeg";
// import file from "../../../static/images/workspace_management/create_board/board.jpeg";
import "./CreateBoard.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "38rem",
  height: "55rem",
  backgroundColor: "#001E3C",
  // bgcolor: "background.paper",
  // border: "0.5rem solid #dfe6e5",
  borderRadius: "1rem",
  boxShadow: 50,
  p: 4,
};

export default function CreateBoardModal({
  params,
  on_submit,
  boards,
  setBoards,
}) {
  const handleChange = (e) => {
    const [file] = e.target.files;
    setBinaryFile(e.target.files[0]);
    if (file) {
      setFile(URL.createObjectURL(file));
    }
  };
  const [result, setResult] = useState("");
  const [binaryFile, setBinaryFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState(null);
  const test = () => {
    console.log(result);
  };
  const create_board = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("name", title);
    form_data.append("description", description);
    form_data.append("type", "education");
    form_data.append("background_pic", binaryFile);
    on_submit(form_data, boards, setBoards);
    handleClose();
  };
  return (
    <div>
      <div className="workspace-modal--add-button-container">
        <button className="workspace-modal--add-button" onClick={handleOpen}>
          <p className="workspace-modal--add-button-title" style={{color: '#fff'}}>+ ???????????? ????????</p>
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            id="modal-modal-title"
            component="h2"
            sx={{
              textAlign: "center",
              fontFamily: "Vazir",
              color: "#fff",
            }}
          >
            ???????? ?????? ????????
          </Typography>
          <Divider
            sx={{
              backgroundColor: "#007fff",
              marginTop: "0.5rem",
              marginBottom: "0.75rem",
            }}
          />
          <img src={x} className="workspace-modal--board-image" />
          <form className="workspace-modal--board-form">
            <PerTextField>
              <StyledTextField
                className="workspace-modal--board-name"
                label="?????? ??????"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                InputLabelProps={{
                  style: { fontFamily: "Vazir" },
                }}
              />
              <StyledTextField
                className="workspace-modal--board-name"
                label="??????????????"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                InputLabelProps={{
                  style: { fontFamily: "Vazir" },
                }}
              />
            </PerTextField>
            <Avatar
              src={file ? file : x}
              alt="profile"
              sx={{
                mt: 1,
                width: "11vmin",
                height: "11vmin",
                borderRadius: "50%",
              }}
            />

            <Button
              variant="contained"
              component="label"
              sx={{
                // backgroundColor: themeProps.primaryColor,
                color: "white",
                width: "120px",
                mt: 2,
                marginRight: "1.5rem",
                marginTop: 0,
              }}
            >
              <p style={{ fontSize: "1rem" }}>???????????? ??????</p>
              <input
                type="file"
                hidden
                onChange={handleChange}
                accept=".jpg,.jpeg,.png"
              />
            </Button>
            {/* <input
              type="file"
              // ref="file"
              onChange={handleChange}
              // name="user[image]"
              // multiple="true"
              // name="img"
              // id="img"
            /> */}
            {/* <img src={this.state.imgSrc} alt="img" /> */}
            {/* <label id="title">?????????? ??????</label>
            <input type="text" id="title" className="workspace-modal--title-inp" /> */}
            {/* <button onClick={create_board}>submit</button> */}
            <input
              type="submit"
              value="????????"
              className="workspace-modal--button-29"
              onClick={create_board}
              style={{ fontFamily: "Vazir" }}
            />
          </form>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
