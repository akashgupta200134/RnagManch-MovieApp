import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Templets/Loader';
import Cards from '../Templets/Cards';
import Dropdown from '../Templets/Dropdown';
import TopNav from '../Templets/TopNav';
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {
    document.title = "RangManch | Tvshows";
    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
 

    const getPeople = async () => {
        try {
            const { data } = await axios.get(`person/${category}?page=${page}`);

            if (data.results.length > 0) {
                setPeople((prevpeople) => [...prevpeople, ...data.results]);
                setPage(page + 1);
            } else {
                sethasMore(false);
            }
        } catch (error) {
            console.error("Error fetching trending data:", error);
        }
    };

    useEffect(() => {
        setPage(1);
        setPeople([]);
        sethasMore(true);
        getPeople();
    }, [category]);

    return (
        <div className="w-screen h-screen">
            <div className="w-full flex items-center justify-center">
                <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] text-white text-2xl ml-4 mr-4 ri-arrow-left-line"></i>
                <h1 className="text-2xl font-bold ml-3 text-white "> People
              
                </h1>
                <TopNav />
                
            </div>

       
               
            (
                <InfiniteScroll
                    dataLength={people.length}
                    next={getPeople}
                    hasMore={hasMore}
                    loader={<Loader />}
                >
                    <div>

                    <Cards data={people} title="people" />
                    </div>
                </InfiniteScroll>
            )
        </div>
    );
};

export default People;