import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext';
import ReactiveLogo from "../../../img/ReactiveLogo.png"


const pages = ['Feed'];
const settings = ['Profile', 'Settings', 'Logout'];

export default function Navbar() {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	useEffect(() => {
		const authenticated = sessionStorage.getItem("authenticated");
		if (authenticated) setLoggedIn(true);
	}, [])

	return (
		<AppBar sx={{ backgroundColor: "white" }} position="sticky">
			<Container maxWidth="xl">
				<Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
					<Box component="img" onClick={() => { navigate('/') }} sx={{ pb: 0.5, display: { xs: 'none', md: 'flex' }, width: "30px", '&:hover': { cursor: 'pointer' } }} src={ReactiveLogo}></Box>
					<Typography
						variant="h6"
						noWrap
						component="a"
						onClick={() => { navigate('/') }}
						sx={{
							mr: 2,
							ml: 1,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							pb: 0.5,
							color: 'black',
							textDecoration: 'none',
							'&:hover': { cursor: 'pointer' }
						}}
					>
						Reactive
					</Typography>

					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="primary"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box component="img" onClick={() => { navigate('/') }} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: "30px", '&:hover': { cursor: 'pointer' } }} src={ReactiveLogo}></Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: '#0f0139', display: 'block' }}
							>
								{page}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						{store.authenticated === true ?
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src={store.currentUser.avatar} />
								</IconButton>
							</Tooltip> :
							<>
								<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
									<Button variant="outlined"
										onClick={() => { navigate('/login') }}>Log in</Button>
									<Button variant="contained" color="secondary"
										onClick={() => { navigate('/signup') }}>Sign up</Button>
								</Box>
								<Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
									<IconButton>
										<LoginIcon color="primary" onClick={() => { navigate('/login') }} />
									</IconButton>
								</Box>
							</>}



						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={() => {
									handleCloseUserMenu();
									actions.logOff();
								}}>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar >
	);
}