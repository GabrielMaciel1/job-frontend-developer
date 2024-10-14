import { Dispatch, SetStateAction } from "react";
import Logo from "../../assets/Logo.png";
import { IoSearch } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import './style.css';

interface HeaderProps {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

const Header = ({ searchValue, setSearchValue }: HeaderProps) => {
    const handleClearSearch = () => {
        setSearchValue("");
    };

    return (
        <>
            <img src={Logo} alt="Logo" />
            <h1 className="header-title">
                Explore as últimas notícias
                <br />
                sobre tecnologia da web
            </h1>
            <h3 className="header-subtitle">
                Selecionamos todas as notícias sobre tecnologia <br />
                produzidas na web para você. Aproveite, foi tudo feito com
                dedicação.
            </h3>

            <div className="search-container">
                <IoSearch
                    size={24}
                    className="search-icon"
                />
                
                <input 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
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
        </>
    );
};

export default Header;
