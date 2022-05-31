import './styles/main.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { styled, ThemeProvider } from '@mui/material/styles';
import { Theme } from './components/Themes/Theme';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Dashboard from './views/Dashboard/Dashboard';
import Publishers from './views/Publishers/Publishers';
import Books from './views/Books/Books';
import Rents from './views/Rents/Rents';
import Customers from './views/Customers/Customers';
import { mainListItems } from './components/ListItens/ListItens';
import { Badge, Box, Container, CssBaseline, Divider, IconButton, List, Toolbar, Typography } from '@mui/material';
import { AccountCircle, Bookmark, ChevronLeft, Menu } from '@mui/icons-material';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9)
            }
        })
    }
}));

function App() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <ThemeProvider theme={Theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px'
                        }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' })
                            }}>
                            <Menu />
                        </IconButton>
                        <Bookmark />
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            WDA Livraria
                        </Typography>
                        <IconButton color="inherit">
                            <Badge color="secondary">
                                <AccountCircle />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1]
                        }}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeft />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">{mainListItems}</List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto'
                    }}></Box>
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Router>
                        <Routes>
                            <Route path="/" exact element={<Dashboard />} />
                            <Route path="/publishers" exact element={<Publishers />} />
                            <Route path="/books" exact element={<Books />} />
                            <Route path="/rents" exact element={<Rents />} />
                            <Route path="/customers" exact element={<Customers />} />
                        </Routes>
                    </Router>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
