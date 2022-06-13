import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../configs/api';
import CustomersDeleteDialog from '../views/Customers/Components/CustomersDeleteDialog';
import CustomersForm from '../views/Customers/Components/CustomersForm';

export const CustomersContext = createContext();

function CustomersContextProvider({ children }) {
    const [customers, setCustomers] = useState([]);
    const [customersDefaultFormValues, setCustomersDefaultFormValues] = useState({});
    const [show, setShow] = useState(false);
    const [customersDeleteValues, setCustomersDeleteValues] = useState({});
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [titleForm, setTitleForm] = useState('');
    const [id, setId] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalCount, setCountItens] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);

    const getCustomers = () => {
        api.get('/usuario?PageNumber=' + page + '&PageSize=' + rowsPerPage)
            .then((res) => {
                const usuarios = res.data;
                var paginate = JSON.parse(res.headers.pagination);

                setCountItens(paginate.totalCount);
                setCurrentPage(paginate.currentPage);
                setTotalPage(paginate.totalPage);
                setPageSize(paginate.pageSize);
                setCustomers(usuarios);
            })
            .catch(() => {
                toast.error('Não foi possivel conectar com o banco de dados');
            });
    };

    useEffect(() => {
        getCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlerShow = () => {
        setTitleForm('Novo Cliente');
        setShow(true);
    };

    const handleClose = () => {
        setCustomersDefaultFormValues({});
        if (id) {
            setId('');
        }
        setShow(false);
    };

    const handlerEdit = (id, nome, email, cidade, endereco) => {
        const cliente = {
            nome: nome,
            email: email,
            cidade: cidade,
            endereco: endereco
        };
        console.log(cliente);
        setCustomersDefaultFormValues(cliente);
        setId(id);
        setTitleForm('Editar Cliente');
        setShow(true);
    };

    const saveCustomer = (data) => {
        if (id) {
            api.put('/usuario/' + id, {
                id: id,
                nome: data.nome,
                email: data.email,
                cidade: data.cidade,
                endereco: data.endereco
            })
                .then((response) => {
                    if (response !== null) {
                        handleClose();
                        getCustomers();
                        toast.success('Editado com sucesso!');
                    }
                })
                .catch((res) => {
                    console.log(res.response.data.errors);
                    const error = res.response.data.error;
                    toast.error(error);
                });
        } else {
            api.post('usuario', {
                nome: data.nome,
                email: data.email,
                cidade: data.cidade,
                endereco: data.endereco
            })
                .then((response) => {
                    if (response !== null) {
                        handleClose();
                        getCustomers();
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

    const handlerDelete = (customersId) => {
        const deleteValues = {
            id: customersId
        };
        setCustomersDeleteValues(deleteValues);
        setShowDeleteDialog(true);
    };

    const closeDeleteConfirm = () => {
        if (id) {
            setId('');
        }
        setCustomersDeleteValues({});
        setShowDeleteDialog(false);
    };

    const deleteBook = () => {
        api.delete('usuario/' + customersDeleteValues.id)
            .then((response) => {
                if (response !== null) {
                    closeDeleteConfirm();
                    getCustomers();
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
        api.get('/usuario?PageNumber=' + pag + '&PageSize=' + row).then((res) => {
            const usuarios = res.data;
            var page = JSON.parse(res.headers.pagination);

            setCountItens(page.totalCount);
            setCurrentPage(page.currentPage);
            setTotalPage(page.totalPage);
            setPageSize(page.pageSize);

            setCustomers(usuarios);
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getCustomers();
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(1);
        paginate(1, event.target.value);
    };

    const handleSearch = (data) => {
        api.get(
            '/usuario?PageNumber=1&PageSize=100&Nome=' +
                data.nome +
                '&email=' +
                data.email +
                '&Cidade=' +
                data.cidade +
                '&Endereco=' +
                data.endereco
        )
            .then((res) => {
                setCustomers(res.data);
            })
            .catch(() => {
                toast.error('Não foi possível se conectar com o banco de dados');
            });
    };

    return (
        <CustomersContext.Provider
            value={{
                customers,
                getCustomers,
                showDeleteDialog,
                customersDefaultFormValues,
                handlerEdit,
                handlerDelete,
                handlerShow,
                handleClose,
                closeDeleteConfirm,
                show,
                titleForm,
                saveCustomer,
                deleteBook,
                totalCount,
                currentPage,
                totalPage,
                pageSize,
                rowsPerPage,
                handleChangePage,
                handleChangeRowsPerPage,
                handleSearch
            }}>
            {children}
            {show && <CustomersForm />}
            {showDeleteDialog && <CustomersDeleteDialog />}
        </CustomersContext.Provider>
    );
}

export default CustomersContextProvider;
