import { Box, Button, Container } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../store/appContext';

import { BottomScrollListener } from 'react-bottom-scroll-listener';

export const Posts = () => {
    let [posts, setPosts] = useState([]);
    let [hasNext, setHasNext] = useState(true);
    let [nextPage, setNextPage] = useState(1);
    const { store, actions } = useContext(Context);

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
            console.log(body.posts, body.has_next);
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
        <Box>
            <BottomScrollListener offset={200} onBottom={handleContainerOnBottom}>
                <Container>
                    {posts === [] ? <></> :
                        posts.map((post) => {
                            return (
                                <Box key={post.id} sx={{ height: '200px', background: 'gray', my: 5 }}>
                                    {post.title}
                                </Box>
                            )
                        })}
                    <Button onClick={() => {
                        getPosts()
                    }}>Next Page</Button>
                </Container>
            </BottomScrollListener>
        </Box>
    )
}
