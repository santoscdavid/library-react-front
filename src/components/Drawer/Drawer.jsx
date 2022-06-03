import { Close } from '@mui/icons-material';
import { Divider, IconButton, List, styled, Toolbar, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import MuiDrawer from '@mui/material/Drawer';
import { useContext } from 'react';
import { DrawerContext } from '../../context/DrawerContext';
import { mainListItems } from './components/ListItens';

export default function Drawer() {
    const { open, setOpen } = useContext(DrawerContext);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const drawerWidth = 240;

    const DrawerConfig = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
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

    return (
        <DrawerConfig variant="permanent" open={open}>
            <Toolbar
                sx={{
                    backgroundColor: purple[500],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: [1]
                }}>
                <Typography align="left" sx={{ color: '#fff', ml: '1rem', fontSize: '1rem', fontWeight: 'bold' }}>
                    Menu
                </Typography>
                <IconButton color="inherit" onClick={toggleDrawer}>
                    <Close htmlColor="#fff" />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">{mainListItems}</List>
        </DrawerConfig>
    );
}
