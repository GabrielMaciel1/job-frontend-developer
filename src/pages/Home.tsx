import { useState } from "react";
import { Header } from "../components";

const Home = () => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <>
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />
            <div
                style={{
                    color: "black",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                home
            </div>
        </>
    );
};

export default Home;
