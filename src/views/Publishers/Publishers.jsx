import PublishersContextProvider from '../../context/PublishersContext';
import PublishersTable from './Components/PublishersTable';
import { motion } from 'framer-motion';
import { Box, Container, Grid } from '@mui/material';
import PublishersFilter from './Components/PublishersFilter';

export default function Publishers() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PublishersContextProvider>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        mt: 6
                    }}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Container maxWidth="xl" sx={{ height: 'auto' }}>
                            <PublishersFilter />
                            <PublishersTable />
                        </Container>
                    </Grid>
                </Box>
            </PublishersContextProvider>
        </motion.div>
    );
}
