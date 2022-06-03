import { createContext, useEffect, useState } from 'react';
import api from '../configs/api';

export const BooksContext = createContext();

function BooksContextProvider({ children }) {
    const [books, setBooks] = useState([]);
    // const [bookDefaultFormValues, setBookDefaultFormValues] = useState({});
    // const [bookDeleteValues, setBookDeleteValues] = useState({});
    // const [show, setShow] = useState(false);
    // const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    // const [titleForm, setTitleForm] = useState('');
    // const [id, setId] = useState('');

    const getBooks = () => {
        api.get('/livro').then((res) => {
            const livros = res.data;
            setBooks(livros);
        });
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <BooksContext.Provider
            value={{
                books
            }}>
            {children}
        </BooksContext.Provider>
    );
}

export default BooksContextProvider;
