import { Delete, Edit, MenuBook } from '@mui/icons-material';
import {
    Button,
    ButtonGroup,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from '@mui/material';
import { Box, Container } from '@mui/system';
import { useState } from 'react';

export default function Publishers() {
    const publishersList = [
        {
            id: 1,
            nome: 'Rocco',
            cidade: 'Rio de Janeiro'
        },
        {
            id: 2,
            nome: 'Saraiva',
            cidade: 'Fortaleza'
        }
    ];
    const [data, setData] = useState(publishersList);
    const cols = [
        { title: 'Id', align: 'left' },
        { title: 'Nome', align: 'left' },
        { title: 'Cidade', align: 'left' },
        { title: 'Opções', align: 'center' }
    ];

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                height: '100vh',
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
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan="12" sx={{ display: 'flex' }}>
                                            <MenuBook
                                                sx={{
                                                    mr: 1,
                                                    mt: '2px',
                                                    textAlign: 'center',
                                                    alignContent: 'center',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            />
                                            <Typography fontSize={20}>Editoras</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        {cols.map((col) => (
                                            <TableCell
                                                align={col.align}
                                                key={col.id}
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
                                    {publishersList.map((row) => (
                                        <TableRow
                                            key="row.id"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.nome}</TableCell>
                                            <TableCell>{row.cidade}</TableCell>
                                            <TableCell align="center">
                                                <ButtonGroup color="secondary" size="small" variant="outlined">
                                                    <Button color="warning" endIcon={<Edit />}>
                                                        Editar
                                                    </Button>
                                                    <Button color="error" endIcon={<Delete />}>
                                                        Excluir
                                                    </Button>
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
