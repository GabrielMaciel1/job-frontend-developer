import author from "../assets/woman.png";
import { formatDate } from "../utils/formatDate";
import useArticleDetail from "../hooks/useArticleDetail";
import '../styles/ArticleDetail.css';

const ArticleDetail = () => {
    const { selectedArticle } = useArticleDetail();

    if (!selectedArticle) {
        return (
            <div className="loading-container">
                <p className="loading-text">Carregando...</p>
            </div>
        );
    }

    return (
        <div className="article-detail-container">
            <p className="article-detail-source">{selectedArticle.source.name}</p>
            <h1 className="article-detail-title">{selectedArticle.title}</h1>
            <div className="article-detail-author-container">
                <img src={author} className="article-detail-author" alt={`${selectedArticle.author}`} />
                <p className="article-detail-author-name">{selectedArticle.author}</p>
                <p className="article-detail-publish-date">{formatDate(selectedArticle.publishedAt)}</p>
            </div>
            <img
                src={selectedArticle.urlToImage}
                alt="Imagem do Artigo"
                className="article-detail-image"
            />
            <h3 className="article-detail-content-text">
                {selectedArticle.content}
            </h3>
            <a
                href={selectedArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="article-detail-read-more"
            >
                Leia a matéria completa
            </a>
        </div>
    );
};

export default ArticleDetail;
