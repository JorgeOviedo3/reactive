import { ArrowBack, CalendarMonth, Category, ChatBubbleOutline, Code, Comment, ContentCopy, MenuBook, MoreHoriz, Person, Widgets } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Divider, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Liked } from "../component/utils/Liked.jsx";
import { Context } from "../store/appContext";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

export const SinglePost = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [data, setData] = useState(null);
	const navigate = useNavigate();
	const [newComment, setNewComment] = useState('');

	const getPostById = async () => {
		const ops = {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		};
		try {
			const response = await fetch(`${store.api}/post/${params.id}`, ops);
			if (!response.ok) {
				alert('problem getting post');
			}
			const body = await response.json();
			setData(body);
		} catch (error) {
			console.log(error);
		};
	}

	const sendComment = async () => {
		const ops = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${store.token}`
			},
			body: JSON.stringify({
				text: newComment
			}),
		};
		try {
			const response = await fetch(`${store.api}/create_comment/${data.id}`, ops);
			if (!response.ok) {
				alert("Comment problem endpoint /create_comment");
				return false;
			}
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

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
									<Paper elevation={4} onClick={(e) => { navigate(`/user/${data.user_username}`); }}
										sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: '0.25s', p: 1, "&:hover": { transform: 'scale(1.02)', transition: '0.25s', color: '#a266e2' }, ml: 1 }}>
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
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
										<Typography variant="h4" color="gray1" textAlign="start" sx={{ mb: 1 }}><Widgets color="primary" sx={{ mr: 1 }} />{data.title}</Typography>
										<Paper sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 1 }}>
											<Typography sx={{ fontSize: '1.2rem' }}>{data.category}</Typography>
											<Category color="secondary" />
										</Paper>
									</Box>
									<Typography sx={{ mb: 2 }}>{data.description}</Typography>
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
									<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

										<Typography><Code fontSize="sm" color="primary" /> Code:</Typography>
										<IconButton onClick={() => {
											navigator.clipboard.writeText(data.code)
										}}>
											<ContentCopy color="primary" />
										</IconButton>
									</Box>
									<Paper elevation={4} sx={{ p: 1 }}>
										<Box>
											<LiveProvider code={data.code}>
												<LiveEditor />
												<LiveError />
												<LivePreview />
											</LiveProvider>
										</Box>
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
						<Box sx={{ my: 2, }}>
							<Typography sx={{}} variant="h4">Comments:</Typography>
							<Typography sx={{ mt: 2 }}>Join the conversation</Typography>
							<Box sx={{ my: 1, display: 'flex', alignItems: 'start', gap: 2 }}>
								<TextField
									variant="filled"
									color="gray1"
									label="Comment"
									multiline
									fullWidth
									maxRows={10}
									onChange={(e) => {
										setNewComment(e.target.value);
									}}
									value={newComment}
									sx={{ mb: 1 }}
								/>
								{store.authenticated && newComment !== "" ?
									<Button
										onClick={() => {
											if (newComment !== "") {
												if (sendComment()) {
													setNewComment("");
													getPostById();
												}
											}
										}}
										sx={{ height: '55px', width: '120px' }} variant="contained" color="primary">Submit</Button>
									:
									<Button sx={{ height: '55px', width: '120px' }} variant="contained" disabled color="primary">Submit</Button>
								}

							</Box>
							<Typography sx={{ mt: 3 }}>Or see what people are saying</Typography>
							<Box sx={{ display: 'flex', gap: { xs: 1, md: 2 }, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'start' }}>
								{data.comments.map((comment) => {
									return (
										<Paper sx={{ display: 'flex', p: 2, my: 1, width: '100%', maxWidth: { xs: '320', md: '32%' } }} key={`comment-${comment.id}`} elevation={12}>
											<Avatar src={comment.user_avatar} />
											<Box sx={{ ml: 2, width: '100%' }}>
												<Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4, alignItems: 'center' }}>
													<Typography color="gray1" sx={{ fontWeight: '500', fontSize: '1.2rem' }}>{data.user_username}</Typography>
													<Typography>{comment.date}</Typography>
												</Box>
												<Typography>{comment.text}</Typography>
											</Box>
										</Paper>
									)
								})}
							</Box>
						</Box>
						{/* END POST COMMENTS */}

					</>}
			</Container>
		</Box >
	);
};
