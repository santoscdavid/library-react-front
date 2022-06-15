import { Fragment } from 'react';
import { Apartment, Group, Handshake, MenuBook } from '@mui/icons-material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <Fragment>
        <ListItemButton to="/dashboard" component={Link}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Início" />
        </ListItemButton>
        <ListItemButton to="/publishers" component={Link}>
            <ListItemIcon>
                <Apartment />
            </ListItemIcon>
            <ListItemText primary="Editoras" />
        </ListItemButton>
        <ListItemButton to="/books" component={Link}>
            <ListItemIcon>
                <MenuBook />
            </ListItemIcon>
            <ListItemText primary="Livros" />
        </ListItemButton>
        <ListItemButton to="/customers" component={Link}>
            <ListItemIcon>
                <Group />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
        </ListItemButton>
        <ListItemButton to="/rents" component={Link}>
            <ListItemIcon>
                <Handshake />
            </ListItemIcon>
            <ListItemText primary="Alugueis" />
        </ListItemButton>
    </Fragment>
);
