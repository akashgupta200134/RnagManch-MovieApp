
import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../Templets/Loader';
import Cards from '../Templets/Cards';
import Dropdown from '../Templets/Dropdown';
import TopNav from '../Templets/TopNav';
import InfiniteScroll from 'react-infinite-scroll-component';




const Popular = () => {


    document.title = "RangManch | Popular";
    const navigate = useNavigate();
    const [category, setcategory] = useState("movie");
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
   
    const getPopular = async () => {
        try {
         
            const { data } = await axios.get(
                `${category}/popular?page=${page}`
            );

            if (data.results.length > 0) {
                setPopular((prevpopular) => [...prevpopular, ...data.results]);
                setPage(page + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.error("Error fetching trending data:", error);
        } 
        // console.log(popular);
        
    };

    const refreshHandler = () => {
        setPage(1);
        setPopular([]);
        sethasMore(true);
        getPopular();
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);





    return (
        <div className="w-screen h-screen  ">
            <div className="w-full flex items-center justify-center   "> 
                <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] text-white text-2xl ml-4 mr-4 ri-arrow-left-line"></i>
                <h1 className="text-2xl font-bold ml-3 text-white ">Popular
                    <span className=" ml-2 text-lg capitalize ">
                       ({category})
                    </span>
            
                </h1>
                <TopNav />
                <div className=" flex flex-row gap-2 mr-5 ">
                <Dropdown title="Filter" options={["tv", "movie"]} func={(e) => { setcategory(e.target.value); }} />
              

                </div>
            </div>

            {page === 1 ? (
                <Loader />
            ) : (
                <InfiniteScroll
                    dataLength={popular.length}
                    next={getPopular}
                    hasMore={hasMore}
                    loader={<Loader />}
                >
                    <Cards data={popular} title={category} />
                </InfiniteScroll>
            )}
        </div>
    );
};
export default Popular
