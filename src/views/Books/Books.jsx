import BooksContextProvider from '../../context/BooksContext';
import BooksTable from './Components/BooksTable';

export default function Books() {
    return (
        <BooksContextProvider>
            <BooksTable />
        </BooksContextProvider>
    );
}
