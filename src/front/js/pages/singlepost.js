import { ArrowBack, CalendarMonth, ChatBubbleOutline, Code, Comment, ContentCopy, MenuBook, MoreHoriz, Person, Widgets } from "@mui/icons-material";
import { Avatar, Box, Container, Divider, IconButton, Paper, Typography } from "@mui/material";
import Image from "mui-image";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Liked } from "../component/utils/Liked.jsx";
import { Context } from "../store/appContext";

export const SinglePost = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [data, setData] = useState(null)
	const navigate = useNavigate();

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
		<Box sx={{ my: 3 }}>
			<Container>
				{data === null ? <Typography>Loading...</Typography> :
					<>
						<Paper elevation={12} sx={{ p: 2, borderRadius: '10px' }}>
							{/* START POST HEADER */}
							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap-text', mb: 2 }}>
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<IconButton>
										<ArrowBack color="secondary" onClick={() => { navigate('/feed') }} />
									</IconButton>
									<Paper onClick={(e) => { navigate(`/user/${data.user_username}`); }}
										sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', p: 1, "&:hover": { opacity: '0.8' }, ml: 1 }}>
										<Avatar src={data.user_avatar} sx={{ cursor: 'pointer' }} />
										<Typography color="gray1" sx={{ cursor: 'pointer', fontWeight: '500', fontSize: '1.2rem', ml: 1 }}>{data.user_username}</Typography>
									</Paper>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center', mr: 1, p: 1, }}>
									<Typography color="gray1" sx={{ fontSize: '1.2rem', mr: 0.5 }}>{data.date}</Typography>
									<CalendarMonth color="primary" />
								</Box>
							</Box>
							{/* END POST HEADER */}

							{/* START POST DATA */}
							<Box sx={{ p: 1 }}>
								<Box>
									<Typography variant="h4" color="gray1" textAlign="start" sx={{ mb: 1 }}><Widgets color="primary" sx={{ mr: 1 }} />{data.title}</Typography>
									<a href={data.image} target="_blank">
										<Box component={'img'} src={data.image} onClick={() => {
										}} sx={{
											borderRadius: 2, width: '100%',
											objectFit: 'contain',
											objectPosition: 'center', cursor: 'pointer', "&:hover": { opacity: '0.9' }
										}} />
									</a>
								</Box>
								<Box sx={{ my: 3 }}>
									<Typography><MenuBook fontSize="sm" color="primary" /> README:</Typography>
									<Paper elevation={4} sx={{ p: 1 }}>
										<Typography>
											{data.readme}
										</Typography>
									</Paper>
								</Box>
								<Box sx={{ my: 3 }}>
									<Typography><Code fontSize="sm" color="primary" /> Code:</Typography>
									<Paper elevation={4} sx={{ p: 1 }}>
										<IconButton onClick={() => {
											navigator.clipboard.writeText(data.code)
										}}>
											<ContentCopy color="primary" />
										</IconButton>
										<Typography>
											{data.code}
										</Typography>
									</Paper>
								</Box>
							</Box>
							{/* END POST DATA */}

							{/* START POST FOOTER */}
							<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, alignItems: 'center', mb: 2 }}>
								<Liked id={params.id} likes_count={data.likes_count}></Liked>
								<Box sx={{ display: 'flex' }}>
									<IconButton>
										<Comment sx={{ mr: 1 }} color="primary" />
										<Typography >{data.comments_count}</Typography>
									</IconButton>
								</Box>
							</Box>
							{/* END POST FOOTER */}
						</Paper>

						{/* START POST COMMENTS */}
						<Box>
							<Typography>Comments</Typography>
						</Box>
						{/* END POST COMMENTS */}
					</>}
			</Container>
		</Box>
	);
};
