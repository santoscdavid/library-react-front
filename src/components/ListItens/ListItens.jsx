import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Apartment, Group, Handshake, MenuBook } from '@mui/icons-material';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton to="/">
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
    </React.Fragment>
);
