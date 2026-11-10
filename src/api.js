export async function getMovies(signal) {
  const response = await fetch("https://ghibliapi.vercel.app/films", { signal });

  if (!response.ok) {
    throw new Error(`The film service could not load the catalogue (HTTP ${response.status}). Please try again.`);
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("The film service returned unreadable data. Please try again.");
  }

  if (!Array.isArray(data)) {
    throw new Error("The film service returned unexpected data. Please try again.");
  }

  return data;
}
