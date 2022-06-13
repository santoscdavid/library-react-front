import { Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import { motion } from 'framer-motion';
import RentsContextProvider from '../../context/RentsContext';
import RentsFilter from './Components/RentsFilter';
import RentsTable from './Components/RentsTable';

export default function Rents() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RentsContextProvider>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        mt: 6,
                        height: '85vh'
                    }}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Container maxWidth="xl" sx={{ height: '100%' }}>
                            <RentsFilter />
                            <RentsTable />
                        </Container>
                    </Grid>
                </Box>
            </RentsContextProvider>
        </motion.div>
    );
}
