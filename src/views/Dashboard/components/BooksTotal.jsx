import { useEffect, useState } from 'react';
import api from '../../../configs/api';
import { ArrowForward, MenuBook } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BooksTotal() {
    const [BookCount, setBookCount] = useState(0);

    function getPubCount() {
        api.get('/livro').then((res) => {
            const paginate = JSON.parse(res.headers.pagination);
            setBookCount(paginate.pageSize);
        });
    }

    useEffect(() => {
        getPubCount();
    }, [BookCount]);

    return (
        <Card sx={{ minWidth: 275, m: 1, p: 1 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <MenuBook /> Livros
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                    Total
                </Typography>
                <Typography variant="h6">{BookCount} Livros</Typography>
            </CardContent>
            <CardActions>
                <Link to="/books">
                    <Button size="small" sx={{ ml: 'auto' }}>
                        Ir para livros <ArrowForward sx={{ ml: 1, fontSize: '1.2rem' }} />
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
