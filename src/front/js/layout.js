import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import injectContext from "./store/appContext";

import ScrollToTop from "./component/utils/scrollToTop";
import Navbar from "./component/utils/navbar.jsx";
import { Home } from "./pages/home";
import { Footer } from "./component/utils/footer.jsx";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Feed } from "./pages/feed";
import { SinglePost } from "./pages/singlepost";
import { Profile } from "./pages/profile";
import { UploadPost } from "./pages/uploadpost";
import { Settings } from "./pages/settings";

let theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#8091fc',
        },
        secondary: {
            main: '#a266e2',
        },
        clear: {
            main: '#FFFFFF'
        },
        dark: {
            main: '#000000'
        },
        gray1: {
            main: '#D3D3D3'
        },
        subtlegray: {
            main: '#a3a3a3',
            lighter: '#cbcbcb'
        }
    },
},
)

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <ThemeProvider theme={theme}>
                        <Navbar />
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<Login />} path="/login" />
                            <Route element={<Signup />} path="/signup" />
                            <Route element={<Feed />} path="/feed" />
                            <Route element={<SinglePost />} path="/post/:id" />
                            <Route element={<Profile />} path="/user/:username" />
                            <Route element={<UploadPost />} path="/upload" />
                            <Route element={<Settings />} path="/settings" />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                        <Footer />
                        <CssBaseline />
                    </ThemeProvider>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
