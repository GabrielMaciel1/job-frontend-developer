import { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import Pagination from "../Pagination/Pagination";
import ArticleItem from "./ArticleItem";
import './ArticleList.css';

const ArticleList = ({ articles, currentPage, totalPages, onPageChange, loadArticles }: any) => {
    const [timeSinceUpdate, setTimeSinceUpdate] = useState(0);

    const formatTime = (minutes: number) => {
        if (minutes === 0) return "Atualizado agora";
        return `Atualizado há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeSinceUpdate(prev => prev + 1);
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const handleUpdateClick = () => {
        loadArticles();
        setTimeSinceUpdate(0);
    };

    return (
        <div className="article-list">
            <div className="article-header">
                <h1 className="article-title">
                    <strong>últimas notícias</strong>
                </h1>
                <h2 className="article-updated">
                    {formatTime(timeSinceUpdate)}
                    
                        
                    
                </h2>
                <FiRefreshCw size={20} onClick={handleUpdateClick} style={{cursor: 'pointer'}}/>
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
