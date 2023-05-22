import React, {CSSProperties, useContext, useEffect, useState} from "react";
import { PlaylistCtx } from "../App";
import SongItem from "./SongItem";

export default function PlayList() {
  const {playlist, setPlaylist} = useContext(PlaylistCtx);
  const playlistStyle: CSSProperties = {
    marginTop: '1vh', 
    width: "inherit",
    height: '50vh', 
    overflow: 'scroll',
    display: 'flex', 
    flexDirection: 'column', 
    border: `${playlist.length ? 1 : 0}px solid goldenrod`
  };
  return (
    <ol style={playlistStyle}>
      {playlist.map( (song: string, idx: number) => <SongItem songname={song} key={idx} />)}
    </ol>
  )
}