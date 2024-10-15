import Logo from "../../assets/Logo.png";
import { IoSearch } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import "./style.css";
import { memo } from "react";
import useHeaderLogic from "../../hooks/useHeaderLogic";

const Header = () => {
    const {
        searchValue,
        handleClearSearch,
        handleBack,
        headerVariant,
        handleSearch,
        isArticleDetailOrPageBlock,
    } = useHeaderLogic();

    return (
        <>
            <div className="header-flex">
                {isArticleDetailOrPageBlock ? (
                    <div className="back-button" onClick={handleBack}>
                        <FaArrowLeft />
                        <p>Home</p>
                    </div>
                ) : (
                    <div />
                )}

                <img
                    src={Logo}
                    alt="Logo"
                    className={isArticleDetailOrPageBlock ? "logo-margin" : ""}
                />
                <div />
            </div>

            <div
                className={`header-container ${
                    isArticleDetailOrPageBlock ? "full-width" : ""
                }`}
                style={{
                    width: isArticleDetailOrPageBlock ? "100%" : "",
                    height: isArticleDetailOrPageBlock ? "150px" : "",
                }}
            >
                {headerVariant === "default" && (
                    <>
                        <h1 className="header-title">
                            Explore as últimas notícias sobre tecnologia da web
                        </h1>
                        <h3 className="header-subtitle">
                            Selecionamos todas as notícias sobre tecnologia
                            produzidas na web para você. Aproveite, foi tudo
                            feito com dedicação.
                        </h3>
                    </>
                )}

                <div
                    className={`search-container ${
                        isArticleDetailOrPageBlock ? "article-detail" : ""
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

export default memo(Header);
