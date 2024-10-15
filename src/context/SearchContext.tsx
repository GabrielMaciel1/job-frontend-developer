import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchArticles, searchArticles } from '../utils/api';

interface SearchContextType {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (query: string) => void;
    loadArticles: (page: number) => Promise<void>;
    headerVariant: "default" | "articleDetail";
    setHeaderVariant: (variant: "default" | "articleDetail") => void;
    articles: any[];
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [articles, setArticles] = useState<any[]>([]);
    const [headerVariant, setHeaderVariant] = useState<"default" | "articleDetail">("default");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const loadArticles = async (page: number) => {
        const data = await fetchArticles(page);

        setArticles(data.articles);
        setTotalPages(Math.ceil(data.totalResults / 20));
    };

    useEffect(() => {
        loadArticles(currentPage);
    }, []);

    const handleSearch = async (query: string) => {
        setSearchValue(query);
        const data = await searchArticles(query);
        setArticles(data.articles);
        setTotalPages(Math.ceil(data.totalResults / 20));
        setCurrentPage(1);
    };

    return (
        <SearchContext.Provider value={{ 
            searchValue, 
            setSearchValue, 
            handleSearch, 
            loadArticles,
            articles, 
            headerVariant, 
            setHeaderVariant,
            currentPage,
            setCurrentPage,
            totalPages,
        }}>
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
