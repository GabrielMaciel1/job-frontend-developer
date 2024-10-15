import { useEffect, useState } from "react";
import author from "../assets/woman.png";
import { formatDate } from "../utils/formatDate";
import '../styles/ArticleDetail.css';

const ArticleDetail = () => {
    const [selectArticle, setSelectArticle] = useState<any>(null);

    useEffect(() => {
        const getArticleFromLocalStorage = () => {
            const savedArticle = localStorage.getItem('selectedArticle');
            if (savedArticle) {
                setSelectArticle(JSON.parse(savedArticle));
            }
        };

        getArticleFromLocalStorage();
    }, []);
    console.log(selectArticle)
    if (!selectArticle) {
        return (
            <div className="loading-container">
                <p className="loading-text">Carregando...</p>
            </div>
        );
    }

    return (
        <div className="article-detail-container">
            <div className="article-detail-content">
                <img
                    src={selectArticle.icon}
                    alt="Ícone do Artigo"
                    className="article-detail-icon"
                />
                <h1 className="article-detail-title">{selectArticle.title}</h1>
                <div className="article-detail-author-container">
                    <img src={author} className="article-detail-author" alt={`${selectArticle.author}`} />
                    <p className="article-detail-author-name">{selectArticle.author}</p>
                    <p className="article-detail-publish-date">{formatDate(selectArticle.publishedAt)}</p>
                </div>
                <img
                    src={selectArticle.urlToImage}
                    alt="Imagem do Artigo"
                    className="article-detail-image"
                />
                <h3 className="article-detail-content-text">
                    {selectArticle.content}
                </h3>
                <a
                    href={selectArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="article-detail-read-more"
                >
                    Leia a matéria completa
                </a>
            </div>
        </div>
    );
};

export default ArticleDetail;
