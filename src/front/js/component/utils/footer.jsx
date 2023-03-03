import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import React, { Component } from "react";

export const Footer = () => (
	<Box sx={{
		width: '100%',
		height: '10vh',
	}} component="footer" square variant="outlined">
		<Divider />
		<Container maxWidth="lg">
			<Typography variant="h3">Footer</Typography>
		</Container>
	</Box>
);
