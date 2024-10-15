import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useArticleDetail = () => {
    const [selectedArticle, setSelectedArticle] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getArticleFromLocalStorage = () => {
            const savedArticle = localStorage.getItem('selectedArticle');
            if (savedArticle) {
                const articleData = JSON.parse(savedArticle);
                setSelectedArticle(articleData);
                trackReadArticle(articleData.title);
            } else {
                navigate('/page-block');
            }
        };

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

        scrollToTop();
        getArticleFromLocalStorage();
    }, [navigate]);

    const trackReadArticle = (id: string) => {
        const readArticles = JSON.parse(localStorage.getItem('articles_read') || '[]');
        if (!readArticles.includes(id)) {
            readArticles.push(id);
            localStorage.setItem("articles_read", JSON.stringify(readArticles));
        }
    };

    return { selectedArticle };
};

export default useArticleDetail;
