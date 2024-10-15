import { SearchProvider } from './context/SearchContext';
import Router from './routes/routes';
import CheckAnonymousTab from './utils/CheckAnonymousTab';

const App = () => {
    return (
        <SearchProvider>
            <CheckAnonymousTab />
            <Router />
        </SearchProvider>
    );
};

export default App;
