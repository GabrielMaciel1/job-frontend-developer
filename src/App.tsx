import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ArticleDetail, Home, PageBlock } from './pages';
import { Layout } from './components';
import { SearchProvider } from './context/SearchContext';

const App = () => {
    return (
        <SearchProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/:category/:slug" element={<ArticleDetail />} />
                        <Route path="/page-block" element={<PageBlock />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </SearchProvider>
    );
};

export default App;
