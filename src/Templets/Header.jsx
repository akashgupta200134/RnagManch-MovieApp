import { Link } from "react-router-dom";

const Header = ({ data }) => {
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original/${
    data.backdrop_path || data.poster_path || data.profile_path
  }`;

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${backgroundImageUrl})`,
        backgroundPosition: 'top 10%',
        backgroundSize: 'cover',
        height: '410px',
        width: '1150px',
        maxWidth: "1150px",
        backgroundBlendMode: 'overlay',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat',
      }}
      className="flex flex-col justify-end p-[8%] mx-auto mt-2"
    >
     
      <h1 className="text-5xl font-bold text-white">
        {data.title || data.original_title || data.name || data.original_name}
      </h1>

      <span className="font-semibold capitalize text-white ml-1 mt-1">
        Hindi | English | Tamil | Telugu
      </span>
      <p className="text-white px-1 font-semibold capitalize mt-1">
        {data.media_type}
      </p>

        <Link to={`/${data.media_type}/details/${data.id}`}> 
         <button className="shadow-xl shadow-zinc-700 h-10 w-[180px] bg-white flex flex-row items-center justify-start gap-2 px-5 mt-3 rounded-md font-semibold">
          <svg
            height="20"
            viewBox="0 0 8 8"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m0 0v6l6-3z" transform="translate(1 1)" />
          </svg>
          
           Watch Trailer
        </button>
      </Link>
    </div>
  );
};

export default Header;
