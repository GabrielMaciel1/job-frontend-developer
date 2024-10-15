import { Route, Routes } from 'react-router-dom';
import { ArticleDetail, Home, PageBlock } from './pages';
import { Layout } from './components';
import { SearchProvider } from './context/SearchContext';
import CheckAnonymousTab from './utils/CheckAnonymousTab';


const App = () => {
    return (
        <SearchProvider>
            <CheckAnonymousTab />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/:category/:slug" element={<ArticleDetail />} />
                    <Route path="/page-block" element={<PageBlock />} />
                </Route>
            </Routes>
        </SearchProvider>
    );
};

export default App;
