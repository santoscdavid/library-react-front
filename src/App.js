import { BrowserRouter } from 'react-router-dom';
import { Theme } from './components/Themes/Theme';
import { ThemeProvider, Box, Container, CssBaseline, Toolbar } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import DrawerContextProvider from './context/DrawerContext';
import Appbar from './components/Appbar/Appbar';
import Drawer from './components/Drawer/Drawer';
import AnimatedRoutes from './components/AnimatedRoutes/AnimatedRoutes';

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
                        <BrowserRouter>
                            <AnimatedRoutes />
                        </BrowserRouter>
                    </Container>
                </DrawerContextProvider>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Box>
        </ThemeProvider>
    );
}

export default App;
