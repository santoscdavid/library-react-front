import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../configs/api';
import BookForm from '../views/Books/Components/BookForm';

export const BooksContext = createContext();

function BooksContextProvider({ children }) {
    const [books, setBooks] = useState([]);
    const [bookDefaultFormValues, setBookDefaultFormValues] = useState({});
    // const [bookDeleteValues, setBookDeleteValues] = useState({});
    const [show, setShow] = useState(false);
    // const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [titleForm, setTitleForm] = useState('');
    const [id, setId] = useState('');
    const [loadingTitle, setLoadingTitle] = useState('');
    const [targetValue, setTargetValue] = useState('');

    const getBooks = () => {
        api.get('/livro').then((res) => {
            const livros = res.data;
            setBooks(livros);
        });
    };

    useEffect(() => {
        getBooks();
    }, []);

    const loading = () => {
        if (targetValue && !(books.length > 0)) {
            setLoadingTitle('Nenhum usuário encontrado');
        } else {
            setLoadingTitle('Carregando dados');
        }
    };

    useEffect(() => {
        loading();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [books]);

    const handlerShow = () => {
        setTitleForm('Novo livro');
        setShow(true);
    };

    const handleClose = () => {
        setBookDefaultFormValues({});
        if (id) {
            setId('');
        }
        setShow(false);
    };

    // const handlerEdit = (publisherId, publisherName, publisherCity) => {
    //     const publisher = {
    //         nome: publisherName,
    //         cidade: publisherCity
    //     };
    //     setPublisherDefaultFormValues(publisher);
    //     setId(publisherId);
    //     setTitleForm('Editar Usuário');
    //     setShow(true);
    // };

    const savePublisher = (data) => {
        if (id) {
            api.put('/livro/' + id, {
                id: id,
                nome: data.nome,
                autor: data.autor,
                editora: data.editora,
                lancamento: data.lancamento,
                quantidade: data.quantidade
            })
                .then((response) => {
                    if (response !== null) {
                        handleClose();
                        getBooks();
                        toast.success('Editado com sucesso!');
                    }
                })
                .catch((res) => {
                    console.log(res.response.data.errors);
                    // const error = response.data.error;
                    // toast.error(error);
                });
        } else {
            api.post('livro', {
                nome: data.nome,
                autor: data.autor,
                editora: data.editora,
                lancamento: data.lancamento,
                quantidade: data.quantidade
            })
                .then((response) => {
                    if (response !== null) {
                        handleClose();
                        getBooks();
                        toast.success('Salvo com sucesso!');
                    }
                })
                .catch((res) => {
                    console.log(res.response.data.errors);
                    // const error = response.response.data.error;
                    // toast.error(error);
                });
        }
    };

    // const handlerDelete = (publisherId, publisherName, publisherCity) => {
    //     const deleteValues = {
    //         id: publisherId,
    //         nome: publisherName,
    //         cidade: publisherCity
    //     };
    //     setPublisherDeleteValues(deleteValues);
    //     setShowDeleteDialog(true);
    // };

    // const closeDeleteConfirm = () => {
    //     if (id) {
    //         setId('');
    //     }
    //     setShowDeleteDialog(false);
    // };
    // const deletePublisher = () => {
    //     api.delete('editora/' + publisherDeleteValues.id)
    //         .then((response) => {
    //             if (response !== null) {
    //                 closeDeleteConfirm();
    //                 getPublishers();
    //                 toast.success('Deletada com sucesso!');
    //             }
    //         })
    //         .catch((response) => {
    //             const error = response.response.data.error;
    //             toast.error(error);
    //             closeDeleteConfirm();
    //         });
    // };

    return (
        <BooksContext.Provider
            value={{
                books,
                bookDefaultFormValues,
                handlerShow,
                handleClose,
                show,
                titleForm
            }}>
            {children}
            {show && <BookForm />}
        </BooksContext.Provider>
    );
}

export default BooksContextProvider;
