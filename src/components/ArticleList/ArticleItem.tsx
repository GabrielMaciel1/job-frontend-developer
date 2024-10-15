import { useNavigate } from "react-router-dom";
import "./ArticleItem.css";
import author from "../../assets/woman.png";
import { formatDate } from "../../utils/formatDate";
import { useSearchContext } from "../../context/SearchContext";

const ArticleItem = ({ article }: any) => {
    const navigate = useNavigate();
    const { setHeaderVariant } = useSearchContext();

    const handleReadMore = () => {
        const readArticles = JSON.parse(localStorage.getItem("articles_read") || "[]");
        const articleReadCounts = JSON.parse(localStorage.getItem("article_read_counts") || "{}");
        
        const totalReadCount = readArticles.length;
        const articleKey = article.url;

        if (totalReadCount >= 10) {
            setHeaderVariant("pageBlock");
            navigate("/page-block", { state: "maxArticlesReached" });
            return;
        }

        const currentReadCount = articleReadCounts[articleKey] || 0;

        if (currentReadCount >= 2) {
            setHeaderVariant("pageBlock");
            navigate("/page-block", { state: "maxArticleRead" });
            return;
        }

        const articleWithLogo = {
            ...article,
            icon: getLogoUrl(article.source.name),
        };

        localStorage.setItem("selectedArticle", JSON.stringify(articleWithLogo));

        articleReadCounts[articleKey] = (currentReadCount || 0) + 1;

        localStorage.setItem("article_read_counts", JSON.stringify(articleReadCounts));

        if (!readArticles.find(a => a.url === article.url)) {
            readArticles.push({ url: article.url });
            localStorage.setItem("articles_read", JSON.stringify(readArticles));
        }

        setHeaderVariant("articleDetail");

        const slug = `${article.title.replace(/\s+/g, "-").toLowerCase()}-${article.source.id}`;
        navigate(`/${"category"}/${slug}`);
    };

    const getLogoUrl = (sourceName: any) => {
        const formattedName = sourceName.toLowerCase().replace(/\s+/g, "");
        return `https://logo.clearbit.com/${formattedName}.com`;
    };

    const logoUrl = getLogoUrl(article.source.name);

    return (
        <div className="article-item">
            <div className="article-item-container" onClick={handleReadMore}>
                <div className="article-image">
                    <img src={article.urlToImage} alt={article.title} />
                </div>
                <div className="article-content">
                    {logoUrl ? (
                        <img src={logoUrl} alt={`${article.source.name}`} className="article-logo" />
                    ) : <p>{article.source.name}</p>}
                    <h2 className="article-title-item">{article.title}</h2>
                    <p className="article-description">{article.description}</p>
                    <div className="article-footer">
                        {article.author && (
                            <>
                                <img src={author} className="article-author" alt={`${article.author}`} />
                                <p className="article-author-name">{article.author}</p>
                            </>
                        )}
                        <p className="article-date">{formatDate(article.publishedAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleItem;
