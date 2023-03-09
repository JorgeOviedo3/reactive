import { Avatar, Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../store/appContext';
import { ChatBubbleOutline, Comment, MoreHoriz } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import { Liked } from '../utils/Liked.jsx';


export const Posts = () => {
    let [posts, setPosts] = useState([]);
    let [hasNext, setHasNext] = useState(true);
    let [nextPage, setNextPage] = useState(1);
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const getPosts = async () => {
        const ops = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await fetch(`${store.api}/get_posts/${nextPage}`, ops);
            if (!response.ok) {
                alert("problem getting posts")
            }
            const body = await response.json();
            setPosts([...posts, ...body.posts]);
            setHasNext(body.has_next);
            setNextPage(body.next_page);
        } catch (error) {
            console.log(error);
        }
    };

    const handleContainerOnBottom = () => {
        if (hasNext) getPosts();
    };

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <Box sx={{
        }}>
            <BottomScrollListener offset={900} onBottom={handleContainerOnBottom}>
                <Container sx={{ p: 0 }}>
                    <Grid container>
                        {posts === [] ? <></> :
                            posts.map((post) => {
                                return (
                                    <Grid item xs={12} md={6} key={post.id}>
                                        <Paper elevation={12} sx={{ borderRadius: '10px', m: 2, p: 2 }}>
                                            <Box sx={{ display: 'flex', mb: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Avatar src={post.user_avatar} sx={{ cursor: 'pointer' }} onClick={(e) => {
                                                        navigate(`/user/${post.user_username}`);
                                                    }} />
                                                    <Typography color="dark" sx={{ cursor: 'pointer', fontWeight: '500', fontSize: '1.2rem', ml: 1, "&:hover": { opacity: '0.8' } }} onClick={(e) => {
                                                        navigate(`/user/${post.user_username}`);
                                                    }}>@{post.user_username}</Typography>
                                                </Box>
                                                <Typography>{post.date}</Typography>
                                            </Box>
                                            <Typography variant="h6">{post.title}</Typography>
                                            <Typography variant="body1">{post.readme}</Typography>
                                            <Box width="100%">
                                                <Box component={'img'} src={post.image} onClick={() => {
                                                    navigate(`/post/${post.id}`)
                                                }} sx={{ borderRadius: 2, width: '100%', cursor: 'pointer', "&:hover": { opacity: '0.9' } }} />
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'start', gap: 2, alignItems: 'center' }}>
                                                <Liked id={post.id} likes_count={post.likes_count}></Liked>
                                                <Box sx={{ display: 'flex' }}>
                                                    <IconButton>
                                                        <Comment color="primary" />
                                                        <Typography >{post.comments_count}</Typography>
                                                    </IconButton>
                                                </Box>
                                                <IconButton sx={{ ml: 'auto' }}><MoreHoriz /></IconButton>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                )
                            })}
                    </Grid>
                    {hasNext ? <img width="50px" height="50px" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bc0c6b69321565.5b7d0cbe723b5.gif"></img> : <Typography>This is the end.</Typography>}
                </Container>
            </BottomScrollListener>
        </Box >
    )
}
