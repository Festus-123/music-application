import { useEffect, useState,  } from "react";

export default function App() {
  const [tracks, setTracks] = useState([])
  const [search, setSearch] = useState('')
  const [bouncedSearch, setBouncedSearch] = useState('')
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    const handler = setTimeout(() => {
      setBouncedSearch(search)
        setLoading(loading)
    }, 500)

    return () => clearTimeout(handler)
  }, [search, loading])
  
  useEffect(() => {
  if(!bouncedSearch.trim()) return;

    async function getSongs () {
      try {
        const apiURL = `https://discoveryprovider.audius.co/v1/tracks/search?query=${search}`;

        const response = await fetch(apiURL)

        if(!response.ok) throw new Error('Could not fetch data')
        
        console.log(response)
        const json = await response.json()
        setTracks(json.data)

      } catch (error) {
        console.error(error)
        setLoading(true)
      }

    }

    getSongs();
  }, [bouncedSearch]);

  return (
    <div className="container">
      <input type="text" 
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="search-input" />

      { loading ? (
        <h1 className="loading-state">Loading...</h1>
      ) : tracks.map((track) => (
        <div key={track.id} className="music-card"> 
          <h1 className="song-title">{track.title}</h1>
          <h2 className="song-genre">{track.genre}</h2>
          <p className="song-description">{track.description}</p>
          <strong className="song-mood">{track.mood}</strong>

          <audio 
          className="audio-file"
          controls src={`https://discoveryprovider.audius.co/v1/tracks/${track.id}/stream`} type='audio/mpeg'></audio>

        </div>
      ))
      }
    </div>
  );
}

