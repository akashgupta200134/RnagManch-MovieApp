import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Templets/Loader';
import Cards from '../Templets/Cards';
import Dropdown from '../Templets/Dropdown';
import TopNav from '../Templets/TopNav';
import InfiniteScroll from 'react-infinite-scroll-component';

const TvShows = () => {
    document.title = "RangManch | Tvshows";
    const navigate = useNavigate();
    const [category, setcategory] = useState("airing_today");
    const [tvshows, setTvshows] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
 

    const getTvshows = async () => {
        try {
            const { data } = await axios.get(`tv/${category}?page=${page}`);

            if (data.results.length > 0) {
                setTvshows((prevtv) => [...prevtv, ...data.results]);
                setPage(page + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.error("Error fetching trending data:", error);
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        setTvshows([]);
        sethasMore(true);
        getTvshows();
    }, [category]);

    return (
        <div className="w-screen h-screen">
            <div className="w-full flex items-center justify-center">
                <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] text-white text-2xl ml-4 mr-4 ri-arrow-left-line"></i>
                <h1 className="text-2xl font-bold ml-3 text-white "> Tvshows
                    <span className=" ml-2 text-lg capitalize ">
                        ({category})
                    </span>
                </h1>
                <TopNav />
                <div className=" flex flex-row gap-2 mr-5 ">
                    <Dropdown title="Filter" options={["on_the_air", "popular", "top_rated", "airing_today"]} func={(e) => { setcategory(e.target.value); }} />
                </div>
            </div>

       
               
            (
                <InfiniteScroll
                    dataLength={tvshows.length}
                    next={getTvshows}
                    hasMore={hasMore}
                    loader={<Loader />}
                >
                    <Cards data={tvshows} title="tv" />
                </InfiniteScroll>
            )
        </div>
    );
};

export default TvShows;