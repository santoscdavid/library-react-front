import './styles/main.scss';
import Drawer from './components/Drawer/Drawer.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Theme } from './components/Themes/Theme';
import Publishers from './views/Publishers/Publishers';
import Dashboard from './views/Dashboard/Dashboard';
import Books from './views/Books/Books';
import Rents from './views/Rents/Rents';
import Customers from './views/Customers/Customers';

function App() {
    return (
        <Router>
            <ThemeProvider theme={Theme}>
                <Drawer />
                <Routes>
                    <Route path="/" exact element={<Dashboard />} />
                    <Route path="/publishers" exact element={<Publishers />} />
                    <Route path="/books" exact element={<Books />} />
                    <Route path="/rents" exact element={<Rents />} />
                    <Route path="/customers" exact element={<Customers />} />
                </Routes>
            </ThemeProvider>
        </Router>
    );
}

export default App;
