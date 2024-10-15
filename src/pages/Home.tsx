import { ArticleList } from "../components";
import { useSearchContext } from "../context/SearchContext";

const Home = () => {
    const { articles, currentPage, totalPages, setCurrentPage, loadArticles} = useSearchContext();

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        loadArticles(newPage);
    };

    return (
        <>
            <ArticleList 
                articles={articles} 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </>
    );
};

export default Home;
