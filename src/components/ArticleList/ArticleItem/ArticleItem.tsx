import { memo } from "react";
import "./style.css";
import authorImage from "../../../assets/woman.png";
import useArticleItem from "../../../hooks/useArticleItem";
import { formatDate } from "../../../utils/formatDate";

const ArticleItem = ({ article }: any) => {
    const { handleReadMore, isRead } = useArticleItem(article);
    const { title, description, urlToImage, source, publishedAt, author } = article;

    

    return (
        <div className="article-item">
            <div className="article-item-container" onClick={handleReadMore}>
                <div className="article-image">
                    <img src={urlToImage} alt={title} />
                </div>
                <div className="article-content">
                    <div className="article-header-container">
                        <p className="article-source">{source.name}</p>
                        {isRead && <p className="article-read-status">Visualizado</p>}
                    </div>
                    <h2 className="article-title-item">{title}</h2>
                    <p className="article-description">{description}</p>
                    <div className="article-footer">
                        {author && (
                            <>
                                <img src={authorImage} className="article-author" alt={author} />
                                <p className="article-author-name">{author}</p>
                            </>
                        )}
                        <p className="article-date">{formatDate(publishedAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ArticleItem);
