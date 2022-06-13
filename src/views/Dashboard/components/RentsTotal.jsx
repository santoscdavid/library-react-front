import { ArrowForward, Handshake } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

export default function RentsTotal() {
    return (
        <Card sx={{ minWidth: 275, m: 1, p: 1 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <Handshake /> Alugueis
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                    Total
                </Typography>
                <Typography variant="h6">50 Alugueis</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" sx={{ ml: 'auto' }}>
                    Ir para alugueis <ArrowForward sx={{ ml: 1, fontSize: '1.2rem' }} />
                </Button>
            </CardActions>
        </Card>
    );
}
