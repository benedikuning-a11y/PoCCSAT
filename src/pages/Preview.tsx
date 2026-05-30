import { useEffect, useState } from "react";

interface Movie {
  title: string;
  thumbnail?: string;
}

function Preview() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies");
        const data = await response.json();
        console.log("FULL API RESPONSE:", JSON.stringify(data, null, 2));

        let results: Movie[] = [];

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
        console.log("Movies before setMovies:", results);
        setMovies(results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f6f9",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Loading Movies...
        </h1>
      </div>
    );
  }

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
                borderRadius: "10px",
                marginBottom: "12px",
                objectFit: "cover",
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