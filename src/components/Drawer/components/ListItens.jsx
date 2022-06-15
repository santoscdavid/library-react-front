import { Fragment } from 'react';
import { Apartment, Group, Handshake, MenuBook } from '@mui/icons-material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const mainListItems = (
    <Fragment>
        <ListItemButton to="/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Início" />
        </ListItemButton>
        <ListItemButton to="/publishers">
            <ListItemIcon>
                <Apartment />
            </ListItemIcon>
            <ListItemText primary="Editoras" />
        </ListItemButton>
        <ListItemButton to="/books">
            <ListItemIcon>
                <MenuBook />
            </ListItemIcon>
            <ListItemText primary="Livros" />
        </ListItemButton>
        <ListItemButton to="/customers">
            <ListItemIcon>
                <Group />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
        </ListItemButton>
        <ListItemButton to="/rents">
            <ListItemIcon>
                <Handshake />
            </ListItemIcon>
            <ListItemText primary="Alugueis" />
        </ListItemButton>
    </Fragment>
);
