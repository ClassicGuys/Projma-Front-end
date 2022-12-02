import React, { Fragment } from "react";
// import Header from "../components/Dashboard/...";
import "../styles/Dashboard.scss";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import Header from "../components/Header/Header";
// import Footer from "../components/Landing/Footer/Footer";
// import ResponsiveDrawer from "../components/Dashboard/ResponsiveDrawer/ResponsiveDrawer";
import BasicModal from "../components/Dashboard/Modal/BasicModal";
// import Link from "@mui/material";
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AvTimerTwoToneIcon from '@mui/icons-material/AvTimerTwoTone';
// star icon
import WorkspacesTwoToneIcon from '@mui/icons-material/WorkspacesTwoTone';
import HomeRepairServiceTwoToneIcon from '@mui/icons-material/HomeRepairServiceTwoTone';
import Diversity2TwoToneIcon from '@mui/icons-material/Diversity2TwoTone';
import ViewDayTwoToneIcon from '@mui/icons-material/ViewDayTwoTone';
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';
import StarPurple500TwoToneIcon from '@mui/icons-material/StarPurple500TwoTone';
import DeveloperBoardTwoToneIcon from '@mui/icons-material/DeveloperBoardTwoTone';
import { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
// import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from "react-redux";
import apiInstance from "../utilities/axiosConfig";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// useMediaQuery
// import Typography from "@mui/material";
// rafce

export const Dashborad = () => {
    const access_token = localStorage.getItem('access_token');
    // apiInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    // apiInstance.defaults.headers.headers = {
    //     'Content-Type': 'application/json',
    // };

    let [workspaces, setWorkspaces] = useState([])
    // apiInstance.get("/workspaces/dashboard/myworkspaces/").then((response) => {
    //     // console.log(response.data);
    //     // console.log(response);
    //     setWorkspaces(response.data);
    // }).catch((error) => {
    //     // console.log(error);
    // });
    let [owningWorkspaces, setOwningWorkspaces] = useState([])
    // apiInstance.get("/workspaces/dashboard/myowning-workspaces/").then((response) => {
    //     // console.log(response.data);
    //     setOwningWorkspaces(response.data);
    // }).catch((error) => {
    //     // console.log(error);
    // });

    useEffect(() => {
        apiInstance.get("/workspaces/dashboard/myworkspaces/").then((response) => {
            // console.log(response.data);
            // console.log(response);
            // setWorkspaces(response.data);
            // console.log(workspaces);
        }).catch((error) => {
            // console.log(error);
        });

        apiInstance.get("/workspaces/dashboard/myowning-workspaces/").then((response) => {
            // console.log(response.data);
            setOwningWorkspaces(response.data);
            setWorkspaces(response.data);
            // console.log(owningWorkspaces);
        }).catch((error) => {
            // console.log(error);
        });
    }, [])
    

    const computer_tabs = {
        "boards": {
            title: "بورد ها",
            icon: <DashboardTwoToneIcon sx={{ ml: 1.5 }} />,
            content: (
                <>
                    <p variant="h1" component="h2" className="text paragraph">
                        <StarPurple500TwoToneIcon sx={{ ml: 1.5 }} /> بورد های ستاره‌دار
                    </p>
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text paragraph">
                        <AvTimerTwoToneIcon sx={{ ml: 1.5 }} /> اخیرا دیده شده
                    </p>
                    {/* <Grid></Grid> */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text paragraph">
                        <Diversity2TwoToneIcon sx={{
                            // paddingLeft: "1%",
                            // minWidth: "35px",
                            ml: 1.5
                        }} /> فضا های کاری شما
                    </p>
                    {/* Grid */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text paragraph">
                        <HomeRepairServiceTwoToneIcon sx={{ ml: 1.5 }} /> فضا های مهمان
                    </p>
                </>
            )
        },
        // "templates": {
        //     title: "تمپلیت ها",
        //     icon: <ContentPasteTwoToneIcon sx={{ ml: 1.5 }} />,
        //     content: (
        //         // <a className="option" href="#"><ContentPasteTwoToneIcon /> </a>
        //         <>
        //             <p><ViewDayTwoToneIcon sx={{ ml: 1.5 }} />تمپلیت های گوناگون </p>
        //             <ul className="unOrderList">
        //                 <li className="list">مدیریت</li>
        //                 <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
        //                 <li className="list">تیمی</li>
        //                 <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
        //                 <li className="list">صنعتی</li>
        //                 <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
        //                 <li className="list">مالی</li>
        //             </ul>
        //         </>
        //     )
        // },
        "home": {
            title: "خانه",
            icon: <HomeTwoToneIcon sx={{ ml: 1.5 }} />,
            content: (
                // <a className="option" href="#"><HomeTwoToneIcon /> </a>
                <>
                    <p variant="h1" component="h2" className="text paragraph">
                        <StarPurple500TwoToneIcon sx={{ ml: 1.5 }} /> برجسته ها
                    </p>
                    {/* <Grid></Grid> */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text paragraph">
                        <DeveloperBoardTwoToneIcon sx={{ ml: 1.5 }} /> ساخت بورد جدید
                    </p>
                    {/* Grid */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text paragraph">
                        <MessageTwoToneIcon sx={{ ml: 1.5 }} /> پیام ها
                    </p>
                </>
            )
        }
    }

    const mobile_tabs = {
        "boards": {
            title: "بورد ها",
            icon: <DashboardTwoToneIcon sx={{ ml: 1.5 }} />,
            content: (
                <>
                    <p variant="h1" component="h2" className="text paragraph">
                        <StarPurple500TwoToneIcon sx={{ ml: 1.5 }} /> بورد های ستاره‌دار
                    </p>
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text paragraph">
                        <AvTimerTwoToneIcon sx={{ ml: 1.5 }} /> اخیرا دیده شده
                    </p>
                    {/* <Grid></Grid> */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text paragraph">
                        <Diversity2TwoToneIcon sx={{
                            // paddingLeft: "1%",
                            // minWidth: "35px",
                            ml: 1.5
                        }} /> فضا های کاری شما
                    </p>
                    {/* Grid */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text paragraph">
                        <HomeRepairServiceTwoToneIcon sx={{ ml: 1.5 }} /> فضا های مهمان
                    </p>
                </>
            )
        },
        // "templates": {
        //     title: "تمپلیت ها",
        //     icon: <ContentPasteTwoToneIcon sx={{ ml: 1.5 }} />,
        //     content: (
        //         // <a className="option" href="#"><ContentPasteTwoToneIcon /> </a>
        //         <>
        //             <p><ViewDayTwoToneIcon sx={{ ml: 1.5 }} />تمپلیت های گوناگون </p>
        //             <ul className="unOrderList">
        //                 <li className="list">مدیریت</li>
        //                 <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
        //                 <li className="list">تیمی</li>
        //                 <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
        //                 <li className="list">صنعتی</li>
        //                 <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
        //                 <li className="list">مالی</li>
        //             </ul>
        //         </>
        //     )
        // },
        "home": {
            title: "خانه",
            icon: <HomeTwoToneIcon sx={{ ml: 1.5 }} />,
            content: (
                // <a className="option" href="#"><HomeTwoToneIcon /> </a>
                <>
                    <p variant="h1" component="h2" className="text paragraph">
                        <StarPurple500TwoToneIcon sx={{ ml: 1.5 }} /> برجسته ها
                    </p>
                    {/* <Grid></Grid> */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text paragraph">
                        <DeveloperBoardTwoToneIcon sx={{ ml: 1.5 }} /> ساخت بورد جدید
                    </p>
                    {/* Grid */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text paragraph">
                        <MessageTwoToneIcon sx={{ ml: 1.5 }} /> پیام ها
                    </p>
                </>
            )
        },
        "workspaces": {
            title: "فضا های کاری",
            icon: <WorkspacesTwoToneIcon sx={{ ml: 1.5 }} />,
            content: (
                // <a className="option" href="#"><WorkspacesTwoToneIcon /> </a>
                <>
                    <p className="text paragraph" > <WorkspacesTwoToneIcon sx={{ ml: 1.5 }} /> فضای کار ها </p>
                    <BasicModal text="+"/>
                    {/* <p> <BasicModal  text="+"/></p> */}
                    {
                        workspaces.map((workspace) => (
                            <a className="option" href="#" key={workspace.id} onClick={() => navigateToWorkspace(workspace.id)} >{workspace.name}</a>
                        ))
                    }
                    {/* <a className="option" href="#">فضای کار 1</a> */}
                </>
            )
        }
    }

    const [activeTab, setActiveTab] = useState('boards');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const matches = useMediaQuery('(min-width:450px)');
    const [value, setValue] = React.useState('boards');
    const handleChange = (event, newValue) => {
        setValue(newValue);
        toggle(newValue);
    };

    // const state = useSelector((state) => state);
    // console.log("store", state);
    // const dispatch = useDispatch();
    // dispatch(actionObject or calling the action creator); (when an action is dispatched, all the reducers become active.)
    // onClick={() => {
    // dispatch(deleteItem());
    //   }}

    const navigate = useNavigate();

    const navigateToWorkspace = (workspaceId) => {
        navigate(`/workspace/${workspaceId}`);
    }

    if (matches) {
        return (
            <div>
                <Header />
                <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 3, sm: 8, md: 12 }}>
                    <Grid item xs={1} sm={2} md={2}>
                        <div className="text sidebar" >

                            {/* https://www.pluralsight.com/guides/handling-tabs-using-page-urls-and-react-router-doms */}
                            {
                                Object.entries(computer_tabs).map((tab) => (

                                    <a className={activeTab === tab[0] ? "option active" : "option"} href="#" onClick={() => {
                                        toggle(tab[0]);
                                    }}
                                    >{tab[1].icon} {tab[1].title}</a>
                                    // br
                                ))
                            }
                            {/* https://www.npmjs.com/package/react-device-detect */}

                            <Divider sx={{ bgcolor: "white", marginTop: "5%" }} />
                            <p className="text paragraph" > <WorkspacesTwoToneIcon sx={{ ml: 1.5 }} /> فضای کار ها </p>
                            <BasicModal text="+"/>
                            {/* <a className="option" href="#">فضای کار 1</a> onClick navigate to workspace page */}
                            {
                                workspaces.map((workspace) => (
                                    <a className="option " href="#" key={workspace.id} onClick={() => navigateToWorkspace(workspace.id)} >{workspace.name} </a>

                                ))
                            }
                        </div>

                    </Grid>
                    <Grid item xs={2} sm={6} md={10}>

                        {
                            Object.entries(computer_tabs).map((tab) => (
                                <>
                                    {activeTab === tab[0] && tab[1].content}
                                </>
                            ))
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
    else {
        return (
            // https://mui.com/material-ui/react-bottom-navigation/
            <Fragment>
                <Header />
                <div>
                    {
                        Object.entries(mobile_tabs).map((tab) => (
                            <>
                                {activeTab === tab[0] && tab[1].content}
                            </>
                        ))
                    }
                </div>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, fontFamily: 'Vazir' }} style={{ fontFamily: 'Vazir' }} elevation={3}>
                    <BottomNavigation sx={{ width: "100%", fontFamily: 'Vazir' }} value={value} onChange={handleChange} style={{ fontFamily: 'Vazir' }}>
                        <BottomNavigationAction sx={{ fontFamily: 'Vazir' }}
                            label="بورد ها"
                            value="boards"
                            icon={<DashboardTwoToneIcon />}
                            style={{
                                fontFamily: 'Vazir',
                                label: {
                                    fontFamily: 'Vazir',
                                }
                            }}
                        />
                        <BottomNavigationAction
                            label="خانه"
                            value="home"
                            icon={<HomeTwoToneIcon />}
                        />
                        {/* <BottomNavigationAction
                            label="تمپلیت ها"
                            value="templates"
                            icon={<ContentPasteTwoToneIcon />}
                        /> */}
                        <BottomNavigationAction
                            label="فضای کار ها"
                            value="workspaces"
                            icon={<WorkspacesTwoToneIcon />}
                        />
                    </BottomNavigation>
                </Paper>
            </Fragment>

        )
    }

}
