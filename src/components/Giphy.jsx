import React, { useEffect, useState } from "react";
import axios from "axios";

import Loader from "./Loader";

const Giphy = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [currentPage] = useState(1);
    const [itemsPerPage] = useState(25);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                    params: {
                        api_key: "vbAdZFaLH0fWG73kCUq4lRlRvpfUqTr0",
                        limit: 20
                    }
                });

                console.log(results);
                setData(results.data.data);
            } catch (err) {
                setIsError(true);
                setTimeout(() => setIsError(false), 4000);
            }

            setIsLoading(false);
        };

        fetchData();
    }, []);

    const renderGifs = () => {
        if (isLoading) {
            return <Loader />;
        }
        return currentItems.map(el => {
            return (
                <div key={el.id} className="gifdegiphy">
                    <img src={el.images.fixed_height.url} alt="" />
                </div>
            );
        });
    };
    const renderError = () => {
        if (isError) {
            return (
                <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                >
                    Impossible de récupérer les Gifs, veuillez réessayer plus tard
                </div>
            );
        }
    };

    const handleSearchChange = event => {
        setSearch(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);

        try {
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
                params: {
                    api_key: "vbAdZFaLH0fWG73kCUq4lRlRvpfUqTr0",
                    q: search,
                    limit: 20
                }
            });
            setData(results.data.data);
        } catch (err) {
            setIsError(true);
            setTimeout(() => setIsError(false), 4000);
        }

        setIsLoading(false);
    };

    return (
        <div className="m-2">
            {renderError()}
            <form className="form-inline justify-content-center m-2">
                <input
                    value={search}
                    onChange={handleSearchChange}
                    type="text"
                    placeholder="Rechercher"
                    className="form-control"
                />
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-primary mx-2"
                >
                    Rechercher sur Giphy
                </button>
            </form>
            <div className="container gifsGiphy">{renderGifs()}</div>
        </div>
    );
};

export default Giphy;