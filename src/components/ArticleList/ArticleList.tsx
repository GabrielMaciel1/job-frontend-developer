import { memo } from "react";
import Pagination from "../Pagination/Pagination";
import ArticleItem from "./ArticleItem/ArticleItem";
import { useArticleList } from "../../hooks/useArticleList";
import './style.css';
import ArticleHeader from "./ArticleHeader/ArticleHeader";

const ArticleList = () => {
  const {
    timeSinceUpdate,
    formatTime,
    handleUpdateClick,
    hasSearchValue,
    noResults,
    randomArticle,
    filteredArticles,
    articles,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useArticleList();

  const articlesPerPage = 20;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="article-list">
      <ArticleHeader
        noResults={noResults}
        randomArticle={randomArticle}
        hasSearchValue={hasSearchValue}
        timeSinceUpdate={timeSinceUpdate}
        formatTime={formatTime}
        handleUpdateClick={handleUpdateClick}
      />

      {currentArticles.length > 0
        ? currentArticles.map((article) => <ArticleItem key={article.url} article={article} />)
        : articles.length > 4 && <ArticleItem key={articles[4].title} article={articles[4]} />}

      {!noResults && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
};

export default memo(ArticleList);
