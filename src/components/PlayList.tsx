import React, {CSSProperties, useContext, useEffect, useState} from "react";
import { PlaylistCtx } from "../App";
import SongItem from "./SongItem";

export default function PlayList() {
  const {playlist, currPlay, dirList} = useContext(PlaylistCtx);
  const playlistStyle: CSSProperties = {
    marginTop: '2vw', 
    width: "inherit",
    height: `calc(100vh - 48vw - ${dirList.length * 1.4}rem)`, 
    overflow: 'scroll',
    display: 'flex', 
    flexDirection: 'column', 
    border: `${playlist.length ? 1 : 0}px solid goldenrod`
  };
  return (
    <ol style={playlistStyle}>
      {playlist.map( (song: string, idx: number) => <SongItem name={song} key={idx} index={idx} playing={currPlay === song}/>)}
    </ol>
  )
}