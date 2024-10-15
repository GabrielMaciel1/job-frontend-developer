import { memo } from "react";
import "./style.css";
import authorImage from "../../../assets/woman.png";
import useArticleItem from "../../../hooks/useArticleItem";
import { formatDate } from "../../../utils/formatDate";

const ArticleItem = ({ article }: any) => {
    const { handleReadMore, getLogoUrl } = useArticleItem(article);
    const { title, description, urlToImage, source, publishedAt, author } = article;
    const logoUrl = getLogoUrl(source.name);

    return (
        <div className="article-item">
            <div className="article-item-container" onClick={handleReadMore}>
                <div className="article-image">
                    <img src={urlToImage} alt={title} />
                </div>
                <div className="article-content">
                    {logoUrl ? (
                        <img src={logoUrl} alt={source.name} className="article-logo" />
                    ) : (
                        <p>{source.name}</p>
                    )}
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
