export { removeMovie } from "../reducers/MovieSlice";

import axios from "../../utils/Axios"
import { loadMovie } from "../reducers/MovieSlice";

export const asyncloadmovies = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendation = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

    let ultimatedetails = {
      details: detail.data,
      externalid: externalid.data,
      recommendation: recommendation.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };

    dispatch(loadMovie(ultimatedetails));
    // console.log(ultimatedetails);


  } catch (error) {
    console.log(error);
  }
};
