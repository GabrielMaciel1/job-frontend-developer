import { Article } from "./ArticleTypes";

export interface ArticleHeaderProps {
    noResults: boolean;
    randomArticle: Article | null;
    hasSearchValue: boolean;
    timeSinceUpdate: number;
    formatTime: (minutes: number) => string;
    handleUpdateClick: () => void;
}
