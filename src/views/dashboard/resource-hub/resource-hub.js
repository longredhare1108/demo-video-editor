import React, { useEffect } from 'react';
import { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { mainListItems, secondaryListItems } from '../student/listItems';


import { RenderVideo } from "../../../state/feature/render-video/render-video"

const fileTypes = ["JPG", "PNG", "GIF", "mp4"];
const items = [{
    start: new Date(2022, 2, 9),
    end: new Date(2022, 2, 9),  // end is optional
    content: 'Trajectory A'
}]

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    })
);

const mdTheme = createTheme();
const ResourceHub = () => {
    const [options, setOptions] = useState({
        zoomKey: "ctrlKey",
        horizontalScroll: true,
        verticalScroll: true,
        orientation: "top",
        moveable: true,
        zoomable: true,
        editable: true,
        min: 0,
        max: 100000,
        start: 0,
        end: 61000,
        zoomMax: 5000,
        zoomMin: 1000,
        stack: true,
        showCurrentTime: true,
        multiselect: true,
        multiselectPerGroup: true,
        width: "100%",
        autoResize: true,
        // timeAxis: { scale: 'second', step: 1 },
        showMajorLabels: false,
        // rtl: true
    });
    const [open, setOpen] = React.useState(true);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [file, setFile] = useState(null);
    const [duration, setDuration] = useState(0);
    const [image, setImage] = useState(null);
    const [fileUrls, setFileUrls] = useState([]);
    const [videoFilePath, setVideoFilePath] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    useEffect(() => {
    })

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (e) => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onFileChange = (event) => {

        console.log("file", event.target.files[0])
        setAudioFile(event.target.files[0])
    };


    return (


        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            ResourceHub
                        </Typography>
                        <IconButton color="inherit" sx={{ marginRight: '24px' }}>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
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
                                    <MenuItem key={setting} onClick={(e) => handleCloseNavMenu(e)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List>
                        {mainListItems}
                    </List>
                    <Divider />
                    <List>{open && secondaryListItems}</List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <input type="file" onChange={onFileChange} />
                                <RenderVideo audioFile={audioFile} listOfImages={[
                                    {
                                        src: 'https://media.istockphoto.com/photos/eagle-hunter-standing-on-the-background-of-mountains-in-kyrgyzstan-picture-id1341309784?b=1&k=20&m=1341309784&s=170667a&w=0&h=i1AHUOcYCL6_UPAHQWRyJtPXtlzgQfln7TlPf-hcrIs=',
                                        duration: 5000
                                    }
                                ]} />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default ResourceHub;