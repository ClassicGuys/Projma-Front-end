import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Dashborad } from "./pages/Dashborad";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/Vazir.ttf";
import { Provider } from "react-redux";
import store from "./store";
import SignIn from "./components/Registration/Signin";
import SignUp from "./components/Registration/Signup";
import Profile from "./components/Profile/ProfilePage";
import Workspace_management from "./pages/Workspace_management";
import ResetPassword from "./components/Password/ResetPassword";
import ForgetPassword from "./components/Password/ForgetPassword";
import ProfileView from "./components/Profile/ProfilePageView";
import ChangePassword from "./components/Profile/ChangePassword";
import InvitePage from "./pages/InvitePage";
import Board from "./components/Board/UI/Board";
// import { login, remove_token } from "../src/actions/authActions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";

const theme = createTheme(
  {
    typography: {
      fontFamily: "Vazir",
    },
  },
  faIR
);

function App() {
  // functional base component
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {/* https://www.freecodecamp.org/news/how-to-build-a-redux-powered-react-app/ */}
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/dashboard" element={<Dashborad />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/forget-password" element={<ForgetPassword />} />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route path="workspace/:id/*" element={<Workspace_management />} />
            <Route exact path="/profileview/" element={<ProfileView />} />
            <Route exact path="/changepassword" element={<ChangePassword />} />
            <Route exact path="/board" element={<Board />} />
            <Route exact path="/invite_page/:token" element={<InvitePage />} />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
