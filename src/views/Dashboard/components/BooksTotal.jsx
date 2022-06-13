import { ArrowForward, MenuBook } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

export default function BooksTotal() {
    return (
        <Card sx={{ minWidth: 275, m: 1, p: 1 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <MenuBook /> Livros
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                    Total
                </Typography>
                <Typography variant="h6">50 Livros</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" sx={{ ml: 'auto' }}>
                    Ir para livros <ArrowForward sx={{ ml: 1, fontSize: '1.2rem' }} />
                </Button>
            </CardActions>
        </Card>
    );
}
