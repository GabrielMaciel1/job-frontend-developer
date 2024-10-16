export interface Article {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface FetchArticlesResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    url: string;
    title: string;
    [key: string]: any;
}

export interface UseArticleListReturn {
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
