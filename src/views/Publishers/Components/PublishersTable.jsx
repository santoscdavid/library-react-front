import { Delete, Edit, MenuBook } from '@mui/icons-material';
import {
    Container,
    ButtonGroup,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    Toolbar
} from '@mui/material';
import AddButtom from '../../../components/AddButton/AddButton';
import { useContext } from 'react';
import { PublishersContext } from '../../../context/PublishersContext';

export default function PublishersTable() {
    const cols = [
        { title: 'Id', align: 'left' },
        { title: 'Nome', align: 'left' },
        { title: 'Cidade', align: 'left' },
        { title: 'Opções', align: 'center' }
    ];

    const { publishers, handlerShow, handlerEdit, handlerDelete } = useContext(PublishersContext);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                height: 'auto',
                overflow: 'auto'
            }}>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 'auto'
                        }}>
                        <TableContainer sx={{ maxHeight: 'auto' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            colSpan={2}
                                            sx={{
                                                display: 'flex',
                                                mt: 1,
                                                alignContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <MenuBook
                                                sx={{
                                                    mr: 1
                                                }}
                                            />
                                            <Typography fontSize={21}>Editoras</Typography>
                                        </TableCell>
                                        <TableCell colSpan={3} align="right">
                                            <AddButtom
                                                sx={{
                                                    mt: 2,
                                                    alignContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                                click={handlerShow}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        {cols.map((col) => (
                                            <TableCell
                                                align={col.align}
                                                key={col.title}
                                                style={{ top: 57 }}
                                                sx={{
                                                    fontWeight: 'bold'
                                                }}>
                                                {col.title}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {publishers.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.nome}</TableCell>
                                            <TableCell>{row.cidade}</TableCell>
                                            <TableCell align="center">
                                                <ButtonGroup color="secondary" size="small" variant="outlined">
                                                    <IconButton
                                                        color="warning"
                                                        onClick={() => handlerEdit(row.id, row.nome, row.cidade)}>
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handlerDelete(row.id, row.nome, row.cidade)}>
                                                        <Delete />
                                                    </IconButton>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Container>
        </Box>
    );
}
