import React from "react";
import Nav from "../Nav/Nav";
import "./Header.css";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
// import x from "../../../static/images/landing/landing1.jpg";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "../StyledTextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid"; // Grid version 1
import { redirect } from "react-router-dom";
import { AddBox } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import conversation from "../../../static/images/landing/conversation.svg";

// const loader = async () => {
//   const attButton = e.target.getAttribute("button-key");
//   console.log(attButton);
//   return redirect("/test");
// };

// isClicked = (e) => {
//   const attButton = e.target.getAttribute("button-key");
//   console.log(attButton);
// };

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const Header = () => {
  let width = window.innerWidth;
  let isMatch = width > 900 ? true : false;
  const config = isMatch
    ? {
        background: "#076585" /* fallback for old browsers */,
        background: "-webkit-linear-gradient(to left, #076585, #fff)",
        background: "linear-gradient(to left, #076585, #fff)",
      }
    : {
        background: "#076585" /* fallback for old browsers */,
        background: "-webkit-linear-gradient(to top, #076585, #fff)",
        background: "linear-gradient(to top, #076585, #fff)",
      };
  const matches = useMediaQuery("(max-width:900px)");
  console.log(width);
  console.log(isMatch);
  console.log(config);
  return (
    <header>
      <Nav />
      <div className="top-section">
        <Grid
          container
          // spacing={{ xs: 1, md: 10, sm: 5 }}
          columns={{ xs: 2, sm: 4, md: 5 }}
        >
          <Grid item xs={2} sm={4} md={2} sx={config}>
            {/* <div className="top-el top-el-2"> */}
            <Box
              sx={{
                padding: "10%",
              }}
            >
              <h1 className="responsive--font--size--2">
                با پروجما کیفیت کار تیمی خود را ارتقا دهید
              </h1>
              <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="ایمیل"
                    placeholder="آدرس ایمیل خود را وارد کنید"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    sx={{ width: "60%", display: "block" }}
                    InputLabelProps={{ style: { fontFamily: "Vazir" } }}
                    InputProps={{ style: { fontFamily: "Vazir" } }}
                  />
                </ThemeProvider>
              </CacheProvider>
              <Button
                variant="contained"
                // button-key="buttonAttribute"
                // onClick={this.isClicked}
                sx={{
                  // height: 54,
                  // width: 150,
                  fontSize: "90%",
                  width: "30%",
                  height: "100%",
                  fontFamily: "Vazir",
                }}
              >
                {" "}
                ثبت نام کنید
              </Button>
            </Box>
            {/* </div> */}
          </Grid>
          <Grid item xs={2} sm={4} md={3}>
            {/* <div className="top-el top-el-1 top-el-img"> */}
            <img src={conversation} className="responsive--height top-img" />
            {/* </div> */}
          </Grid>
        </Grid>
      </div>
    </header>
  );
};

export default Header;
