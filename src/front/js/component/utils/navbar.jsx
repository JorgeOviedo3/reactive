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

import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext';

import ReactiveLogo from "../../../img/ReactiveLogo.png"

const pages = ['Feed', 'Upload'];
const settings = ['Profile', 'Settings', 'Logout'];

export default function Navbar() {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();
	const location = useLocation();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const UpperCaseLocation = () => {
		const current = location.pathname;
		if (current === "/upload" || current === "/feed") {
			const cut = current.slice(1);
			const capitalized = cut.charAt(0).toUpperCase() + cut.slice(1);
			return (<Typography sx={{ position: 'absolute', ml: 5 }} variant="h6">{capitalized}</Typography>)
		}
	}

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

	return (
		<AppBar position="sticky">
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
							color: 'white',
							textDecoration: 'none',
							'&:hover': { cursor: 'pointer' }
						}}
					>
						Reactive
					</Typography>

					<Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="secondary"
						>
							<MenuIcon />
						</IconButton>
						<UpperCaseLocation />
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
								<MenuItem key={page} onClick={() => {
									handleCloseNavMenu();
									if (page === "Feed") navigate('/feed');
									if (page === "Upload") navigate('/upload');
								}}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box component="img" onClick={() => { navigate('/') }} sx={{ display: { xs: 'flex', md: 'none' }, width: "30px", '&:hover': { cursor: 'pointer' } }} src={ReactiveLogo}></Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page}
								color={location.pathname.substring(1) == page.toLowerCase() ? "secondary" : "gray1"}
								onClick={() => {
									handleCloseNavMenu();
									if (page === "Feed") navigate('/feed');
									if (page === "Upload") navigate('/upload');
								}}
								sx={{ my: 2, display: 'block' }}
							>
								{page}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						{store.authenticated === true ?
							<>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt="Remy Sharp" src={store.currentUser.avatar} />
									</IconButton>
								</Tooltip>
							</> :
							<>
								<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
									<Button color="gray1"
										onClick={() => { navigate('/login') }}>Log in</Button>
									<Button variant="outlined" color="secondary"
										onClick={() => { navigate('/signup') }}>Sign up</Button>
								</Box>
								<Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
									<IconButton onClick={() => { navigate('/login') }}>
										<LoginIcon color="secondary" />
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
									if (setting === "Logout") actions.logOff();
									if (setting === "Profile") navigate(`/user/${store.currentUser.username}`)
									if (setting === "Settings") navigate('/settings')
									handleCloseUserMenu();
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