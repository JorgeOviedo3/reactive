import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/utils/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import Navbar from "./component/utils/navbar.jsx";
import { Footer } from "./component/utils/footer.jsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { Feed } from "./pages/feed";

let theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0f0139',
        },
        secondary: {
            main: '#437dff',
        },
        clear: {
            main: '#FFFFFF'
        },
        dark: {
            main: '#000000'
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
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:theid" />
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
