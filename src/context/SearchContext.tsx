import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { fetchArticles } from '../utils/api';
import { useLocation } from 'react-router';
import { Article, FetchArticlesResponse, HeaderVariant, SearchContextType } from '../types';

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
    children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const location = useLocation();
    const [searchValue, setSearchValue] = useState<string>("");
    const [articles, setArticles] = useState<Article[]>([]);
    const [filterArticles, setFilterArticles] = useState<Article[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const loadArticles = useCallback(async (page: number) => {
        const { articles }: FetchArticlesResponse = await fetchArticles(page);
        setArticles(articles);

        setTotalPages(Math.ceil(articles.length / 20));
        setFilterArticles(articles);
    }, []);

    useEffect(() => {
        loadArticles(currentPage);
    }, []);

    const getHeaderVariant = useCallback((): HeaderVariant => {
        return (localStorage.getItem("headerVariant") as HeaderVariant) || "default";
    }, []);

    const setHeaderVariant = useCallback((variant: HeaderVariant) => {
        localStorage.setItem("headerVariant", variant);
    }, []);

    const handleSearch = useCallback((query: string) => {
        setSearchValue(query);
        
        const trimmedQuery = query.trim();
        if (trimmedQuery === "") {
            setFilterArticles(articles);
            return;
        }
    
        const lowerCaseQuery = trimmedQuery.toLowerCase();
        const filtered = articles.filter(({ title, author }) => 
            title.toLowerCase().includes(lowerCaseQuery) ||
            (author && author.toLowerCase().includes(lowerCaseQuery))
        );
        setFilterArticles(filtered);
    }, [articles, setSearchValue]);

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
        filterArticles,
        getHeaderVariant,
        setHeaderVariant,
        currentPage,
        setCurrentPage,
        totalPages,
        handleSearch,
        setFilterArticles
    }), [searchValue, filterArticles, currentPage, totalPages, loadArticles, getHeaderVariant, setHeaderVariant]);

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
