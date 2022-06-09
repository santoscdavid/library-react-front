import PublishersContextProvider from '../../context/PublishersContext';
import PublishersTable from './Components/PublishersTable';
import { motion } from 'framer-motion';

export default function Publishers() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PublishersContextProvider>
                <PublishersTable />
            </PublishersContextProvider>
        </motion.div>
    );
}
