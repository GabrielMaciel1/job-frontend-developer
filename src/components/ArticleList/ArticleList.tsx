import { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import Pagination from "../Pagination/Pagination";
import ArticleItem from "./ArticleItem";
import "./ArticleList.css";
import { useSearchContext } from "../../context/SearchContext";

const ArticleList = () => {
    const {
        currentPage,
        totalPages,
        setCurrentPage,
        filterArticles,
        loadArticles,
        searchValue,
        articles,
    } = useSearchContext();

    const [timeSinceUpdate, setTimeSinceUpdate] = useState(0);

    const formatTime = (minutes: number) =>
        minutes === 0
            ? "Atualizado agora"
            : `Atualizado há ${minutes} ${
                  minutes === 1 ? "minuto" : "minutos"
              }`;

    useEffect(() => {
        const intervalId = setInterval(
            () => setTimeSinceUpdate((prev) => prev + 1),
            60000
        );
        return () => clearInterval(intervalId);
    }, []);

    const handleUpdateClick = () => {
        loadArticles(1);
        setTimeSinceUpdate(0);
    };

    const hasSearchValue = searchValue.trim();
    const noResults = hasSearchValue && filterArticles.length === 0;

    const randomArticle =
        filterArticles.length > 0
            ? filterArticles[Math.floor(Math.random() * filterArticles.length)]
            : null;

    return (
        <div className="article-list">
            <div
                className="article-header"
                style={{ display: noResults ? "grid" : "" }}
            >
                {noResults && (
                    <div
                        className="no-results-message"
                        style={{
                            color: "#475569",
                            textAlign: "center",
                            fontWeight: "400",
                            fontSize: "20px",
                            height: "200px",
                        }}
                    >
                        <p style={{ margin: 0 }}>
                            Não foi encontrado nenhum resultado com o termo
                            pesquisado.
                        </p>
                        <p style={{ margin: 0 }}>
                            Talvez você goste da nossa sugestão de notícias:
                        </p>
                        {randomArticle && (
                            <ArticleItem article={randomArticle} />
                        )}
                    </div>
                )}
                <h1 className="article-title">
                    <strong>
                        {hasSearchValue && !noResults
                            ? "O Resultado da sua busca"
                            : noResults
                            ? "Sugestão de notícias"
                            : "Últimas notícias"}
                    </strong>
                </h1>
                {!hasSearchValue && (
                    <>
                        <h2 className="article-updated">
                            {formatTime(timeSinceUpdate)}
                        </h2>
                        <FiRefreshCw
                            size={16}
                            onClick={handleUpdateClick}
                            style={{ cursor: "pointer" }}
                        />
                    </>
                )}
            </div>

            {filterArticles.length > 0
                ? filterArticles.map((article: any) => (
                      <ArticleItem key={article.url} article={article} />
                  ))
                : articles.length > 4 && (
                      <ArticleItem
                          key={articles[4].title}
                          article={articles[4]}
                      />
                  )}
            {!noResults && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};

export default ArticleList;
