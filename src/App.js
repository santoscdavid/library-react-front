import './styles/main.scss';
import Drawer from './components/Drawer/Drawer.jsx';

import { ThemeProvider } from 'styled-components';
import { Theme } from './components/Themes/Theme';

function App() {
    return (
        <ThemeProvider theme={Theme}>
            <Drawer />
        </ThemeProvider>
    );
}

export default App;
