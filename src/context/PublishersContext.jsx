import { createContext, useEffect, useState } from 'react';
import api from '../configs/api';
import { toast } from 'react-toastify';
import PublishersForm from '../views/Publishers/Components/PublisherForm';
import { Add } from '@mui/icons-material';

export const PublishersContext = createContext();

function PublishersContextProvider({ children }) {
    const [publishers, setPublishers] = useState([]);
    const [publisherDefaultFormValues, setPublisherDefaultFormValues] = useState({});
    const [show, setShow] = useState(false);
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
            api.put('/editora' + id, {
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
                    const error = response.response.data.error;
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
                .catch((response) => {
                    const error = response.response.data.error;
                    toast.error(error);
                });
        }
    };

    return (
        <PublishersContext.Provider
            value={{ publishers, show, handlerShow, handlerEdit, handleClose, savePublisher, titleForm }}>
            {children}
            {show && <PublishersForm />}
        </PublishersContext.Provider>
    );
}

export default PublishersContextProvider;
