import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';

export default function AddButtom({ click }) {
    return (
        <Button variant="text" color="primary" startIcon={<Add />} onClick={click}>
            Adicionar
        </Button>
    );
}
