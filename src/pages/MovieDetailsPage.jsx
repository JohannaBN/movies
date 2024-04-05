import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetails } from "../components/MovieDetails";

export const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const apiEnv = import.meta.env.VITE_OPENDB_KEY;
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiEnv}&language=en-US`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        const response = await fetch(movieDetailsUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id, movieDetailsUrl]);

  return (
    <div>
      {movieDetails ? (
        <div className="movie-details-page">
          {console.log("Imdb-id:", movieDetails.imdb_id)}
          <MovieDetails
            rating={movieDetails.vote_average}
            title={movieDetails.title}
            overview={movieDetails.overview}
            backdrop={movieDetails.backdrop_path}
            release_date={movieDetails.release_date}
            tagline={movieDetails.tagline}
            poster_path={movieDetails.poster_path}
            genres={movieDetails.genres}
            imdb={movieDetails.imdb_id}
          />
        </div>
      ) : null}
    </div>
  );
};
