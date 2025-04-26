import axios from "../utils/Axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [search, setsearch] = useState([]);

  const GetSearches = async () => {
    try {
      if (!query) {
        setsearch([]);
        return;
      }
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearch(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setsearch([]);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[50%] h-[10vh] relative flex items-center justify-start ml-[20%] mt-3">
      <i className="ri-search-2-line text-white ml-2 -mr-8 text-3xl"></i>

      <input
        type="text"
        placeholder="Search Anything"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] p-3 mx-10 text-white text-xl border-none outline-none bg-transparent rounded-xl"
      />

      {query.length > 0 && (
        <i
          onClick={() => {
            setQuery("");
          }}
          className="ri-close-large-line text-zinc-400 text-3xl cursor-pointer"
        ></i>
      )}

      {query.length > 0 && (
        <div className="absolute w-[70%] max-h-[50vh] mt-2 ml-3  text-white bg-zinc-900  top-[90%] rounded-md overflow-auto shadow-lg z-10">
          {search.map((items, index) => (
            <Link
              key={index}
              to={`/${items.media_type}/details/${items.id}`}
              className="hover:bg-zinc-600 hover:text-white duration-300 w-full font-semibold text-zinc-400 py-2 px-5 flex justify-start items-center border-b border-zinc-800"
            >
              {items.backdrop_path ||
              items.poster_path ||
              items.profile_path ? (
                <img
                  className="w-[60px] h-[60px] object-cover rounded-lg mr-4 shadow-md"
                  src={`https://image.tmdb.org/t/p/original/${
                    items.backdrop_path ||
                    items.poster_path ||
                    items.profile_path
                  }`}
                  alt={items.title || items.name || "Search Result"}
                />
              ) : (
                <div className="w-[60px] h-[60px] rounded-lg mr-4 bg-zinc-700 flex items-center justify-center">
                  <i className="ri-image-2-line text-2xl text-gray-400"></i>
                </div>
              )}
              <span>
                {items.title ||
                  items.orignal_title ||
                  items.name ||
                  items.original_name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopNav;