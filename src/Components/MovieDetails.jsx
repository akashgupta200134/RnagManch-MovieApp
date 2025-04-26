import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom"; 
import { asyncloadmovies, removeMovie } from "../store/actions/movieActions";
import Loader from "../Templets/Loader";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector( state => state.movie);
  const navigate = useNavigate();

  console.log(info);
  

  useEffect(() => {
    dispatch(asyncloadmovies(id));
    return () => {
      dispatch(removeMovie());
    };
  }, [id]); 

  const backgroundImageUrl = ``;

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundPosition: 'top 10%',
        backgroundSize: 'cover',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat',
      }}
      className="w-screen h-screen px-[10%]"
    >
      <nav className=" h-[10vh]  items-center w-full text-zinc-100 flex gap-10 text-2xl ">
     
        <button onClick={() => navigate(-1)}>
          <i className="hover:text-[#6556CD] text-white text-2xl ri-arrow-left-line"></i>
        </button>

        
        <Link to= {info.details.homepage}>
          <i className="ri-earth-fill hover:text-[#6556CD] text-xl"></i>
        </Link>
        <Link to={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
          <i className="ri-global-line hover:text-[#6556CD] text-xl"></i>
        </Link>
        <Link to={`https://www.imdb.com/title/${info.externalid.imdb_id}`}>
          <i className="ri-links-line hover:text-[#6556CD] text-xl"></i>
        </Link>

      </nav>
    </div>
  ): < Loader/>
};

export default MovieDetails;
