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
// import { useForm } from 'react-hook-form';
import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
import { forwardRef, useContext } from 'react';
import { BooksContext } from '../../../context/BooksContext';

export default function PublishersForm() {
    // const validationSchema = yup.object().shape({
    //     nome: yup.string().required('Campo Obrigatório'),
    //     cidade: yup.string().required('Campo Obrigatório')
    // });

    const { show, handleClose, savePublisher, titleForm, booksDefaultFormValues } = useContext(BooksContext);

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

    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     formState: { errors }
    // } = useForm({
    //     defaultValues: booksDefaultFormValues,
    //     resolver: yupResolver(validationSchema)
    // });

    function cancelForm() {
        handleClose();
        // reset(publisherDefaultFormValues);
    }

    return (
        <DialogConfig open={show} TransitionComponent={Transition} sx={{ padding: '2rem' }}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '20px' }}>{titleForm}</DialogTitle>
            <Box
                component="form"
                autoComplete="off"
                // onSubmit={handleSubmit(savePublisher)}
            >
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome"
                        name="nome"
                        sx={{ pb: '3' }}
                        // {...register('nome')}
                        fullWidth
                        variant="filled"
                        // helperText={errors?.nome && errors.nome?.message}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Autor"
                        sx={{ pb: '3' }}
                        name="autor"
                        // {...register('autor')}
                        fullWidth
                        variant="filled"
                        // helperText={errors?.autor && errors.autor?.message}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Editora"
                        name="editora"
                        sx={{ pb: '3' }}
                        // {...register('editora')}
                        fullWidth
                        variant="filled"
                        // helperText={errors?.editora && errors.editora?.message}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Lancamento"
                        name="lancamento"
                        sx={{ pb: '3' }}
                        // {...register('lancamento')}
                        fullWidth
                        variant="filled"
                        // helperText={errors?.lancamento && errors.lancamento?.message}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Quantidade"
                        sx={{ pb: '1rem' }}
                        name="quantidade"
                        // {...register('quantidade')}
                        fullWidth
                        variant="filled"
                        // helperText={errors?.quantidade && errors.quantidade?.message}
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
