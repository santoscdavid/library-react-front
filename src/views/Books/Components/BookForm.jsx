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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Grid
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { BooksContext } from '../../../context/BooksContext';
import api from '../../../configs/api';
import { toast } from 'react-toastify';

export default function PublishersForm() {
    const validationSchema = yup.object().shape({
        nome: yup.string().required('Campo Obrigatório'),
        autor: yup.string().required('Campo Obrigatório'),
        editora: yup.number().required('Campo Obrigatório'),
        lancamento: yup
            .number()
            .required('Campo Obrigatório')
            .required('Campo Obrigatório')
            .positive('O número deve ser positivo')
            .integer('O número deve ser inteiro')
            .min(1000, 'Ano inválido')
            .max(new Date().getFullYear(), 'Ano inválido'),
        quantidade: yup
            .number()
            .required('Campo Obrigatório')
            .positive('O número deve ser positivo')
            .integer('O número deve ser inteiro')
    });

    const { show, handleClose, saveBook, titleForm, bookDefaultFormValues, selectValue, setSelectValue } =
        useContext(BooksContext);
    const [publishers, setPublishers] = useState([]);

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
        defaultValues: bookDefaultFormValues,
        resolver: yupResolver(validationSchema)
    });

    function cancelForm() {
        handleClose();
        setSelectValue(0);
        reset(bookDefaultFormValues);
    }

    const getPublishers = () => {
        api.get('/editora?PageNumber=1&PageSize=1000')
            .then((res) => {
                const editoras = res.data;
                setPublishers(editoras);
            })
            .catch(() => {
                toast.error('Não foi possivel conectar com o banco de dados de editoras');
            });
    };

    useEffect(() => {
        getPublishers();
    }, []);

    return (
        <DialogConfig open={show} TransitionComponent={Transition} sx={{ padding: '2rem' }}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '20px' }}>{titleForm}</DialogTitle>
            <Box component="form" autoComplete="off" onSubmit={handleSubmit(saveBook)}>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Nome"
                                name="nome"
                                sx={{ pb: '3' }}
                                {...register('nome')}
                                fullWidth
                                variant="filled"
                                helperText={errors?.nome && errors.nome?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Autor"
                                sx={{ pb: '3' }}
                                name="autor"
                                {...register('autor')}
                                fullWidth
                                variant="filled"
                                helperText={errors?.autor && errors.autor?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel id="editora">Editora</InputLabel>
                                <Select
                                    fullWidth
                                    name="editora"
                                    value={selectValue}
                                    {...register('editora')}
                                    onChange={(e) => setSelectValue(e.target.value)}>
                                    <MenuItem value={0}>Selecione uma editora</MenuItem>
                                    {publishers.map((pub) => (
                                        <MenuItem key={pub.id} value={pub.id}>
                                            {pub.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors?.editora && errors.editora?.message}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Ano de lançamento"
                                name="lancamento"
                                sx={{ pb: '3' }}
                                {...register('lancamento')}
                                fullWidth
                                variant="filled"
                                helperText={errors?.lancamento && errors.lancamento?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Quantidade"
                                sx={{ pb: '1rem' }}
                                name="quantidade"
                                {...register('quantidade')}
                                fullWidth
                                variant="filled"
                                helperText={errors?.quantidade && errors.quantidade?.message}
                            />
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
