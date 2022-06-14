import {
    styled,
    Dialog,
    Slide,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Box,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { RentsContext } from '../../../context/RentsContext';
import api from '../../../configs/api';
import { toast } from 'react-toastify';

export default function RentsForm() {
    const [books, setBooks] = useState([]);
    const [customers, setCustomers] = useState([]);

    const validationSchema = yup.object().shape({
        livroId: yup.number().required('Campo Obrigatório'),
        clienteId: yup.number().required('Campo Obrigatório'),
        previsao: yup.string().required('Campo Obrigatório')
    });

    const {
        show,
        handleClose,
        saveRent,
        titleForm,
        rentsDefaultFormValues,
        customerSelectValue,
        setCustomerSelectValue,
        bookSelectValue,
        setBookSelectValue,
        previsaoEntrega,
        setPrevisaoEntrega
    } = useContext(RentsContext);

    const DialogConfig = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2)
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1)
        }
    }));
    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: rentsDefaultFormValues,
        resolver: yupResolver(validationSchema)
    });

    function cancelForm() {
        handleClose();
        reset(rentsDefaultFormValues);
    }

    const getItens = () => {
        api.get('/livro?PageNumber=1&PageSize=1000')
            .then((res) => {
                setBooks(res.data);
            })
            .catch(() => {
                toast.error('Não foi possivel conectar com o banco de dados de livros');
            });
        api.get('/usuario?PageNumber=1&PageSize=1000')
            .then((res) => {
                setCustomers(res.data);
            })
            .catch(() => {
                toast.error('Não foi possivel conectar com o banco de dados de clientes');
            });
    };

    useEffect(() => {
        getItens();
    }, []);

    return (
        <DialogConfig open={show} TransitionComponent={Transition} sx={{ padding: '2rem' }}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '20px' }}>{titleForm}</DialogTitle>
            <Box component="form" autoComplete="off" onSubmit={handleSubmit(saveRent)}>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl variant="filled" fullWidth error={errors?.livroId}>
                                <InputLabel id="editora">Livro</InputLabel>
                                <Select
                                    fullWidth
                                    name="livro"
                                    value={bookSelectValue}
                                    {...register('livroId')}
                                    onChange={(e) => setBookSelectValue(e.target.value)}>
                                    <MenuItem value={0}>Selecione um livro</MenuItem>
                                    {books.map((book) => (
                                        <MenuItem key={book.id} value={book.id}>
                                            {book.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors?.livroId && errors.livroId?.message}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="filled" fullWidth error={errors?.clienteId} sx={{ mt: 1 }}>
                                <InputLabel id="editora">Cliente</InputLabel>
                                <Select
                                    fullWidth
                                    name="cliente"
                                    value={customerSelectValue}
                                    {...register('clienteId')}
                                    onChange={(e) => setCustomerSelectValue(e.target.value)}>
                                    <MenuItem value={0}>Selecione um cliente</MenuItem>
                                    {customers.map((customer) => (
                                        <MenuItem key={customer.id} value={customer.id}>
                                            {customer.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors?.clienteId && errors.clienteId?.message}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MobileDatePicker
                                    variant="filled"
                                    label="Previsão de entrega (mês/dia/ano)"
                                    value={previsaoEntrega}
                                    {...register('previsao')}
                                    minDate={new Date()}
                                    onChange={(newValue) => {
                                        setPrevisaoEntrega(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            sx={{ mt: 1 }}
                                            error={errors?.previsaoEntrega}
                                            helperText={errors?.previsao && errors.previsao?.message}
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ mr: 2 }}>
                    <Button color="error" onClick={cancelForm}>
                        Cancelar
                    </Button>
                    <Button type="submit" color="success">
                        Salvar
                    </Button>
                </DialogActions>
            </Box>
        </DialogConfig>
    );
}
