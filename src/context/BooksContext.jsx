import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../configs/api';
import BookDeleteDialog from '../views/Books/Components/BookDeleteDialog';
import BookForm from '../views/Books/Components/BookForm';

export const BooksContext = createContext();

function BooksContextProvider({ children }) {
    const [books, setBooks] = useState([]);
    const [bookDefaultFormValues, setBookDefaultFormValues] = useState({});
    const [show, setShow] = useState(false);
    const [bookDeleteValues, setBookDeleteValues] = useState({});
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [titleForm, setTitleForm] = useState('');
    const [id, setId] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalCount, setCountItens] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [selectValue, setSelectValue] = useState(0);

    const getBooks = () => {
        api.get('/livro?PageNumber=' + page + '&PageSize=' + rowsPerPage)
            .then((res) => {
                const livros = res.data;
                var paginate = JSON.parse(res.headers.pagination);

                setCountItens(paginate.totalCount);
                setCurrentPage(paginate.currentPage);
                setTotalPage(paginate.totalPage);
                setPageSize(paginate.pageSize);
                setBooks(livros);
            })
            .catch(() => {
                toast.error('Não foi possivel conectar com o banco de dados');
            });
    };

    useEffect(() => {
        getBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlerShow = () => {
        setTitleForm('Novo Livro');
        setShow(true);
    };

    const handleClose = () => {
        setBookDefaultFormValues({});
        if (id) {
            setId('');
        }
        setShow(false);
    };

    const handlerEdit = (id, nome, editora, autor, lancamento, quantidade) => {
        const book = {
            nome,
            autor,
            editora,
            lancamento,
            quantidade
        };
        console.log(book);
        setBookDefaultFormValues(book);
        setId(id);
        setSelectValue(book.editora);
        setTitleForm('Editar Livro');
        setShow(true);
    };

    const saveBook = (data) => {
        if (id) {
            api.put('/livro/' + id, {
                id: id,
                nome: data.nome,
                autor: data.autor,
                editoraId: data.editora,
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
                    const error = res.response.data.error;
                    toast.error(error);
                });
        } else {
            api.post('livro', {
                nome: data.nome,
                autor: data.autor,
                editoraId: selectValue,
                lancamento: data.lancamento,
                quantidade: data.quantidade
            })
                .then((response) => {
                    if (response !== null) {
                        handleClose();
                        getBooks();
                        toast.success('Salvo com sucesso!');
                        setSelectValue(0);
                    }
                })
                .catch((res) => {
                    console.log(res.response.data.errors);
                    const error = res.response.data.error;
                    toast.error(error);
                });
        }
    };

    const handlerDelete = (bookId) => {
        const deleteValues = {
            id: bookId
        };
        setBookDeleteValues(deleteValues);
        setShowDeleteDialog(true);
    };

    const closeDeleteConfirm = () => {
        if (id) {
            setId('');
        }
        setBookDeleteValues({});
        setShowDeleteDialog(false);
    };

    const deleteBook = () => {
        api.delete('livro/' + bookDeleteValues.id)
            .then((response) => {
                if (response !== null) {
                    closeDeleteConfirm();
                    getBooks();
                    toast.success('Deletado(a) com sucesso!');
                }
            })
            .catch((response) => {
                const error = response.response.data.error;
                toast.error(error);
                closeDeleteConfirm();
            });
    };

    const paginate = (pag, row) => {
        api.get('/livro?PageNumber=' + pag + '&PageSize=' + row).then((res) => {
            const livros = res.data;
            var page = JSON.parse(res.headers.pagination);

            setCountItens(page.totalCount);
            setCurrentPage(page.currentPage);
            setTotalPage(page.totalPage);
            setPageSize(page.pageSize);

            setBooks(livros);
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getBooks();
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(1);
        paginate(1, event.target.value);
    };

    const handleSearch = (data) => {
        api.get(
            '/livro?PageNumber=1&PageSize=100&Nome=' +
                data.nome +
                '&Autor=' +
                data.autor +
                '&Lancamento=' +
                data.lancamento
        )
            .then((res) => {
                setBooks(res.data);
            })
            .catch(() => {
                toast.error('Não foi possível se conectar com o banco de dados');
            });
    };

    return (
        <BooksContext.Provider
            value={{
                books,
                getBooks,
                showDeleteDialog,
                bookDefaultFormValues,
                handlerEdit,
                handlerDelete,
                handlerShow,
                handleClose,
                closeDeleteConfirm,
                show,
                titleForm,
                saveBook,
                deleteBook,
                totalCount,
                currentPage,
                totalPage,
                pageSize,
                selectValue,
                setSelectValue,
                rowsPerPage,
                handleChangePage,
                handleChangeRowsPerPage,
                handleSearch
            }}>
            {children}
            {show && <BookForm />}
            {showDeleteDialog && <BookDeleteDialog />}
        </BooksContext.Provider>
    );
}

export default BooksContextProvider;
