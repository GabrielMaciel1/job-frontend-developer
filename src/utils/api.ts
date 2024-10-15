import axios from 'axios';

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
    status: string;
    totalResults: number;
    articles: Article[];
}

const API_KEY = '3ba9e2d6744c4de39873d37ef96c7ffa';
const BASE_URL = 'https://newsapi.org/v2';

const filterArticles = (articles: Article[]): Article[] => {
    return articles.filter(article => article.title !== "[Removed]");
};

export const fetchArticles = async (page: number = 1): Promise<FetchArticlesResponse> => {
    try {
        const response = await axios.get<FetchArticlesResponse>(`${BASE_URL}/top-headlines`, {
            params: {
                country: 'us',
                pageSize: 20,
                category: ['technology', "science"],
                page,
                apiKey: API_KEY,
            },
        });

        const filteredArticles = filterArticles(response.data.articles);
        return {
            ...response.data,
            articles: filteredArticles,
        };
    } catch (error) {
        throw new Error('Failed to fetch articles: ' + error);
    }
};

export const searchArticles = async (query: string): Promise<FetchArticlesResponse> => {
    try {
        const response = await axios.get<FetchArticlesResponse>(`${BASE_URL}/everything`, {
            params: {
                q: query,
                searchIn: 'title',
                apiKey: API_KEY,
            },
        });

        const filteredArticles = filterArticles(response.data.articles);
        return {
            ...response.data,
            articles: filteredArticles,
        };
    } catch (error) {
        throw new Error('Failed to fetch articles: ' + error);
    }
};

export const fetchArticleById = async (id: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/everything`, {
            params: {
                q: id,
                apiKey: API_KEY,
            },
        });

        return response.data.articles[0];
    } catch (error) {
        throw new Error('Failed to fetch article: ' + error);
    }
};
