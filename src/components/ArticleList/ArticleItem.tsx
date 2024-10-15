import { useNavigate } from 'react-router-dom';
import './ArticleItem.css';
import author from "../../assets/woman.png";
import { formatDate } from "../../utils/formatDate";
import { useSearchContext } from '../../context/SearchContext';

const ArticleItem = ({ article }) => {
    const navigate = useNavigate();
    const {setHeaderVariant} =useSearchContext()

    const handleReadMore = () => {
        // Verificar se já existe um artigo no localStorage
        if (localStorage.getItem('selectedArticle')) {
            localStorage.removeItem('selectedArticle'); // Limpar o localStorage se já existir
        }

        const articleWithLogo = { ...article, icon: getLogoUrl(article.source.name) };
        localStorage.setItem('selectedArticle', JSON.stringify(articleWithLogo));
        setHeaderVariant('articleDetail')

        const slug = `${article.title.replace(/\s+/g, '-').toLowerCase()}-${article.source.id}`;
        navigate(`/${'category'}/${slug}`);
    };

    const getLogoUrl = (sourceName) => {
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
                    ) : (
                        <p>{article.source.name}</p>
                    )}
                    <h2 className="article-title">{article.title}</h2>
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
