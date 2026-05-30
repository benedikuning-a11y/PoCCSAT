export default async function handler(req, res) {
  const response = await fetch(
    `https://serpapi.com/search.json?engine=google_play_movies&q=Marvel&gl=us&hl=en&api_key=b5cb1f9ca1223d6c504064df322a3aeb4e1d2d3ce2e093a42c93b75cccf6954e`
  );

  const data = await response.json();

  res.status(200).json(data);
  catch (error) {
  res.status(500).json({ error: "Failed to fetch movies" });
  }
}