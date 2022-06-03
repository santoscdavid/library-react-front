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

    const getPublishers = () => {
        api.get('/editora').then(({ data }) => {
            const editoras = data;
            setPublishers(editoras);
        });
    };

    useEffect(() => {
        getPublishers();
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
                    // const error = response.data.error;
                    // toast.error(error);
                    console.log(response);
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
                    // const error = response.response.data.error;
                    // toast.error(error);
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

    return (
        <PublishersContext.Provider
            value={{
                publishers,
                show,
                handlerShow,
                handlerEdit,
                handleClose,
                savePublisher,
                titleForm,
                publisherDefaultFormValues,
                handlerDelete,
                showDeleteDialog,
                deletePublisher,
                closeDeleteConfirm
            }}>
            {children}
            {show && <PublishersForm />}
            {showDeleteDialog && <PublisherDeleteDialog />}
        </PublishersContext.Provider>
    );
}

export default PublishersContextProvider;
