import { AccountCircleOutlined, AccountCircleSharp, AccountCircleTwoTone, Email, Lock, Password, Person4, TextFields, Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Box, Button, Container, IconButton, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material";
import Image from "mui-image";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "../component/utils/CloudinaryUploadWidget";
import { Context } from "../store/appContext";

export const Settings = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [bio, setBio] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        setUsername(store.currentUser.username);
        setEmail(store.currentUser.email);
        setAvatar(store.currentUser.avatar);
        setBio(store.currentUser.bio);
    }, [store.currentUser])

    useEffect(() => {
        const authenticated = sessionStorage.getItem("authenticated")
        if (!authenticated) {
            navigate('/feed')
        }
    }, [sessionStorage.getItem('authenticated')])

    return (
        <Box sx={{ p: { md: 2, sm: 0 }, mb: 5, display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h1" color="gray1" sx={{ fontWeight: 800, fontSize: { xs: '5rem', md: '5.5rem' }, mt: 2, mb: 1 }}>
                    Settings
                </Typography>
                <Paper sx={{ borderRadius: '30px', width: { xs: '100%', md: '60%' } }}>
                    <Box sx={{
                        borderTopRightRadius: '30px', borderTopLeftRadius: '30px', width: '100%', display: 'flex', mt: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
                    }}>
                        {avatar === "" ?
                            <AccountCircleSharp sx={{ width: '100px', height: '100px', color: 'white' }} /> :
                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Avatar src={avatar} sx={{ width: '100px', height: '100px' }}></Avatar>
                            </Box>}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '30px', mt: -4, p: 5 }}>
                        <TextField
                            fullWidth
                            autoFocus
                            required
                            label="Email"
                            type="email"
                            variant="filled"
                            color="gray1"
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                            value={email}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Email color="primary" /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            required
                            variant="filled"
                            color="gray1"
                            label="Bio"
                            onChange={(event) => {
                                setBio(event.target.value)
                            }}
                            value={bio}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><TextFields color="primary" /></InputAdornment>
                            }}
                        />
                        <TextField
                            fullWidth
                            required
                            variant="filled"
                            color="gray1"
                            label="Username"
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                            value={username}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Person4 color="primary" /></InputAdornment>
                            }}
                        />
                        <TextField
                            fullWidth
                            required
                            variant="filled"
                            color="gray1"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                            value={password}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Lock color="primary" /></InputAdornment>,
                                endAdornment: <InputAdornment position="end"><IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton></InputAdornment>
                            }}
                        />
                        <Box id="upload_widget" sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <CloudinaryUploadWidget avatar={avatar} set={setAvatar} preset="ajoinryy" width={350} />
                            <Typography variant="body2">Update your profile picture.</Typography>
                        </Box>
                        {email === "" || password === "" || username === "" || bio === "" ? <Button variant="outlined" sx={{ width: '100%' }} disabled>Update</Button> :
                            <Button variant="contained" color="primary" sx={{ width: '100%' }} onClick={() => {
                            }}>Update</Button>
                        }
                    </Box>
                </Paper>
            </Container >
        </Box >
    );
};
