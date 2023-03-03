import { AccountCircleSharp, Lock, Person4, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Container, IconButton, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        if (store.authenticated === true) {
            navigate('/')
        }
    }, [store.authenticated])

    return (
        <Box sx={{ p: { md: 2, sm: 0 }, mb: 5, display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
            <Container>
                <Typography variant="h1" color="black" sx={{ fontWeight: 800, fontSize: { xs: '5rem', md: '5.5rem' }, mt: 2, mb: 1 }}>
                    Log In
                </Typography>
                <Paper sx={{ borderRadius: '30px', maxWidth: '700px' }}>
                    <Box sx={{
                        borderTopRightRadius: '30px', borderTopLeftRadius: '30px', width: '100%', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
                        backgroundImage: 'url(https://cdn.discordapp.com/attachments/865816064298188833/1079641293627605073/SignUpHeaderBlack.svg)',
                        backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'
                    }}>
                        <AccountCircleSharp sx={{ width: '100px', height: '100px', color: 'white', mt: -4 }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '30px', mt: -4, background: 'white', p: 5 }}>
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
                        <Button variant="contained" color="secondary" sx={{ width: '100%' }} onClick={() => {
                            actions.logIn(username, password);
                        }}>Login</Button>
                        <Typography textAlign={'center'}>Don't have an account? <Link href="/signup">Sign Up</Link></Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};