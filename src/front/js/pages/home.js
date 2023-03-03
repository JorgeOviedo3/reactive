import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Divider } from "@mui/material";

import "../../styles/home.css";
import { Hero } from "../component/home/Hero.jsx";
import { Cards } from "../component/home/Cards.jsx";
import { Features } from "../component/home/Features.jsx";
import { About } from "../component/home/About.jsx";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<Hero />
			<Features />
			<Cards />
			<About />
		</div>
	);
};
