import React, { useContext, useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import { Context } from '../../../store/appContext';
import { PostsGrid } from '../templates/PostsGrid.jsx';

export const ProfileFeed = (props) => {
    const { store, actions } = useContext(Context);
    let [posts, setPosts] = useState([]);
    let [hasNext, setHasNext] = useState(true);
    let [nextPage, setNextPage] = useState(1);

    const syncPosts = async () => {
        const body = await actions.getPosts(`/get_posts_profile/${props.userId}/${nextPage}`);
        if (body) {
            setPosts([...posts, ...body.posts]);
            setHasNext(body.has_next);
            setNextPage(body.next_page);
        }
    }

    const handleContainerOnBottom = () => {
        if (hasNext) syncPosts();
    };

    useEffect(() => {
        syncPosts();
    }, [])

    return (
        <Box>
            <BottomScrollListener offset={900} onBottom={handleContainerOnBottom}>
                <Box sx={{ pr: { xs: 0, xl: 24 }, pl: { xs: 0, xl: 24 } }}>
                    <PostsGrid posts={posts} />
                    {hasNext ? <Typography textAlign={'center'}>Loading...</Typography> : <Typography textAlign={'center'}>This is the end.</Typography>}
                </Box>
            </BottomScrollListener>
        </Box >
    )
}
