import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../store/appContext'

export const Liked = (props) => {
    const { store, actions } = useContext(Context);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(props.likes_count)
    const navigate = useNavigate();

    const isLiked = async () => {
        const ops = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${store.token}`
            },
        };
        try {
            const response = await fetch(`${store.api}/is_liked/${props.id}`, ops)
            if (!response.ok) {
                console.log(response);
            }
            const body = await response.json();
            setLiked(body);
        } catch (error) {
            console.log(error);
        }
    }

    const like = async () => {
        const ops = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${store.token}`
            },
        };
        try {
            const response = await fetch(`${store.api}/create_like/${props.id}`, ops)
            if (!response.ok) {
                console.log(response);
            }
            const body = await response.json();
            setLiked(body);
            setLikesCount(likesCount + 1);
        } catch (error) {
            console.log(error);
        }
    }

    const unLike = async () => {
        const ops = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${store.token}`
            },
        };
        try {
            const response = await fetch(`${store.api}/delete_like/${props.id}`, ops)
            if (!response.ok) {
                console.log(response);
            }
            const body = await response.json();
            setLiked(body);
            setLikesCount(likesCount - 1);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLike = () => {
        if (store.authenticated) {
            if (!liked) {
                like();
            } else {
                unLike();
            }
        } else {
            navigate('/login')
        }
    }

    useEffect(() => {
        if (store.authenticated) isLiked();
    }, [store.authenticated])

    return (
        <>
            {liked ?
                <Box sx={{ display: 'flex' }}>
                    <IconButton onClick={handleLike}>
                        <Favorite sx={{ mr: 1 }} color="secondary" />
                        <Typography >{likesCount}</Typography>
                    </IconButton>
                </Box> :
                <Box sx={{ display: 'flex' }}>
                    <IconButton onClick={handleLike}>
                        <FavoriteBorder sx={{ mr: 1 }} color="secondary" />
                        <Typography >{likesCount}</Typography>
                    </IconButton>
                </Box>}
        </>
    )
}
