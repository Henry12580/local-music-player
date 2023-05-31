import React, { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import { PlaylistCtx } from '../App';

type songItemType = {
  name: string;
  index: number;
  playing: boolean;
}
export default function SongItem(prop: songItemType) {
  const {playlist, setPlaylist, startPlay} = useContext(PlaylistCtx);
  const songItemRef = useRef<HTMLLIElement>(null);
  const onPlay = () => {
    startPlay(prop.name, prop.index);
  }

  useEffect(() => {
    if (prop.playing) {
      songItemRef.current!.scrollIntoView();
    }
  },[prop.playing]);
  
  const onDelete = () => {
    const newPlaylist = playlist.filter((item: string) => item !== prop.name);
    setPlaylist(newPlaylist);
  }

  return (
    <li
      id="song-item"
      ref={songItemRef}
      style={{position: 'relative'}}
    >
      <span style={prop.playing ? {color: 'limegreen', fontWeight: 'bold'} : {}}>{prop.name}</span>
      <span className='button'>
        <svg className="cursor" style={{height: '1rem', width: '1rem', margin: '0 auto -0.1rem 2vw' }} viewBox="10 6 10 12" onClick={onPlay}>
          <path fill="limegreen" d="M8 5v14l11-7z"/>
        </svg>
        <button className="cursor" style={{fontSize: "inherit", color: 'red'}} onClick={onDelete}>x</button>
      </span>
    </li>
  )
}
