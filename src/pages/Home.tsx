import { ArticleList } from "../components";
import { useSearchContext } from "../context/SearchContext";

const Home = () => {
    const { currentPage, totalPages, setCurrentPage, filterArticles , loadArticles} = useSearchContext();

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);

    };

    return (
        <>
            <ArticleList 
                articles={filterArticles} 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
                loadArticles={loadArticles}
            />
        </>
    );
};

export default Home;
