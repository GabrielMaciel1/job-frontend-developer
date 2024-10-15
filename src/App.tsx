// App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ArticleDetail, Home, PageBlock } from './pages';
import { Layout } from './components';
import { SearchProvider } from './context/SearchContext'; // Importe o SearchProvider

const App: React.FC = () => {
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
