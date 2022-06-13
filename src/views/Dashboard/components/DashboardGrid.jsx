import { Box } from '@mui/material';
import BooksTotal from './BooksTotal';
import CustomersTotal from './CustomersTotal';
import PublishersTotal from './PublishersTotal';
import RentsTotal from './RentsTotal';

export default function DashboardGrid() {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', mt: 7 }}>
            <PublishersTotal />
            <BooksTotal />
            <CustomersTotal />
            <RentsTotal />
        </Box>
    );
}
