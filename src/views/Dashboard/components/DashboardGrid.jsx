import { Box, Container } from '@mui/material';
import LineChart from './Charts/LineChart';
import PizzaChart from './Charts/PizzaChart';
import BooksTotal from './Counters/BooksTotal';
import CustomersTotal from './Counters/CustomersTotal';
import PublishersTotal from './Counters/PublishersTotal';
import RentsTotal from './Counters/RentsTotal';

export default function DashboardGrid() {
    return (
        <Container maxWidth="lg" sx={{ height: '85vh' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', mt: 6 }}>
                <PublishersTotal />
                <BooksTotal />
                <CustomersTotal />
                <RentsTotal />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <PizzaChart />
                <LineChart />
            </Box>
        </Container>
    );
}
