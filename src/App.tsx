/// <reference path="components/Direct.d.ts" />
import Directory from "./components/Directory";
import React, { useState } from 'react'
import PlayList from './components/PlayList';
import PlayBar from "./components/PlayBar";

type PlaylistCtxType = {
  playlist: string[];
  curdir: string,
  setCurdir: Function,
  setPlaylist: Function;
  playAll: Function;
  startPlay: Function;
}

export const PlaylistCtx = React.createContext<PlaylistCtxType>({
  playlist: [],
  curdir: "",
  setCurdir: () => {},
  setPlaylist: () => {},
  playAll: () => {},
  startPlay: () => {},
});

export default function App() {
  const [playlist, setPlaylist] = useState([]);
  const [musicName, setMusicName] = useState("");
  const [curdir, setCurdir] = useState("");
  const [musicSrc, setMusicSrc] = useState<string>("");
  const [playStart, setPlayStart] = useState<Boolean>(false);
  const [musicCoverSrc, setMusicCoverSrc] = useState("../images/music_cover.jpg");

  function playAll(dir: string) {
    setCurdir(dir);
    playlist.forEach( song => startPlay(song))
  }

  async function startPlay(song: string, musicCoverSrc?: string) {
    setMusicName(song);
    const songPath = curdir.endsWith('/') ? curdir + song : curdir + '/' + song;
    const readFileResp = await fileUtil.read(songPath);
    if (readFileResp.success) {
      setMusicSrc(URL.createObjectURL(readFileResp.payload));
      if (musicCoverSrc) setMusicCoverSrc(musicCoverSrc);
      setPlayStart(true);
    } else {
      console.error(readFileResp.message);
    }
  }

  return (
    <div style={{margin: "auto auto", width: "80vw", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <PlaylistCtx.Provider value={{curdir, setCurdir, playlist, setPlaylist, playAll, startPlay}}>
        <Directory />
        <PlayList />
        <PlayBar musicName={musicName} musicSrc={musicSrc} playStart={playStart} musicCoverSrc={musicCoverSrc} />
      </PlaylistCtx.Provider>
    </div>
  )
}