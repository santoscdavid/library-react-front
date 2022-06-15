import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Grid, Link, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import api from '../../../configs/api';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext';

export default function LoginForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setIsAuth } = useContext(AuthContext);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const user = new FormData(e.currentTarget);

        api.post('/admin/login', { username: user.get('username'), password: user.get('password') })
            .then((res) => {
                setIsAuth(true);
                setLoading(false);
                navigate('/dashboard');
            })
            .catch((err) => {
                toast.error(err.response.data.error);
                setLoading(false);
                setIsAuth(false);
            });
    };

    return (
        <Grid item xs={12} sm={8} md={5}>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Entrar
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Usuário"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <LoadingButton
                        size="small"
                        loading={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        Entrar
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Esqueceu a senha?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {'Não tem conta? Se registrar'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
}
