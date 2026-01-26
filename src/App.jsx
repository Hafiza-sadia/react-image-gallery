import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [userdata, setUserdata] = useState([]);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getdata = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=30`
      );

      setUserdata(response.data);
    } catch (err) {
      setError("Failed to load images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, [index]);

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        📸 React Image Gallery
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-center text-xl text-amber-400">Loading images...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500 text-lg">{error}</p>
      )}

      {/* Images */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {userdata.map((elem) => (
          <a
            href={elem.url}
            target="_blank"
            rel="noreferrer"
            key={elem.id}
            className="hover:scale-105 transition-transform"
          >
            <div className="h-48 w-52 bg-white rounded-xl overflow-hidden shadow-lg">
              <img
                className="h-full w-full object-cover"
                src={elem.download_url}
                alt={elem.author}
              />
            </div>
            <h1 className="font-semibold text-center mt-2">
              {elem.author}
            </h1>
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          disabled={index === 1 || loading}
          className={`px-4 py-2 rounded-xl font-semibold transition
            ${
              index === 1 || loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-amber-500 text-black hover:bg-amber-400 active:scale-95"
            }`}
          onClick={() => setIndex(index - 1)}
        >
          Prev
        </button>

        <span className="text-lg font-bold">Page {index}</span>

        <button
          disabled={loading}
          className={`px-4 py-2 rounded-xl font-semibold transition
            ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-amber-500 text-black hover:bg-amber-400 active:scale-95"
            }`}
          onClick={() => setIndex(index + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
