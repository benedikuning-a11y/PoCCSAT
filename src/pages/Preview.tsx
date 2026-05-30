import { useEffect, useState } from "react";

interface Movie {
  title: string;
  thumbnail?: string;
}

function Preview() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("Marvel");
  const [genre, setGenre] = useState("Action");

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/movies?search=${encodeURIComponent(
          searchTerm
        )}&genre=${encodeURIComponent(genre)}`
      );

      const data = await response.json();

      console.log("API Response:", data);

      const results: Movie[] = [];

      if (data.organic_results) {
        data.organic_results.forEach((item: any) => {
          if (item.items) {
            item.items.forEach((movie: any) => {
              results.push({
                title: movie.title,
                thumbnail: movie.thumbnail,
              });
            });
          }
        });
      }

      setMovies(results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #141e30, #243b55)",
        padding: "30px",
        margin: "0",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "42px",
          fontWeight: "bold",
          letterSpacing: "3px",
          textTransform: "uppercase",
          textDecoration: "underline",
          marginBottom: "30px",
        }}
      >
        Google Play Movies
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px",
            width: "280px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Animation">Animation</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
        </select>

        <button
          onClick={fetchMovies}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Search
        </button>
      </div>

      {loading && (
        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Loading Movies...
        </h2>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            style={{
              width: "260px",
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "15px",
              border: "1px solid #ddd",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              textAlign: "center",
              overflow: "hidden",
              cursor: "pointer",
              transition: "0.3s",
              opacity: 0.95,
            }}
          >
            <img
              src={
                movie.thumbnail ||
                "https://via.placeholder.com/250x350?text=No+Image"
              }
              alt={movie.title}
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            />

            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
                lineHeight: "1.5",
              }}
            >
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;