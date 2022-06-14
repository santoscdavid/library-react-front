import { ArrowForward, Group } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../../configs/api';
import { Link } from 'react-router-dom';

export default function CustomersTotal() {
    const [CustoCount, setCustoCount] = useState(0);

    function getCustoCount() {
        api.get('/usuario').then((res) => {
            const paginate = JSON.parse(res.headers.pagination);
            setCustoCount(paginate.pageSize);
        });
    }

    useEffect(() => {
        getCustoCount();
    }, [CustoCount]);

    return (
        <Card sx={{ minWidth: 275, m: 1, p: 1 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <Group /> Clientes
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                    Total
                </Typography>
                <Typography variant="h6">{CustoCount} Clientes</Typography>
            </CardContent>
            <CardActions>
                <Link to="/customers">
                    <Button size="small" sx={{ ml: 'auto' }}>
                        Ir para clientes <ArrowForward sx={{ ml: 1, fontSize: '1.2rem' }} />
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
