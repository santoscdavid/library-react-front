import {
    styled,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Box,
    Slide
} from '@mui/material';
import { forwardRef, useContext } from 'react';
import { BooksContext } from '../../../context/BooksContext';

export default function BookDeleteDialog() {
    const { showDeleteDialog, deleteBook, closeDeleteConfirm } = useContext(BooksContext);

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

    return (
        <DialogConfig
            maxWidth="200px"
            open={showDeleteDialog}
            TransitionComponent={Transition}
            sx={{ padding: '3rem' }}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '20px' }}>Deletar Livro</DialogTitle>
            <Box component="form" onSubmit={deleteBook}>
                <DialogContent sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Deseja realmente deletar esse livro?
                    </Typography>
                    <Typography variant="subtitle2">
                        Todas relações com esse livro serão excluídas. <br /> Exceto se ele estiver em um aluguel.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', mr: 2 }}>
                    <Button color="success" variant="contained" onClick={closeDeleteConfirm}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="outlined" color="error">
                        Deletar
                    </Button>
                </DialogActions>
            </Box>
        </DialogConfig>
    );
}
