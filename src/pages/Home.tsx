import { ArticleList } from "../components";
import { useSearchContext } from "../context/SearchContext";

const Home = () => {
    const { articles } = useSearchContext();

    return (
        <>
            <ArticleList articles={articles} />
        </>
    );
};

export default Home;
