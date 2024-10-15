import { useNavigate } from "react-router";
import { useSearchContext } from "../context/SearchContext";


const useHeaderLogic = () => {
    const navigate = useNavigate();
    const {
        searchValue,
        articles,
        setSearchValue,
        setHeaderVariant,
        getHeaderVariant,
        handleSearch,
        setFilterArticles,
    } = useSearchContext();

    const headerVariant = getHeaderVariant();

    const handleClearSearch = () => {
        setSearchValue("");
        setFilterArticles(articles);
    };

    const handleBack = () => {
        if (localStorage.getItem("selectedArticle")) {
            localStorage.removeItem("selectedArticle");
        }
        setHeaderVariant("default");
        navigate(`/`);
    };
    const isArticleDetailOrPageBlock = headerVariant === "articleDetail" || headerVariant === "pageBlock";
    
    return {
        searchValue,
        handleClearSearch,
        handleBack,
        headerVariant,
        handleSearch,
        isArticleDetailOrPageBlock 
    };
};

export default useHeaderLogic;
