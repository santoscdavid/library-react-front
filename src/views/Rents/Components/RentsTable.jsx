import { Handshake, Check, Delete, Edit } from '@mui/icons-material';
import {
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
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import AddButtom from '../../../components/AddButton/AddButton';
import { useContext } from 'react';
import { RentsContext } from '../../../context/RentsContext';
import Loading from '../../../components/Loading/Loading';
import moment from 'moment';

export default function RentsTable() {
    const cols = [
        { title: 'Id', align: 'left' },
        { title: 'Livro', align: 'left' },
        { title: 'Cliente', align: 'left' },
        { title: 'Data de aluguel', align: 'center' },
        { title: 'Previsão de entrega', align: 'center' },
        { title: 'Devolução', align: 'center' },
        { title: 'Status', align: 'center' },
        { title: 'Opções', align: 'center' }
    ];

    const { rents, handlerShow, handlerDelete, handleChangeRowsPerPage, rowsPerPage } = useContext(RentsContext);

    const formatDate = (date) => {
        if (date == null) {
            return '';
        }
        return moment(date).format('DD/MM/YYYY');
    };

    const validateRent = (deliveryForecast, returnDate) => {
        if (returnDate == null) {
            return 'Não devolvido';
        } else if (returnDate.valueOf() > deliveryForecast.valueOf()) {
            return 'Com atraso';
        } else {
            return 'Sem atraso';
        }
    };

    return (
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
                                            fontSize={20}
                                            sx={{
                                                my: 1,
                                                display: 'flex',
                                                mt: 1,
                                                alignContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <Handshake
                                                sx={{
                                                    mr: 1
                                                }}
                                            />
                                            Alugueis
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
                    {rents.length ? (
                        <TableBody>
                            {rents.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.livro.nome}</TableCell>
                                    <TableCell>{row.usuario.nome}</TableCell>
                                    <TableCell align="center">{formatDate(row.aluguelFeito)}</TableCell>
                                    <TableCell align="center">{formatDate(row.previsaoEntrega)}</TableCell>
                                    <TableCell align="center">{formatDate(row.devolucao)}</TableCell>
                                    <TableCell align="center">
                                        {validateRent(row.previsaoEntrega, row.devolucao)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup color="secondary" size="small" variant="outlined">
                                            {row.devolucao == null ? (
                                                <IconButton color="success" onClick={() => alert('devolução')}>
                                                    <Check />
                                                </IconButton>
                                            ) : (
                                                <IconButton disabled color="success">
                                                    <Check />
                                                </IconButton>
                                            )}
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
                    </Grid>
                </Grid>
            </TableContainer>
        </Paper>
    );
}
