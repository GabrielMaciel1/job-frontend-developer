import Logo from "../../assets/Logo.png";
import { IoSearch } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import "./style.css";
import { useSearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router";

const Header = () => {
    const navigate = useNavigate();
    const { searchValue, setSearchValue, handleSearch, headerVariant, setHeaderVariant } =
        useSearchContext();

    const handleClearSearch = () => {
        setSearchValue("");
    };

    const handleBack = () => {
        if (localStorage.getItem('selectedArticle')) {
            localStorage.removeItem('selectedArticle');
        }
        setHeaderVariant('default')
        navigate(`/`);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    color: "black",
                    width: "100%",
                    justifyContent: "space-between",
                    height: '50px'
                }}
            >
                {headerVariant === "articleDetail" ? (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontWeight: "700",
                            cursor: "pointer",
                            
                        }}
                        onClick={handleBack}
                    >
                        <FaArrowLeft />
                        <p>Home</p>
                    </div>
                ) : (
                    <div />
                )}

                <img src={Logo} alt="Logo" style={{marginRight:headerVariant === "articleDetail"? '50px': ''}}/>
                <div />
            </div>
            <div
                className="header-container"
                style={{
                    width: headerVariant === "articleDetail" ? "100%" : "",
                    height: headerVariant === "articleDetail" ? "150px" : "",
                }}
            >
                {headerVariant === "default" && (
                    <>
                    <h1 className="header-title">
                        Explore as últimas notícias sobre tecnologia da web
                    </h1>
                    <h3 className="header-subtitle">
                        Selecionamos todas as notícias sobre tecnologia produzidas na web para você. Aproveite, foi tudo feito com dedicação.
                    </h3>
                </>
                )}

                <div
                    className={`search-container ${
                        headerVariant === "articleDetail"
                            ? "article-detail"
                            : ""
                    }`}
                >
                    <IoSearch size={24} className="search-icon" />

                    <input
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="O que deseja encontrar?"
                        className="search-input"
                    />

                    {searchValue && (
                        <IoCloseCircle
                            onClick={handleClearSearch}
                            size={20}
                            className="close-icon"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
