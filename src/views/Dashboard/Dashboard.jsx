import { Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import DashboardGrid from './components/DashboardGrid';

export default function Dashboard() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mt: 6
                }}>
                <Grid item xs={12} md={12} lg={12}>
                    <DashboardGrid />
                </Grid>
            </Box>
        </motion.div>
    );
}
