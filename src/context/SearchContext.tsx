// SearchContext.tsx
import React, { createContext, useContext, useState } from 'react';
import {  searchArticles } from '../utils/api';

interface SearchContextType {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
    handleSearch: (query: string) => void;
    headerVariant: "default" | "articleDetail";
    setHeaderVariant: (variant: "default" | "articleDetail") => void;
    articles: any
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [articles, setArticles] = useState<any[]>([]);
    const [headerVariant, setHeaderVariant] = useState<"default" | "articleDetail">("default");


    // const loadArticles = async () => {
    //     const data = await fetchArticles();
    //     setArticles(data.articles);
    // };

    // useEffect(() => {
    //     loadArticles();
    // }, []);

    const handleSearch = async (query: string) => {
        setSearchValue(query);
        const data = await searchArticles(query);
        setArticles(data.articles);
    };

    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue, handleSearch, articles, headerVariant, setHeaderVariant }}>
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
