import PublishersContextProvider from '../../context/PublishersContext';
import PublishersTable from './Components/PublishersTable';

export default function Publishers() {
    return (
        <PublishersContextProvider>
            <PublishersTable />
        </PublishersContextProvider>
    );
}
