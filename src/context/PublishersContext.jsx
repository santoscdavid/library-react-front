import { createContext, useEffect, useState } from 'react';
import api from '../configs/api';
import { toast } from 'react-toastify';
import PublishersForm from '../views/Publishers/Components/PublisherForm';
import PublisherDeleteDialog from '../views/Publishers/Components/PublisherDeleteDialog';

export const PublishersContext = createContext();

function PublishersContextProvider({ children }) {
    const [publishers, setPublishers] = useState([]);
    const [publisherDefaultFormValues, setPublisherDefaultFormValues] = useState({});
    const [publisherDeleteValues, setPublisherDeleteValues] = useState({});
    const [show, setShow] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [titleForm, setTitleForm] = useState('');
    const [id, setId] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalCount, setCountItens] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);

    const getPublishers = () => {
        api.get('/editora?PageNumber=' + page + '&PageSize=' + rowsPerPage)
            .then((res) => {
                const editoras = res.data;
                var paginate = JSON.parse(res.headers.pagination);

                setCountItens(paginate.totalCount);
                setCurrentPage(paginate.currentPage);
                setTotalPage(paginate.totalPage);
                setPageSize(paginate.pageSize);

                setPublishers(editoras);
            })
            .catch((res) => {
                toast.error('Não foi possivel conectar com o banco de dados');
            });
    };

    useEffect(() => {
        getPublishers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlerShow = () => {
        setTitleForm('Nova Editora');
        setShow(true);
    };

    const handleClose = () => {
        setPublisherDefaultFormValues({});
        if (id) {
            setId('');
        }
        setShow(false);
    };

    const handlerEdit = (publisherId, publisherName, publisherCity) => {
        const publisher = {
            nome: publisherName,
            cidade: publisherCity
        };
        setPublisherDefaultFormValues(publisher);
        setId(publisherId);
        setTitleForm('Editar Usuário');
        setShow(true);
    };

    const savePublisher = (data) => {
        if (id) {
            api.put('/editora/' + id, {
                id: id,
                nome: data.nome,
                cidade: data.cidade
            })
                .then((response) => {
                    if (response !== null) {
                        handleClose();
                        getPublishers();
                        toast.success('Editado com sucesso!');
                    }
                })
                .catch((response) => {
                    const error = response.data.error;
                    toast.error(error);
                });
        } else {
            api.post('editora', {
                nome: data.nome,
                cidade: data.cidade
            })
                .then((response) => {
                    if (response !== null) {
                        handleClose();
                        getPublishers();
                        toast.success('Salvo com sucesso!');
                    }
                })
                .catch((res) => {
                    console.log(res.response.data.errors);
                    const error = res.response.data.error;
                    toast.error(error);
                });
        }
    };

    const handlerDelete = (publisherId, publisherName, publisherCity) => {
        const deleteValues = {
            id: publisherId,
            nome: publisherName,
            cidade: publisherCity
        };
        setPublisherDeleteValues(deleteValues);
        setShowDeleteDialog(true);
    };

    const closeDeleteConfirm = () => {
        if (id) {
            setId('');
        }
        setPublisherDeleteValues({});
        setShowDeleteDialog(false);
    };
    const deletePublisher = () => {
        api.delete('editora/' + publisherDeleteValues.id)
            .then((response) => {
                if (response !== null) {
                    closeDeleteConfirm();
                    getPublishers();
                    toast.success('Deletada com sucesso!');
                }
            })
            .catch((response) => {
                const error = response.response.data.error;
                toast.error(error);
                closeDeleteConfirm();
            });
    };

    const paginate = (pag, row) => {
        api.get('/editora?PageNumber=' + pag + '&PageSize=' + row).then((res) => {
            const editoras = res.data;
            var page = JSON.parse(res.headers.pagination);

            setCountItens(page.totalCount);
            setCurrentPage(page.currentPage);
            setTotalPage(page.totalPage);
            setPageSize(page.pageSize);

            setPublishers(editoras);
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getPublishers();
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(1);
        // getPublishers();
        paginate(1, event.target.value);
    };

    const handleSearch = (data) => {
        api.get('/editora?PageNumber=1&PageSize=100&Nome=' + data.nome + '&Cidade=' + data.cidade).then((res) => {
            setPublishers(res.data);
        });
    };

    return (
        <PublishersContext.Provider
            value={{
                publishers,
                getPublishers,
                show,
                handlerShow,
                handleSearch,
                page,
                rowsPerPage,
                handlerEdit,
                handleClose,
                totalCount,
                savePublisher,
                setCountItens,
                titleForm,
                publisherDefaultFormValues,
                handleChangePage,
                handleChangeRowsPerPage,
                handlerDelete,
                showDeleteDialog,
                deletePublisher,
                closeDeleteConfirm,
                currentPage,
                totalPage,
                pageSize
            }}>
            {children}
            {show && <PublishersForm />}
            {showDeleteDialog && <PublisherDeleteDialog />}
        </PublishersContext.Provider>
    );
}

export default PublishersContextProvider;
