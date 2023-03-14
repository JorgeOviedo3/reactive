import { FavoriteBorder, Widgets } from "@mui/icons-material";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProfileFeed } from "../component/posts/feeders/ProfileFeed.jsx";
import { SavedFeed } from "../component/posts/feeders/SavedFeed.jsx";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [user, setUser] = useState(null);
    const [showSaved, setShowSaved] = useState(false)

    const getUser = async () => {
        const ops = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const response = await fetch(`${store.api}/user/${params.username}`, ops);
            if (!response.ok) {
                alert('problem getting post');
            }
            const body = await response.json();
            setUser(body);
        } catch (error) {
            console.log(error);
        }
    };

    const handleShowSaved = () => {
        if (showSaved) {
            setShowSaved(false);
        } else {
            setShowSaved(true);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Box>
            {user === null ? <Typography>Loading...</Typography> :
                <>
                    <Box sx={{ pr: { xs: 0, xl: 26 }, pl: { xs: 0, xl: 26 } }}>
                        <Paper elevation={20} sx={{ mb: 2, p: 2, display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'start' } }}>
                            <Avatar src={user.avatar} sx={{ width: '200px', height: '200px' }} />
                            <Box>
                                <Typography variant="h2" sx={{}}>{user.username}</Typography>
                                <Typography color="subtlegray.lighter">{user.bio}</Typography>
                                <Typography color="subtlegray.main">Joined {user.date}</Typography>
                            </Box>
                        </Paper>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, margin: 'auto', gap: 5 }}>
                            <Button onClick={handleShowSaved} variant={showSaved ? "outlined" : "contained"} sx={{ width: '50%' }}>Posted<Widgets color="primary" sx={{ transform: 'scale(0.7)' }} /></Button>
                            <Button onClick={handleShowSaved} variant={showSaved ? "contained" : "outlined"} sx={{ width: '50%' }} color="secondary">Saved<FavoriteBorder sx={{ transform: 'scale(0.7)' }} color="secondary" /></Button>
                        </Box>
                    </Box>
                    {showSaved ? <SavedFeed userId={user.id} /> : <ProfileFeed userId={user.id} />}
                </>
            }
        </Box>
    );
};
