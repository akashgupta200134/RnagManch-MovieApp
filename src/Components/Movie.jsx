
import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../Templets/Loader';
import Cards from '../Templets/Cards';
import Dropdown from '../Templets/Dropdown';
import TopNav from '../Templets/TopNav';
import InfiniteScroll from 'react-infinite-scroll-component';




const Movie = () => {


    document.title = "RangManch | Movie";
    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing");
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
   
    const getMovie = async () => {
        try {
         
            const { data } = await axios.get(`movie/${category}?page=${page}`);

            if (data.results.length > 0) {
                setMovie((prevmovie) => [...prevmovie, ...data.results]);
                setPage(page + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.error("Error fetching trending data:", error);
        } 
        console.log(movie);
        
        
    };

    const refreshHandler = () => {
        setPage(1);
        setMovie([]);
        sethasMore(true);
        getMovie();
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);





    return (
        <div className="w-screen h-screen ">
            <div className="w-full flex items-center justify-center   p-2  "> 
                <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] text-white text-2xl ml-4 mr-4 ri-arrow-left-line"></i>
                <h1 className="text-2xl font-bold ml-3 text-white "> Movie
                <span className=" ml-2 text-lg capitalize ">
                       ({category})
                    </span>
                </h1>
                <TopNav/>
                <div className=" flex flex-row gap-2 mr-5  ">
                <Dropdown title="Filter" options={["popular" , "top_rated" , "upcoming" , "now_playing"]} func={(e) => { setcategory(e.target.value); }} />
              

                </div>
            </div>

            {page === 1 ? (
                <Loader />
            ) : (
                <InfiniteScroll
                    dataLength={movie.length}
                    next={getMovie}
                    hasMore={hasMore}
                    loader={<Loader />}
                >
                    <Cards data={movie} title={category}  />
                </InfiniteScroll>
            )}
        </div>
    );
};
export default Movie
