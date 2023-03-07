import { Box, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SingleUser = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [data, setData] = useState({});

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
            setData(body);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Box>
            <Typography>{data.username}</Typography>
        </Box>
    );
};
