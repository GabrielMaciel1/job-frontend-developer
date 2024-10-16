import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../context/SearchContext";

const useArticleItem = (article: any) => {
    const navigate = useNavigate();
    const { setHeaderVariant } = useSearchContext();

    const handleReadMore = useCallback(() => {
        const readArticles = JSON.parse(localStorage.getItem("articles_read") || "[]");
        const articleReadCounts = JSON.parse(localStorage.getItem("article_read_counts") || '{}');
        const readIndicator = JSON.parse(localStorage.getItem("articles_read_indicator") || "[]");
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

        if (!readIndicator.includes(articleKey)) {
            readIndicator.push(articleKey);
            localStorage.setItem("articles_read_indicator", JSON.stringify(readIndicator));
        }


        localStorage.setItem("selectedArticle", JSON.stringify(article));

        articleReadCounts[articleKey] = (currentReadCount || 0) + 1;
        localStorage.setItem("article_read_counts", JSON.stringify(articleReadCounts));

        if (!readArticles.find((a: any) => a.url === article.url)) {
            
            localStorage.setItem("articles_read", JSON.stringify(readArticles));
        }

        setHeaderVariant("articleDetail");

        const slug = `${article.title.replace(/\s+/g, "-").toLowerCase()}-${article.source.id}`;
        navigate(`/${"category"}/${slug}`);
    }, [article, navigate, setHeaderVariant]);

    const slug = useMemo(() => {
        return `${article.title.replace(/\s+/g, "-").toLowerCase()}-${article.source.id}`;
    }, [article]);

    const isRead = useMemo(() => {
        const readIndicator = JSON.parse(localStorage.getItem("articles_read_indicator") || "[]");
        return readIndicator.includes(article.url);
    }, [article.url]);

    return { handleReadMore, slug, isRead };
};

export default useArticleItem;
