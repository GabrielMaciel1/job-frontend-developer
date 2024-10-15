import Pagination from "../Pagination/Pagination";
import ArticleItem from "./ArticleItem";

import './ArticleList.css';

const ArticleList = ({ articles, currentPage, totalPages, onPageChange }: any) => {
    return (
        <div className="article-list">
            <div className="article-header">
                <h1 className="article-title">
                    <strong>últimas notícias</strong>
                </h1>
                <h2 className="article-updated">
                    Atualizado há 30 minutos
                </h2>
            </div>
            {articles.map((article: any) => (
                <ArticleItem key={article.url} article={article} />
            ))}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default ArticleList;
