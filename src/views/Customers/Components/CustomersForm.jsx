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
import { forwardRef, useContext } from 'react';
import { CustomersContext } from '../../../context/CustomersContext';

export default function PublishersForm() {
    const validationSchema = yup.object().shape({
        nome: yup.string().required('Campo Obrigatório'),
        email: yup.string().email('Informe um email válido').required('Campo Obrigatório'),
        cidade: yup.string().required('Campo Obrigatório'),
        endereco: yup.string().required('Campo Obrigatório')
    });

    const { show, handleClose, saveCustomer, titleForm, customersDefaultFormValues } = useContext(CustomersContext);

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
        defaultValues: customersDefaultFormValues,
        resolver: yupResolver(validationSchema)
    });

    function cancelForm() {
        handleClose();
        reset(customersDefaultFormValues);
    }

    return (
        <DialogConfig open={show} TransitionComponent={Transition} sx={{ padding: '2rem' }}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '20px' }}>{titleForm}</DialogTitle>
            <Box component="form" autoComplete="off" onSubmit={handleSubmit(saveCustomer)}>
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
                                error={errors?.nome}
                                helperText={errors?.nome && errors.nome?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Email"
                                sx={{ pb: '3' }}
                                name="email"
                                {...register('email')}
                                fullWidth
                                variant="filled"
                                error={errors?.email}
                                helperText={errors?.email && errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Cidade"
                                name="cidade"
                                sx={{ pb: '3' }}
                                {...register('cidade')}
                                fullWidth
                                variant="filled"
                                error={errors?.cidade}
                                helperText={errors?.cidade && errors.cidade?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Endereço"
                                sx={{ pb: '1rem' }}
                                name="endereco"
                                {...register('endereco')}
                                fullWidth
                                variant="filled"
                                error={errors?.endereco}
                                helperText={errors?.endereco && errors.endereco?.message}
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
