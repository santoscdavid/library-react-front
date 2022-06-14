import { Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import CustomersContextProvider from '../../context/CustomersContext';
import CustomersTable from './Components/CustomersTable';
import CustomersFilter from './Components/CustomersFilter';

export default function Customers() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CustomersContextProvider>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        mt: 7,
                        height: '85vh'
                    }}>
                    <Grid item xs={12} md={12} lg={12}>
                        <CustomersFilter />
                        <CustomersTable />
                    </Grid>
                </Box>
            </CustomersContextProvider>
        </motion.div>
    );
}
