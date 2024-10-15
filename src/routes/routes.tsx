import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components';
import { ArticleDetail, Home, PageBlock } from '../pages';

const Router = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/:category/:slug" element={<ArticleDetail />} />
                <Route path="/page-block" element={<PageBlock />} />
            </Route>
        </Routes>
    );
};

export default Router;
