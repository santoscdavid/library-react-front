import { useContext } from 'react';
import { DrawerContext } from '../../context/DrawerContext';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Badge, IconButton, Toolbar, Typography } from '@mui/material';
import { AccountCircle, Bookmark, Menu } from '@mui/icons-material';

export default function Appbar() {
    const { open, setOpen } = useContext(DrawerContext);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const drawerWidth = 240;

    const AppBarConfig = styled(MuiAppBar, {
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

    return (
        <AppBarConfig position="absolute" open={open}>
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
        </AppBarConfig>
    );
}
