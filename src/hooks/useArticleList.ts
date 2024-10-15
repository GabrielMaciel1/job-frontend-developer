import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchContext } from "../context/SearchContext";


interface Article {
  url: string;
  title: string;
  [key: string]: any;
}

interface UseArticleListReturn {
  timeSinceUpdate: number;
  formatTime: (minutes: number) => string;
  handleUpdateClick: () => void;
  hasSearchValue: boolean;
  noResults: boolean;
  randomArticle: Article | null;
  filteredArticles: Article[];
  articles: Article[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const useArticleList = (): UseArticleListReturn => {
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    filterArticles,
    loadArticles,
    searchValue,
    articles,
  } = useSearchContext();

  const [timeSinceUpdate, setTimeSinceUpdate] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSinceUpdate((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleUpdateClick = useCallback(() => {
    loadArticles(1);
    setTimeSinceUpdate(0);
  }, [loadArticles]);

  const formatTime = useCallback((minutes: number) => {
    return minutes === 0
      ? "Atualizado agora"
      : `Atualizado há ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  }, []);

  const hasSearchValue = useMemo(() => searchValue.trim() !== "", [searchValue]);

  const noResults = useMemo(() => hasSearchValue && filterArticles.length === 0, [hasSearchValue, filterArticles]);

  const randomArticle = useMemo(() => {
    return filterArticles.length > 0
      ? filterArticles[Math.floor(Math.random() * filterArticles.length)]
      : null;
  }, [filterArticles]);

  return {
    timeSinceUpdate,
    formatTime,
    handleUpdateClick,
    hasSearchValue,
    noResults,
    randomArticle,
    filteredArticles: filterArticles,
    articles,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
