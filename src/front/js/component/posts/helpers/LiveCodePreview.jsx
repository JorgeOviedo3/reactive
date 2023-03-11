import { Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";

export const LiveCodePreview = (props) => {
    const [showPreview, setShowPreview] = useState(false);


    return (<Paper elevation={props.elevation} sx={{
        p: 1
    }}>
        {showPreview ? <>
            <Button onClick={() => {
                setShowPreview(false);
            }}>Close</Button>
            <Box>
                <LiveProvider code={props.code}>
                    <LiveError />
                    <LivePreview />
                </LiveProvider>
            </Box>
        </> : <>
            <Button onClick={() => {
                setShowPreview(true);
            }}>Try Live Preview</Button>
        </>}
    </Paper>);
}
