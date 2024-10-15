import { useLocation, useNavigate } from "react-router-dom";
import '../styles/PageBlock.css';

const PageBlock = () => {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();

    const handleClearReadArticles = () => {
        localStorage.removeItem("readArticles");
        navigate("/");
    };

    return (
        <div className="page-block">
            <h1>Página Bloqueada</h1>

            {state === "maxArticlesReached" && (
                <p>
                    Você atingiu o limite de 10 artigos lidos. Que tal fazer uma pausa e voltar mais tarde para explorar novas leituras?
                </p>
            )}
            {state && (
                <p>
                    Se você quiser continuar, é só apertar o botão abaixo!
                </p>
            )}

            <button className="clear-articles-button" onClick={handleClearReadArticles}>
                Limpar Artigos Lidos
            </button>
        </div>
    );
};

export default PageBlock;
