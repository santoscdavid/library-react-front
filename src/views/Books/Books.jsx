import BooksContextProvider from '../../context/BooksContext';
import BooksTable from './Components/BooksTable';
import { motion } from 'framer-motion';

export default function Books() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BooksContextProvider>
                <BooksTable />
            </BooksContextProvider>
        </motion.div>
    );
}
