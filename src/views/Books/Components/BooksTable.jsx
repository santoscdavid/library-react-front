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
import { BooksContext } from '../../../context/BooksContext';

export default function BooksTable() {
    const cols = [
        { title: 'Id', align: 'left' },
        { title: 'Nome', align: 'left' },
        { title: 'Autor', align: 'left' },
        { title: 'Editora', align: 'left' },
        { title: 'Lançamento', align: 'left' },
        { title: 'Quantidade', align: 'left' },
        { title: 'Opções', align: 'center' }
    ];

    const { books, handlerShow } = useContext(BooksContext);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                height: '90vh',
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
                                            <Typography fontSize={21}>Livros</Typography>
                                        </TableCell>
                                        <TableCell colSpan={6} align="right">
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
                                                sx={{
                                                    fontWeight: 'bold'
                                                }}>
                                                {col.title}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {books.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell colSpan={1}>{row.id}</TableCell>
                                            <TableCell>{row.nome}</TableCell>
                                            <TableCell>{row.autor}</TableCell>
                                            <TableCell>{row.editora.nome}</TableCell>
                                            <TableCell>{row.lancamento}</TableCell>
                                            <TableCell>{row.quantidade}</TableCell>
                                            <TableCell align="center">
                                                <ButtonGroup color="secondary" size="small" variant="outlined">
                                                    <IconButton color="warning">
                                                        {/* onClick={() => handlerEdit(row.id, row.nome, row.cidade)} */}
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton color="error">
                                                        <Delete />
                                                        {/* onClick={() => handlerDelete(row.id, row.nome, row.cidade)} */}
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
