import { motion } from 'framer-motion';
import DashboardGrid from './components/DashboardGrid';

export default function Dashboard() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DashboardGrid />
        </motion.div>
    );
}
