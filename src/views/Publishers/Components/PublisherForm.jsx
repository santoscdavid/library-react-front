import {
    styled,
    Dialog,
    Slide,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Box
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useContext } from 'react';
import { PublishersContext } from '../../../context/PublishersContext';

export default function PublishersForm() {
    const validationSchema = yup.object().shape({
        nome: yup.string().required('Campo Obrigatório'),
        cidade: yup.string().required('Campo Obrigatório')
    });

    const { show, handleClose, savePublisher, titleForm, publisherDefaultFormValues } = useContext(PublishersContext);

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
        defaultValues: publisherDefaultFormValues,
        resolver: yupResolver(validationSchema)
    });

    function cancelForm() {
        handleClose();
        reset(publisherDefaultFormValues);
    }

    return (
        <DialogConfig open={show} TransitionComponent={Transition} sx={{ padding: '2rem' }}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '20px' }}>{titleForm}</DialogTitle>
            <Box component="form" autoComplete="off" onSubmit={handleSubmit(savePublisher)}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome"
                        name="nome"
                        {...register('nome')}
                        fullWidth
                        variant="filled"
                        error={errors?.nome}
                        helperText={errors?.nome && errors.nome?.message}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Cidade"
                        name="cidade"
                        {...register('cidade')}
                        fullWidth
                        variant="filled"
                        error={errors?.cidade}
                        helperText={errors?.cidade && errors.cidade?.message}
                    />
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
