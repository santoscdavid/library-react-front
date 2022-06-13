import { ExpandMore, FilterAlt } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { RentsContext } from '../../../context/RentsContext';

export default function RentsFilter() {
    const { getRents, handleSearch } = useContext(RentsContext);

    const validationSchema = yup.object().shape({
        nome: yup.string(),
        email: yup.string(),
        cidade: yup.string(),
        endereco: yup.string()
    });

    const { register, handleSubmit, resetField } = useForm({
        defaultValues: {
            nome: '',
            email: '',
            cidade: '',
            endereco: ''
        },
        resolver: yupResolver(validationSchema)
    });

    const cleanFilter = () => {
        resetField('nome');
        resetField('email');
        resetField('cidade');
        resetField('endereco');
        getRents();
    };

    return (
        <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography
                    fontSize={20}
                    sx={{ display: 'flex', mt: 1, ml: 1, alignContent: 'center', alignItems: 'center' }}>
                    <FilterAlt
                        sx={{
                            mr: 1
                        }}
                    />
                    Filtros
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box component="form" autoComplete="off" onSubmit={handleSubmit(handleSearch)}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <TextField
                                disabled
                                id="nome"
                                name="nome"
                                label="Livro"
                                {...register('nome')}
                                size="small"
                                fullWidth
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                disabled
                                id="email"
                                name="email"
                                label="Cliente"
                                {...register('email')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                disabled
                                id="cidade"
                                name="cidade"
                                label="Data de alguel"
                                {...register('cidade')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                disabled
                                id="endereco"
                                name="endereco"
                                label="Previsão de entrega"
                                {...register('endereco')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                disabled
                                id="endereco"
                                name="endereco"
                                label="Devolução"
                                {...register('endereco')}
                                size="small"
                                fullWidth
                            />
                        </Grid>

                        <Grid
                            item
                            xs={2}
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
                                    disabled
                                    variant="contained"
                                    size="small"
                                    color="inherit"
                                    sx={{ mr: 1 }}
                                    onClick={cleanFilter}>
                                    Limpar
                                </Button>
                                <Button disabled variant="contained" size="small" type="submit">
                                    Filtrar
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}
