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
import { PublishersContext } from '../../../context/PublishersContext';

export default function PublisherDeleteDialog() {
    const { showDeleteDialog, deletePublisher, closeDeleteConfirm } = useContext(PublishersContext);

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
        <DialogConfig open={showDeleteDialog} TransitionComponent={Transition} sx={{ padding: '3rem' }}>
            <DialogTitle sx={{ textAlign: 'center', fontSize: '20px' }}>Deletar Editora</DialogTitle>
            <Box component="form" onSubmit={deletePublisher}>
                <DialogContent sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography>Deseja realmente deletar essa editora?</Typography>
                    <Typography>Todas relações com essa editora serão excluídas.</Typography>
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
