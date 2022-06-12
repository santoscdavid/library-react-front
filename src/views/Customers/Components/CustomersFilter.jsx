import { ExpandMore, FilterAlt } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { CustomersContext } from '../../../context/CustomersContext';

export default function CustomersFilter() {
    const { getCustomers, handleSearch } = useContext(CustomersContext);

    const validationSchema = yup.object().shape({
        nome: yup.string(),
        autor: yup.string(),
        lancamento: yup.string()
    });

    const { register, handleSubmit, resetField } = useForm({
        defaultValues: {
            nome: '',
            autor: '',
            lancamento: ''
        },
        resolver: yupResolver(validationSchema)
    });

    const cleanFilter = () => {
        resetField('nome');
        resetField('autor');
        resetField('lancamento');
        getCustomers();
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
                        <Grid item xs={3}>
                            <TextField
                                id="nome"
                                name="nome"
                                label="Nome"
                                {...register('nome')}
                                size="small"
                                fullWidth
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                {...register('email')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="cidade"
                                name="cidade"
                                label="Cidade"
                                {...register('cidade')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="endereco"
                                name="endereco"
                                label="Endereço"
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
                                    variant="contained"
                                    size="small"
                                    color="inherit"
                                    sx={{ mr: 1 }}
                                    onClick={cleanFilter}>
                                    Limpar
                                </Button>
                                <Button variant="contained" size="small" type="submit">
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
