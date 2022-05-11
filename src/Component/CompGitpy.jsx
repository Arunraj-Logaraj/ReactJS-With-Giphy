import axios from "axios";
import React, { useEffect, useState } from "react";
import CompLoader from "./CompLoader";

const CompGitpy = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "OXn1wPCBKX5KfeQBNkrnPp6JtcqSQ9tL",
          },
        });
        console.log(result);
        setData(result.data.data);
      } catch (error) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
        console.log(error);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const renderGifs = () => {
    if (isLoading) {
      return <CompLoader />;
    }
    return data.map((el) => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} alt="Images" />
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
          Unable to get Gifs, please try again in a few seconds
        </div>
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "OXn1wPCBKX5KfeQBNkrnPp6JtcqSQ9tL",
          q: search,
          limit: 1000,
        },
      });
      setData(result.data.data);
    } catch (error) {
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
    }
    setIsLoading(false);
  };

  return (
    <div className="m-2">
      {renderError()}
      <form className="form">
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="Search"
          className="input"
        />

        <button onClick={handleSubmit} type="submit" className="btn">
          Search
        </button>
      </form>

      <div className="container gifs">{renderGifs()}</div>
    </div>
  );
};
export default CompGitpy;
