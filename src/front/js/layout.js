import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import injectContext from "./store/appContext";

import ScrollToTop from "./component/utils/scrollToTop";
import Navbar from "./component/utils/navbar.jsx";
import { Home } from "./pages/home";
import { Footer } from "./component/utils/footer.jsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Feed } from "./pages/feed";
import { SinglePost } from "./pages/singlepost";
import { SingleUser } from "./pages/singleuser";

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
                            <Route element={<SingleUser />} path="/user/:username" />
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
