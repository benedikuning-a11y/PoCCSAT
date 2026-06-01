import { useEffect, useState } from "react";

interface Movie {
  title: string;
  thumbnail?: string;
  price?: string;
  rating?: number;
  category?: string;
  maturity_rating?: string;
}

function Preview() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("Marvel");
  const [genre, setGenre] = useState("Action");

  const convertToRupiah = (price?: string) => {
    if (!price) return "Not Available";

    const usd = parseFloat(price.replace("$", ""));

    if (isNaN(usd)) return price;

    const rupiah = usd * 16000;

    return `Rp ${rupiah.toLocaleString("id-ID")}`;
  };

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/movies?search=${encodeURIComponent(
          searchTerm
        )}&genre=${encodeURIComponent(genre)}`
      );

      const data = await response.json();

      const results: Movie[] = [];

      if (data.organic_results) {
        data.organic_results.forEach((section: any) => {
          if (section.items) {
            section.items.forEach((movie: any) => {
              results.push({
                title: movie.title,
                thumbnail: movie.thumbnail,
                price: movie.price,
                rating: movie.rating,
                category: movie.category,
                maturity_rating: movie.maturity_rating,
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
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #2563eb 70%, #38bdf8 100%)",
        padding: "30px",
        margin: "0",
        fontFamily: "Arial",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginBottom: "15px",
          flexWrap: "wrap",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg"
          alt="Google Play"
          style={{
            height: "70px",
            width: "70px",
            borderRadius: "15px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
          }}
        />

        <h1
          style={{
            color: "white",
            fontSize: "50px",
            fontWeight: "bold",
            letterSpacing: "4px",
            textShadow: "0 4px 15px rgba(0,0,0,0.4)",
            margin: "0",
          }}
        >
          Google Play Movies
        </h1>
      </div>

      <p
        style={{
          textAlign: "center",
          color: "#e2e8f0",
          fontSize: "18px",
          marginBottom: "40px",
          letterSpacing: "1px",
        }}
      >
        Discover, Search & Explore Movies from Google Play
      </p>

      {/* Search Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          marginBottom: "40px",
          flexWrap: "wrap",
          backgroundColor: "rgba(255,255,255,0.12)",
          padding: "20px",
          borderRadius: "20px",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
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
            borderRadius: "12px",
            border: "none",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "none",
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
            padding: "12px 24px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#22c55e",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          Search
        </button>
      </div>

      {loading && (
        <h2
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "30px",
          }}
        >
          Loading Movies...
        </h2>
      )}

      {/* Movie Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            style={{
              width: "280px",
              background: "rgba(255,255,255,0.95)",
              padding: "15px",
              borderRadius: "20px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
              textAlign: "center",
              overflow: "hidden",
              cursor: "pointer",
              transition: "0.3s",
              border: "1px solid rgba(255,255,255,0.4)",
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
                borderRadius: "15px",
                marginBottom: "15px",
              }}
            />

            <p
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#1e293b",
                lineHeight: "1.5",
                letterSpacing: "0.5px",
                marginBottom: "10px",
              }}
            >
              {movie.title}
            </p>

            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: "12px",
                marginTop: "10px",
                textAlign: "left",
              }}
            >
              <p
                style={{
                  margin: "6px 0",
                  color: "#f59e0b",
                  fontWeight: "bold",
                }}
              >
                ⭐ Rating: {movie.rating ?? "N/A"} / 5
              </p>

              <p
                style={{
                  margin: "6px 0",
                  color: "#2563eb",
                  fontWeight: "bold",
                }}
              >
                🎭 Genre: {movie.category || "Unknown"}
              </p>

              <p
                style={{
                  margin: "6px 0",
                  color: "#dc2626",
                  fontWeight: "bold",
                }}
              >
                Age Rating: {movie.maturity_rating || "N/A"}
              </p>

              <p
                style={{
                  margin: "6px 0",
                  color: "#16a34a",
                  fontWeight: "bold",
                }}
              >
                 Price: {convertToRupiah(movie.price)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;