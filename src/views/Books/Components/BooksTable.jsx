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
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import AddButtom from '../../../components/AddButton/AddButton';
import { useContext } from 'react';
import { BooksContext } from '../../../context/BooksContext';
import BooksFilter from './BooksFilter';
import Loading from '../../../components/Loading/Loading';

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

    const { books, handlerShow, handlerEdit, handlerDelete, rowsPerPage, handleChangeRowsPerPage } =
        useContext(BooksContext);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                mt: 7
            }}>
            <Container maxWidth="xl" sx={{ height: '85vh' }}>
                <BooksFilter />
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 'auto'
                        }}>
                        <TableContainer sx={{ maxHeight: 'auto' }}>
                            <Table stickyHeader size="small">
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
                                            <Typography fontSize={20}>Livros</Typography>
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
                                {books.length ? (
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
                                                        <IconButton
                                                            color="warning"
                                                            onClick={() =>
                                                                handlerEdit(
                                                                    row.id,
                                                                    row.nome,
                                                                    row.editora.id,
                                                                    row.autor,
                                                                    row.lancamento,
                                                                    row.quantidade
                                                                )
                                                            }>
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton color="error" onClick={() => handlerDelete(row.id)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                ) : (
                                    <TableBody>
                                        <TableRow>
                                            {cols.map((col, i) => (
                                                <TableCell key={i}>
                                                    <Loading />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                            <Grid container>
                                <Grid item>
                                    <FormControl sx={{ mt: 2, mb: 1, ml: 1, minWidth: '140px' }} size="small">
                                        <InputLabel>Linhas por página</InputLabel>
                                        <Select
                                            autoWidth
                                            value={rowsPerPage}
                                            label="rowsPerPage"
                                            onChange={handleChangeRowsPerPage}>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={25}>25</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                            <MenuItem value={100}>100</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Container>
        </Box>
    );
}
