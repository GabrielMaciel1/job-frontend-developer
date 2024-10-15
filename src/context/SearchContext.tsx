import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { fetchArticles } from '../utils/api';
import { useLocation } from 'react-router';

type HeaderVariant = "default" | "articleDetail" | "pageBlock";

interface Article {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

interface FetchArticlesResponse {
    articles: Article[];
    totalResults: number;
}

interface SearchContextType {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    loadArticles: (page: number) => Promise<void>;
    getHeaderVariant: () => HeaderVariant;
    setHeaderVariant: (variant: HeaderVariant) => void;
    articles: Article[];
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
    children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const location = useLocation();
    const [searchValue, setSearchValue] = useState<string>("");
    const [articles, setArticles] = useState<Article[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const loadArticles = useCallback(async (page: number) => {
        const { articles, totalResults }: FetchArticlesResponse = await fetchArticles(page);
        setArticles(articles);
        setTotalPages(Math.ceil(totalResults / 20));
    }, []);

    useEffect(() => {
        loadArticles(currentPage);
    }, [currentPage, loadArticles]);

    const getHeaderVariant = useCallback((): HeaderVariant => {
        return (localStorage.getItem("headerVariant") as HeaderVariant) || "default";
    }, []);

    const setHeaderVariant = useCallback((variant: HeaderVariant) => {
        localStorage.setItem("headerVariant", variant);
    }, []);

    useEffect(() => {
        const setVariantBasedOnPath = () => {
            const path = location.pathname;
            if (path === '/') setHeaderVariant('default');
            else if (path === '/page-block') setHeaderVariant('pageBlock');
            else if (path.match(/\/[^/]+\/[^/]+/)) setHeaderVariant('articleDetail');
        };

        setVariantBasedOnPath();
    }, [location.pathname, setHeaderVariant]);

    const contextValue = useMemo(() => ({
        searchValue,
        setSearchValue,
        loadArticles,
        articles,
        getHeaderVariant,
        setHeaderVariant,
        currentPage,
        setCurrentPage,
        totalPages,
    }), [searchValue, articles, currentPage, totalPages, loadArticles, getHeaderVariant, setHeaderVariant]);

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearchContext must be used within a SearchProvider");
    }
    return context;
};
