import { Apartment, Delete, Edit } from '@mui/icons-material';
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
import { PublishersContext } from '../../../context/PublishersContext';
import Loading from '../../../components/Loading/Loading';
import PublishersFilter from './PublishersFilter';

export default function PublishersTable() {
    const cols = [
        { title: 'Id', align: 'left' },
        { title: 'Nome', align: 'left' },
        { title: 'Cidade', align: 'left' },
        { title: 'Opções', align: 'center' }
    ];

    const {
        publishers,
        handlerShow,
        handlerEdit,
        handlerDelete,
        handleChangeRowsPerPage,
        rowsPerPage
    } = useContext(PublishersContext);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                mt: 7
            }}>
            <Container maxWidth="xl" sx={{ height: '85vh' }}>
                <PublishersFilter />
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                        }}>
                        <TableContainer sx={{ maxHeight: 'auto', overflow: 'auto' }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={12}>
                                            <Grid container>
                                                <Grid item xs={10}>
                                                    <Typography
                                                        fontSize={21}
                                                        sx={{
                                                            my: 1,
                                                            display: 'flex',
                                                            mt: 1,
                                                            alignContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                        <Apartment
                                                            sx={{
                                                                mr: 1
                                                            }}
                                                        />
                                                        Editoras
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <div
                                                        sx={{
                                                            my: 1,
                                                            display: 'flex',
                                                            alignContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                        <AddButtom click={handlerShow} />
                                                    </div>
                                                </Grid>
                                            </Grid>
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
                                {publishers.length ? (
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
                                ) : (
                                    <TableBody>
                                        {[...Array(3)].map((e, i) => (
                                            <TableRow key={i}>
                                                {cols.map((col, i) => (
                                                    <TableCell key={i}>
                                                        <Loading />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                )}
                            </Table>
                            <FormControl sx={{ mt: 2, ml: 2, mb: 1, minWidth: '140px' }} size="small">
                                <InputLabel>Linhas por página</InputLabel>
                                <Select
                                    // variant="filled"
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
                        </TableContainer>
                    </Paper>
                </Grid>
            </Container>
        </Box>
    );
}
