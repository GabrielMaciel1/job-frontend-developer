import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";

const useArticleItem = (article: any) => {
    const navigate = useNavigate();
    const { setHeaderVariant } = useSearchContext();

    const handleReadMore = useCallback(() => {
        const readArticles = JSON.parse(localStorage.getItem("articles_read") || "[]");
        const articleReadCounts = JSON.parse(localStorage.getItem("article_read_counts") || '{}');
        const articleKey = article.url;

        const totalReadCount = readArticles.length;
        const currentReadCount = articleReadCounts[articleKey] || 0;

        if (totalReadCount >= 10) {
            setHeaderVariant("pageBlock");
            navigate("/page-block", { state: "maxArticlesReached" });
            return;
        }

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

        if (!readArticles.find((a: any) => a.url === article.url)) {
            
            localStorage.setItem("articles_read", JSON.stringify(readArticles));
        }

        setHeaderVariant("articleDetail");

        const slug = `${article.title.replace(/\s+/g, "-").toLowerCase()}-${article.source.id}`;
        navigate(`/${"category"}/${slug}`);
    }, [article, navigate, setHeaderVariant]);

    const getLogoUrl = useCallback((sourceName: any) => {
        const formattedName = sourceName.toLowerCase().replace(/\s+/g, "");
        return `https://logo.clearbit.com/${formattedName}.com`;
    }, []);

    const articleWithLogo = useMemo(() => {
        return {
            ...article,
            icon: getLogoUrl(article.source.name),
        };
    }, [article, getLogoUrl]);

    const slug = useMemo(() => {
        return `${article.title.replace(/\s+/g, "-").toLowerCase()}-${article.source.id}`;
    }, [article]);

    return { handleReadMore, getLogoUrl, articleWithLogo, slug };
};

export default useArticleItem;
