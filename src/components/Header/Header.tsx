import Logo from "../../assets/Logo.png";
import { IoSearch } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import "./style.css";
import { useSearchContext } from "../../context/SearchContext";

const Header = () => {
    const { searchValue, setSearchValue, handleSearch, headerVariant } =
        useSearchContext();

    const handleClearSearch = () => {
        setSearchValue("");
    };

    return (
        <div
            className="header-container"
            style={{ width: headerVariant === "articleDetail" ? "782px" : "" }}
        >
            <img src={Logo} alt="Logo" />

            {headerVariant === "default" && (
                <>
                    <h1 className="header-title">
                        Explore as últimas notícias
                        <br />
                        sobre tecnologia da web
                    </h1>
                    <h3 className="header-subtitle">
                        Selecionamos todas as notícias sobre tecnologia <br />
                        produzidas na web para você. Aproveite, foi tudo feito
                        com dedicação.
                    </h3>
                </>
            )}

            <div className="search-container">
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
    );
};

export default Header;
