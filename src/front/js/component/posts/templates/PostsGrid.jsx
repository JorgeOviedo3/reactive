import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CalendarMonth, Category, Code, Comment, ContentCopy, Copyright, MenuBook, MoreHoriz, TextSnippet, Web, Widgets } from '@mui/icons-material';
import { Avatar, Box, Grid, IconButton, Link, Paper, Typography } from '@mui/material';
import { Liked } from '../helpers/Liked.jsx';

export const PostsGrid = (props) => {
    const navigate = useNavigate();

    return (
        <Grid container>
            {props.posts === [] ? <></> :
                props.posts.map((post) => {
                    return (
                        <Grid sx={{ display: 'flex', width: '100%' }} item xs={12} md={6} key={post.id}>
                            <Paper elevation={12} sx={{ borderRadius: '10px', m: 2, p: 2, width: '100%' }}>
                                {/* START POST HEADER */}
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap-text', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Paper onClick={(e) => { navigate(`/user/${post.user_username}`); }}
                                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: '0.25s', p: 1, pr: 2, pl: 2, "&:hover": { transform: 'scale(1.02)', transition: '0.25s', color: '#a266e2' } }}>
                                            <Avatar src={post.user_avatar} sx={{ cursor: 'pointer' }} />
                                            <Typography sx={{ cursor: 'pointer', fontWeight: '400', fontSize: '1.2rem', ml: 1 }}>{post.user_username}</Typography>
                                        </Paper>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ mr: 0.5, fontWeight: '300' }}>{post.date}</Typography>
                                        <CalendarMonth color="primary" />
                                    </Box>
                                </Box>
                                {/* END POST HEADER */}

                                {/* START POST DATA */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography variant="h6" color="gray1" sx={{ mb: 1, pt: 1, cursor: 'pointer' }} onClick={() => { navigate(`/post/${post.id}`) }}>
                                            <Widgets color="primary" sx={{ mr: 1, mb: -0.5 }} />
                                            {post.title.slice(0, 80)}
                                            {post.title.length > 80 ? '...' : ''}
                                        </Typography>
                                        <Paper elevation={4} sx={{ display: 'flex', alignItems: 'end', p: 1, gap: 0.5 }}>
                                            <Typography sx={{ fontWeight: '400', whiteSpace: 'nowrap' }}>{post.category}</Typography>
                                            {post.category === "Section" ? <Category sx={{ color: '#80f9fc' }} /> : <></>}
                                            {post.category === "Snippet" ? <TextSnippet sx={{ color: '#fc8085' }} /> : <></>}
                                            {post.category === "Full Page" ? <Web sx={{ color: '#8efc80' }} /> : <></>}
                                        </Paper>
                                    </Box>
                                    <Typography color="subtlegray.lighter" sx={{ mb: 2, mt: 1 }}>
                                        {post.description.slice(0, 200).trim()}
                                        {post.description.length > 200 ? <Link href={`/post/${post.id}`} >...</Link> : <></>}
                                    </Typography>
                                    <Box component={'img'} src={post.image} onClick={() => {
                                        navigate(`/post/${post.id}`)
                                    }} sx={{
                                        borderRadius: 2, width: '100%', height: '365px',
                                        objectFit: 'cover',
                                        objectPosition: 'center', cursor: 'pointer', "&:hover": { opacity: '0.9' }
                                    }} />

                                </Box>
                                {/* END POST DATA */}

                                <Box sx={{ display: 'flex', justifyContent: 'start', gap: 2, alignItems: 'center' }}>
                                    <Liked id={post.id} likes_count={post.likes_count}></Liked>
                                    <Box sx={{ display: 'flex' }}>
                                        <IconButton >
                                            <Comment sx={{ mr: 1 }} color="primary" />
                                            <Typography >{post.comments_count}</Typography>
                                        </IconButton>
                                    </Box>
                                    <IconButton onClick={() => { navigate(`/post/${post.id}`) }} sx={{ ml: 'auto' }}><MoreHoriz /></IconButton>
                                </Box>
                            </Paper>
                        </Grid>
                    )
                })}
        </Grid>
    )
}