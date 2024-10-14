import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ArticleDetail, Home, PageBlock } from './pages';
import { Layout } from './components';

const App = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/:category/:slug" element={<ArticleDetail />} />
            <Route path="/page-block" element={<PageBlock />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
};

export default App;
