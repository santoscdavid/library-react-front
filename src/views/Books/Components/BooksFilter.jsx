import { ExpandMore, FilterAlt } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { BooksContext } from '../../../context/BooksContext';
import { useContext } from 'react';

export default function BooksFilter() {
    const { getBooks, handleSearch } = useContext(BooksContext);

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
        getBooks();
    };

    return (
        <Accordion>
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
                                f
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
                                id="autor"
                                name="autor"
                                label="Autor"
                                {...register('autor')}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="lancamento"
                                name="lancamento"
                                label="Lançamento"
                                {...register('lancamento')}
                                size="small"
                                fullWidth
                                autoComplete="off"
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
