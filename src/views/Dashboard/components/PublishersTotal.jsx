import { useEffect, useState } from 'react';
import { ArrowForward, Apartment } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import api from '../../../configs/api';
import { Link } from 'react-router-dom';

export default function PublishersTotal() {
    const [PubCount, setPubCount] = useState(0);

    function getPubCount() {
        api.get('/editora').then((res) => {
            const paginate = JSON.parse(res.headers.pagination);
            setPubCount(paginate.pageSize);
        });
    }

    useEffect(() => {
        getPubCount();
    }, [PubCount]);

    return (
        <Card sx={{ minWidth: 275, m: 1, p: 1 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <Apartment /> Editoras
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                    Total
                </Typography>
                <Typography variant="h6">{PubCount} Editoras</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', ml: 'auto', textDecoration: 'none' }}>
                <Link to="/publishers">
                    <Button size="small">
                        Ir para editoras <ArrowForward sx={{ ml: 1, fontSize: '1.2rem' }} />
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
