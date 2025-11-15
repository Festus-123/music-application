import { useEffect, useState,  } from "react";

export default function App() {
  const [tracks, setTracks] = useState([])
  const [lyrics, setLyrics] = useState([])
  const [search, setSearch] = useState('')
  const [bouncedSearch, setBouncedSearch] = useState('')
  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    const handler = setTimeout(() => {
      setBouncedSearch(search)
    }, 500)

    return () => clearTimeout(handler)
  }, [search, loading])
  
  useEffect(() => {
  if(!bouncedSearch.trim()) return;

    async function getSongs () {
      try {
        setLoading(true)
        const apiURL = `http://localhost:3000/deezer?q=${bouncedSearch}`;

        const response = await fetch(apiURL)

        if(!response.ok) throw new Error('Could not fetch data')
        
        console.log(response)
        const json = await response.json()
        setTracks(json.data)
        setLoading(false)

      } catch (error) {
        console.error(error)
        setLoading(true)
      }

    }

    getSongs();
  }, [bouncedSearch]);

  const fetchLyrics = async (track) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/lyrics?q=${encodeURIComponent(track.title + " " + track.artist.name)}`
      );
      const data = await res.json();
      setLyrics(data.lyrics); // data.lyrics is a string
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="container">

    <div className="song-details-container">

        <div className="search-form">
          <input type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input" />

          <button type="submit" className="search-btn" >Search</button>
        </div>

      <div className="music-container">

        { loading ? (
          <h1 className="loading-state">Loading...</h1>
        ) : tracks.map((track) => (
          <div key={track.id} className="song-card"> 
          { track.album?.cover_big && (
            <img 
              src={track.album.cover_big || null} 
              alt={`${track.title} cover`} 
              className="song-cover-image"/>
          )
          }
            {/* <h1 className="song-title">{track.title || "unKnown"}</h1> */}
            <marquee behavior="" direction="horizontal" className='song-title'>
              {track.title || 'unKnown'}
            </marquee>
            <h2 className="song-artist">{track.artist?.name || "Unknown"}</h2>
            {/* <p className="song-description">{track.description}</p> */}
            <strong className="song-genre">{track.genre || "general"}</strong>

            <audio 
            className="audio-file"
            controls src={track.preview} type='audio/mpeg'></audio>

            <button className="show-lyrics-btn" onClick={() => fetchLyrics(track)}>lyrics</button>
          </div>
        ))
        }
      </div>
    </div>
    { lyrics && (
      <div className="lyrics-container">
        <pre>{lyrics}</pre>
      </div>
    )
    }
    </div>
  );
}

