import { FilterAlt } from '@mui/icons-material';
import { Grid, Paper, Typography, Box, TextField, Button } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { PublishersContext } from '../../../context/PublishersContext';

export default function PublishersFilter() {
    const { getPublishers, handleSearch } = useContext(PublishersContext);

    const validationSchema = yup.object().shape({
        nome: yup.string(),
        cidade: yup.string()
    });

    const { register, handleSubmit, resetField } = useForm({
        defaultValues: {
            nome: '',
            cidade: ''
        },
        resolver: yupResolver(validationSchema)
    });

    const cleanFilter = () => {
        resetField('nome');
        resetField('cidade');
        getPublishers();
    };

    return (
        <Grid item xs={12} md={8} lg={9} sx={{ mb: 2 }}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto'
                }}>
                <Box component="form" autoComplete="off" onSubmit={handleSubmit(handleSearch)}>
                    <Typography
                        fontSize={21}
                        sx={{ my: 1, display: 'flex', mt: 1, alignContent: 'center', alignItems: 'center' }}>
                        <FilterAlt
                            sx={{
                                mr: 1
                            }}
                        />
                        Filtros
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <TextField
                                id="nome"
                                name="nome"
                                label="Nome"
                                {...register('nome')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="cidade"
                                name="cidade"
                                label="Cidade"
                                {...register('cidade')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid
                            item
                            xs={3}
                            sx={{
                                alignItems: 'center',
                                JustifyContent: 'center',
                                textAlign: 'center'
                            }}>
                            <div
                                sx={{
                                    width: '100%',

                                    display: 'inline-block'
                                }}>
                                <Button
                                    variant="contained"
                                    size="medium"
                                    color="inherit"
                                    sx={{ mr: 1 }}
                                    onClick={cleanFilter}>
                                    Limpar
                                </Button>
                                <Button variant="contained" size="medium" type="submit">
                                    Filtrar
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Grid>
    );
}
