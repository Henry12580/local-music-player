import React, {CSSProperties, useContext, useRef} from "react";
import { PlaylistCtx } from "../App";
import SongItem from "./SongItem";

export default function PlayList() {
  const {playlist, currPlay, dirList} = useContext(PlaylistCtx);
  const inputRef = useRef<HTMLInputElement>(null);
  const olRef = useRef<HTMLOListElement>(null);
  const playlistStyle: CSSProperties = {
    margin: 0,
    width: "inherit",
    height: `calc(100vh - 50vw - ${dirList.length * 1.4}rem)`, 
    overflow: 'scroll',
    display: 'flex', 
    flexDirection: 'column', 
    border: `${playlist.length ? 1 : 0}px solid goldenrod`
  };

  function onKeydown(event: any) {
    if (event.code === 'Enter') {
      onSearch();
    }
  }
  
  function onSearch() {
    const searchStr = inputRef.current?.value || "";
    if (searchStr) {
      for (let i = 0; i < playlist.length; ++i) {
        if (playlist[i].includes(searchStr)) {
          olRef.current?.children[i].scrollIntoView();
          break;
        }
      }
    }
  }

  return (
    <div>
      <div id="search-bar">
        <input type="text" onKeyDown={onKeydown} ref={inputRef} />
        <button className="cursor" onClick={onSearch}>Search</button>
      </div>
      <ol style={playlistStyle} ref={olRef}>
        {playlist.map( (song: string, idx: number) => <SongItem name={song} key={idx} index={idx} playing={currPlay === song}/>)}
      </ol>
    </div>  
  )
}