import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Theme } from './components/Themes/Theme';
import { ThemeProvider, Box, Container, CssBaseline, Toolbar } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import DrawerContextProvider from './context/DrawerContext';
import Appbar from './components/Appbar/Appbar';
import Drawer from './components/Drawer/Drawer';
import Dashboard from './views/Dashboard/Dashboard';
import Publishers from './views/Publishers/Publishers';
import Books from './views/Books/Books';
import Rents from './views/Rents/Rents';
import Customers from './views/Customers/Customers';

function App() {
    return (
        <ThemeProvider theme={Theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DrawerContextProvider>
                    <Appbar />
                    <Drawer />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                            flexGrow: 1,
                            height: 'auto',
                            overflow: 'auto'
                        }}></Box>
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Router>
                            <Routes>
                                <Route path="/" exact element={<Dashboard />} />
                                <Route path="/publishers" exact element={<Publishers />} />
                                <Route path="/books" exact element={<Books />} />
                                <Route path="/rents" exact element={<Rents />} />
                                <Route path="/customers" exact element={<Customers />} />
                            </Routes>
                        </Router>
                    </Container>
                </DrawerContextProvider>
                <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </Box>
        </ThemeProvider>
    );
}

export default App;
