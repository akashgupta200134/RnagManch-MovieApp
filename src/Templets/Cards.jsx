
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
    return (
        <div className="flex  relative  flex-wrap gap-5 bg-[#1f1e24] items-center justify-center w-[100%]    h-full ">
            {data.map((item, index) => (
                <Link
                    to={`/${data.media_type || title}/details/${item.id}`}
                    className="w-[50vh]"
                    key={index}
                >
                   {item.vote_average && (
                    <span className="absolute rounded-full text-lg  mt-32 ml-[245px]    p-2 font-semibold bg-yellow-600  ">
                            {(item.vote_average * 10).toFixed()}<sup>%</sup> 
                        </span>
                   )}
                    
                    <img
                        className="h-[30vh] rounded-lg object-cover max-w-full"
                        src={`https://image.tmdb.org/t/p/original/${
                            item.backdrop_path || item.poster_path || item.profile_path
                        }`}
                        alt=""
                        
                    />
                    <h1 className="text-xl text-center text-white mt-3 font-semibold">
                        {item.title || item.original_title || item.name || item.original_name}

                       

                    </h1>
                         
                   
                </Link>
            ))}
        </div>
    );
};

export default Cards;