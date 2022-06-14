import { ArrowForward, Handshake } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../../../configs/api';
import { Link } from 'react-router-dom';

export default function RentsTotal() {
    const [RentCount, setRentCount] = useState(0);

    function getRentCount() {
        api.get('/aluguel').then((res) => {
            const paginate = JSON.parse(res.headers.pagination);
            setRentCount(paginate.pageSize);
        });
    }

    useEffect(() => {
        getRentCount();
    }, [RentCount]);

    return (
        <Card sx={{ minWidth: 250, m: 1, p: 1 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <Handshake /> Alugueis
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                    Total
                </Typography>
                <Typography variant="h6">{RentCount} Alugueis</Typography>
            </CardContent>
            <CardActions>
                <Link to="/rents" className="LinkCustom">
                    <Button size="small" sx={{ ml: 'auto' }}>
                        Ir para alugueis <ArrowForward sx={{ ml: 1, fontSize: '1.2rem' }} />
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
