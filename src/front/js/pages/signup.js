import { AccountCircleOutlined, AccountCircleSharp, AccountCircleTwoTone, Email, Lock, Password, Person4, Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Box, Button, Container, IconButton, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material";
import Image from "mui-image";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "../component/cloudinary/CloudinaryUploadWidget";
import { Context } from "../store/appContext";

export const Signup = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("https://media.discordapp.net/attachments/865816064298188833/1079451034910474300/X1-hZ8B2_400x400.jpg");

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        if (store.authenticated === true) {
            navigate('/')
        }
    }, [store.authenticated])

    return (
        <Box sx={{ p: { md: 2, sm: 0 }, mb: 5, display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
            <Container sx={{ p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h1" color="gray1" sx={{ fontWeight: 800, fontSize: { xs: '5rem', md: '5.5rem' }, mt: 2, mb: 1 }}>
                    Sign Up
                </Typography>
                <Paper sx={{ borderRadius: '30px', width: { xs: '320px', md: '700px' } }}>
                    <Box sx={{
                        borderTopRightRadius: '30px', borderTopLeftRadius: '30px', width: '100%', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
                    }}>
                        {avatar === "https://media.discordapp.net/attachments/865816064298188833/1079451034910474300/X1-hZ8B2_400x400.jpg" ?
                            <AccountCircleSharp sx={{ width: '100px', height: '100px', color: 'white', mt: -4 }} /> :
                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Avatar src={avatar} sx={{ width: '100px', height: '100px', mt: -4 }}></Avatar>
                            </Box>}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '30px', mt: -4, p: 5 }}>
                        {avatar === "https://media.discordapp.net/attachments/865816064298188833/1079451034910474300/X1-hZ8B2_400x400.jpg" ? <Box id="upload_widget" sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <CloudinaryUploadWidget avatar={avatar} setAvatar={setAvatar} />
                            <Typography variant="body2">Please upload your profile picture.</Typography>
                        </Box> :
                            <></>}
                        <TextField
                            fullWidth
                            autoFocus
                            required
                            label="Email"
                            type="email"
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                            value={email}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Email color="secondary" /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            required
                            label="Username"
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                            value={username}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Person4 color="secondary" /></InputAdornment>
                            }}
                        />
                        <TextField
                            fullWidth
                            required
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                            value={password}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Lock color="secondary" /></InputAdornment>,
                                endAdornment: <InputAdornment position="end"><IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton></InputAdornment>
                            }}
                        />
                        {email === "" || password === "" || username === "" ? <Button variant="outlined" sx={{ width: '100%' }} disabled>Sign Up</Button> :
                            <Button variant="contained" color="secondary" sx={{ width: '100%' }} onClick={() => {
                                actions.signUp(username, password, email, avatar);
                            }}>Sign Up</Button>
                        }
                        <Typography textAlign={'center'}>Already have an account? <Link href="/login">Log In</Link> </Typography>
                    </Box>
                </Paper>
            </Container >
        </Box >
    );
};
