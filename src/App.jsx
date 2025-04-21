import { Route, Routes } from "react-router-dom"
import Home from "./Components/Home"
import Trending from "./Components/Trending"
import Popular from "./Components/Popular"
import Movie from "./Components/Movie"
import TvShows from "./Components/TvShows"
import People from "./Components/People"
import MovieDetails from "./Components/MovieDetails"
import Persondetails from "./Components/Persondetails"
import TvDetails from "./Components/TvDetails"


const App = () => {
  return (
    <div className="bg-[#1F1E24] w-screen min-h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />} />


        <Route path="/people" element={<People />} />
        <Route path="/people/details/:id" element={<Persondetails />} />
      </Routes>
    </div>
  )
}

export default App
