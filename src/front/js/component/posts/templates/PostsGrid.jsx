import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CalendarMonth, Category, Code, Comment, ContentCopy, MenuBook, MoreHoriz, Widgets } from '@mui/icons-material';
import { Avatar, Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Liked } from '../utils/Liked.jsx';

export const PostsGrid = (props) => {
    const navigate = useNavigate();

    return (
        <Grid container>
            {props.posts === [] ? <></> :
                props.posts.map((post) => {
                    return (
                        <Grid item xs={12} md={6} key={post.id}>
                            <Paper elevation={12} sx={{ borderRadius: '10px', m: 2, p: 2 }}>
                                {/* START POST HEADER */}
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap-text', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Paper elevation={4} onClick={(e) => { navigate(`/user/${post.user_username}`); }}
                                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: '0.25s', p: 1, "&:hover": { transform: 'scale(1.02)', transition: '0.25s', color: '#a266e2' } }}>
                                            <Avatar src={post.user_avatar} sx={{ cursor: 'pointer' }} />
                                            <Typography color="gray1" sx={{ cursor: 'pointer', fontWeight: '500', fontSize: '1.2rem', ml: 1 }}>{post.user_username}</Typography>
                                        </Paper>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography color="gray1" sx={{ fontSize: '1.2rem', mr: 0.5 }}>{post.date}</Typography>
                                        <CalendarMonth color="primary" />
                                    </Box>
                                </Box>
                                {/* END POST HEADER */}

                                {/* START POST DATA */}
                                <Box sx={{ p: 1 }}>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography variant="h4" color="gray1" textAlign="start" sx={{ mb: 1 }}><Widgets color="primary" sx={{ mr: 1 }} />{post.title}</Typography>
                                            <Paper sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 1 }}>
                                                <Typography sx={{ fontSize: '1.2rem' }}>{post.category}</Typography>
                                                <Category color="secondary" />
                                            </Paper>
                                        </Box>
                                        <Typography sx={{ mb: 2 }}>{post.description}</Typography>
                                        <Box component={'img'} src={post.image} onClick={() => {
                                            navigate(`/post/${post.id}`)
                                        }} sx={{
                                            borderRadius: 2, width: '100%',
                                            objectFit: 'contain',
                                            objectPosition: 'center', cursor: 'pointer', "&:hover": { opacity: '0.9' }
                                        }} />
                                    </Box>
                                    <Box sx={{ my: 3 }}>
                                        <Typography><MenuBook fontSize="sm" color="primary" /> README:</Typography>
                                        <Paper elevation={4} sx={{ p: 1 }}>
                                            <Typography>
                                                {post.readme}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                </Box>
                                {/* END POST DATA */}

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
    )
}