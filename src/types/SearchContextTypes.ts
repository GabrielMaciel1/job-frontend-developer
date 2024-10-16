import { Dispatch, SetStateAction } from "react";
import { Article } from "./ArticleTypes";

export type HeaderVariant = "default" | "articleDetail" | "pageBlock";

export interface SearchContextType {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
    loadArticles: (page: number) => Promise<void>;
    getHeaderVariant: () => HeaderVariant;
    setHeaderVariant: (variant: HeaderVariant) => void;
    articles: Article[];
    filterArticles: Article[];
    setFilterArticles: Dispatch<SetStateAction<Article[]>>;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    totalPages: number;
    handleSearch: (query: string) => void;
}
