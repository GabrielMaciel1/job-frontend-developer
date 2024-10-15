import { FiRefreshCw } from "react-icons/fi";
import "./style.css";
import ArticleItem from "../ArticleItem/ArticleItem";
import { memo } from "react";

interface ArticleHeaderProps {
    noResults: boolean;
    randomArticle: any;
    hasSearchValue: boolean;
    timeSinceUpdate: number;
    formatTime: (minutes: number) => string;
    handleUpdateClick: () => void;
}

const ArticleHeader = ({
    noResults,
    randomArticle,
    hasSearchValue,
    timeSinceUpdate,
    formatTime,
    handleUpdateClick,
}: ArticleHeaderProps) => {
    const articleTitle = hasSearchValue && !noResults
        ? "O Resultado da sua busca"
        : noResults
        ? "Sugestão de notícias"
        : "Últimas notícias";

    return (
        <div className="article-header" style={{ display: noResults ? "grid" : undefined }}>
            {noResults && (
                <div className="no-results-message">
                    <p style={{ margin: 0 }}>
                        Não foi encontrado nenhum resultado com o termo pesquisado.
                    </p>
                    <p style={{ margin: 0 }}>
                        Talvez você goste da nossa sugestão de notícias:
                    </p>
                    {randomArticle && <ArticleItem article={randomArticle} />}
                </div>
            )}
            <h1 className="article-title">
                <strong>{articleTitle}</strong>
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
    );
};

export default memo(ArticleHeader);
