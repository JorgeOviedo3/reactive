import { Avatar, Box, Container, Paper, Typography } from "@mui/material";
import Image from "mui-image";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SinglePost = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [data, setData] = useState({})

	const getPostById = async () => {
		const ops = {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		}
		try {
			const response = await fetch(`${store.api}/post/${params.id}`, ops);
			if (!response.ok) {
				alert('problem getting post')
			}
			const body = await response.json();
			setData(body)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getPostById();
	}, [])

	return (
		<Box>
			<Container>
				<Paper sx={{ p: 3 }}>
					<Box>
						<Avatar src={data.user_avatar} />
						<Typography>@{data.user_username}</Typography>
					</Box>
					<Typography>{data.title}</Typography>
					<Typography>{data.readme}</Typography>
					<Typography>{data.code}</Typography>
					<Image src={data.image}></Image>

				</Paper>
			</Container>
		</Box>
	);
};
