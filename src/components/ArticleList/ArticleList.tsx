import './ArticleList.css';
import ArticleItem from "./ArticleItem";

const ArticleList = () => {
    const articles = [{
        title: 'Irã interrompe negociações indiretas com os EUA em meio a aumento de tensões',
        icon: 'https://logo.clearbit.com/cnn.com', // Ícone do artigo
        author: 'Jane Doe',                          // Autor do artigo
        publishedAt: '2024-10-14T00:00:00Z',        // Data de publicação do artigo
        urlToImage: 'https://veja.abril.com.br/wp-content/uploads/2024/04/1D-2-000_34PC9ZG.jpg.jpg?quality=90&strip=info', // URL da imagem do artigo
        content: 'This is the full content of the mock article. It contains detailed information about the topic discussed in the article.', // Conteúdo do artigo
        url: 'https://example.com/full-article',    // URL para a matéria completa
        description: 'This is a brief description of the mock article.', // Descrição do artigo
        source: {                                   // Fonte do artigo
            id: 'mocksource',                        // ID da fonte
            name: 'cnn'                     // Nome da fonte
        }
    }];
    return (
        <div className="article-list">
            <div className="article-header">
                <h1 className="article-title">
                    <strong>últimas notícias</strong>
                </h1>
                <h2 className="article-updated">
                    Atualizado há 30 minutos
                </h2>
            </div>
            {articles.map((article) => (
                <ArticleItem key={article.url} article={article} />
            ))}
        </div>
    );
};

export default ArticleList;
