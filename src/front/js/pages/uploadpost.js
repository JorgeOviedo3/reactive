import { AccountCircleOutlined, AccountCircleSharp, AccountCircleTwoTone, Code, ContentPaste, Description, Email, Lock, MenuBook, Password, Person4, Visibility, VisibilityOff, Widgets } from "@mui/icons-material";
import { Avatar, Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, Link, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import Image from "mui-image";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "../component/cloudinary/CloudinaryUploadWidget";
import { Context } from "../store/appContext";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

export const UploadPost = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [title, setTitle] = useState("");
    const [readme, setReadme] = useState("");
    const [code, setCode] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const pasteCode = async () => {
        const text = await navigator.clipboard.readText();
        setCode(text);
        return;
    }

    const sendPost = async () => {
        const ops = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${store.token}`
            },
            body: JSON.stringify({
                title: title,
                readme: readme,
                code: code,
                image: image,
                description: description,
                category: category
            }),
        };
        try {
            const response = await fetch(`${store.api}/create_post`, ops);
            if (!response.ok) {
                alert("Upload post problem endpoint /create_post");
                return false;
            }
            const body = await response.json()
            navigate(`/post/${body.id}`)
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    useEffect(() => {
        const authenticated = sessionStorage.getItem("authenticated");
        if (!authenticated) {
            navigate('/signup')
        }
    }, [])

    return (
        <Box sx={{ p: { md: 2, sm: 0 }, mb: 5, display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
            <Container sx={{ p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h1" color="gray1" sx={{ fontWeight: 800, fontSize: { xs: '5rem', md: '5.5rem' }, mt: 2, mb: 1 }}>
                    Upload
                </Typography>
                <Paper sx={{ borderRadius: '30px', width: { xs: '320px', sm: '500px', md: '700px' } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderRadius: '30px', mt: -4, p: 5 }}>
                        <Typography sx={{ mt: 2 }}>Here, you can share your latest reactive code components with the community and get feedback from fellow developers.</Typography>
                        <TextField
                            fullWidth
                            autoFocus
                            variant="filled"
                            color="gray1"
                            required
                            label="Title"
                            type="text"
                            onChange={(event) => {
                                setTitle(event.target.value)
                            }}
                            value={title}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Widgets color="primary" /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            variant="filled"
                            color="gray1"
                            required
                            label="Description"
                            multiline
                            type="text"
                            onChange={(event) => {
                                setDescription(event.target.value)
                            }}
                            value={description}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Description sx={{ mt: -2 }} color="primary" /></InputAdornment>,
                            }}
                        />
                        <FormControl
                            variant="filled" fullWidth>
                            <InputLabel id='test-select-label'>Category</InputLabel>
                            <Select
                                labelId='test-select-label'
                                value={category}
                                color="gray1"
                                required
                                onChange={(e) => { setCategory(e.target.value) }}
                            >
                                <MenuItem value={"Section"}>Section</MenuItem>
                                <MenuItem value={"Snippet"}>Snippet</MenuItem>
                                <MenuItem value={"Full Page"}>Full Page</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            autoFocus
                            variant="filled"
                            color="gray1"
                            required
                            label="README"
                            multiline
                            type="text"
                            onChange={(event) => {
                                setReadme(event.target.value)
                            }}
                            value={readme}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><MenuBook sx={{ mt: -2 }} color="primary" /></InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            variant="filled"
                            color="gray1"
                            required
                            label="Code"
                            multiline
                            type="text"
                            onChange={(event) => {
                                setCode(event.target.value)
                            }}
                            value={code}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Code sx={{ mt: -2 }} color="primary" /></InputAdornment>,
                                endAdornment: <InputAdornment position="end"><IconButton sx={{ mt: -2 }} onClick={() => {
                                    pasteCode();
                                }}><ContentPaste /></IconButton></InputAdornment>
                            }}
                        ></TextField>
                        <LiveProvider code={code}>
                            <LiveError />
                            <LivePreview />
                        </LiveProvider>
                        {image === "" ?
                            <Box id="upload_widget" sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                <CloudinaryUploadWidget preset="yeu70xua" width={1080} set={setImage} />
                                <Typography variant="body2">Please upload a picture.</Typography>
                            </Box> :
                            <img src={image}></img>
                        }
                        {title !== "" && readme !== "" && code !== "" && description !== "" && category !== "" && image !== "" ?
                            <Button variant="contained" color="secondary" sx={{ width: '100%' }} onClick={() => {
                                sendPost();
                            }}>POST</Button> :
                            <Button variant="outlined" sx={{ width: '100%' }} disabled>post</Button>
                        }
                    </Box>
                </Paper>
            </Container >
        </Box >
    );
};
