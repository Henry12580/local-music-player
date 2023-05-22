import React, { CSSProperties, useCallback, useContext, useState } from 'react'
import { PlaylistCtx } from '../App';

type songItemType = {
  songname: string;
}
export default function SongItem(prop: songItemType) {
  const [selected, setSelected] = useState(false);
  const {playlist, setPlaylist, startPlay} = useContext(PlaylistCtx);
  const onPlay = () => {
    startPlay(prop.songname);
  }
  const onDelete = () => {
    setPlaylist(playlist.filter((item: string) => item !== prop.songname));
  }

  const buttonStyle: CSSProperties = {
    fontSize: "1rem", 
    visibility: selected ? 'visible' : 'hidden', 
    width: '100%',
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }; 

  return (
    <li
      onMouseEnter={() => setSelected(true)} 
      onMouseDown={() => setSelected(true)}
      onMouseLeave={() => setSelected(false)}
      style={{position: 'relative', backgroundColor: selected ? 'gold' : 'transparent'}}
    >
      <span style={{}}>{prop.songname}</span>
      <span style={buttonStyle}>
        <svg className="cursor" style={{height: '1rem', width: '1rem', margin: '0 auto -0.1rem 2vw' }} viewBox="10 6 10 12" onClick={onPlay}>
          <path fill="limegreen" d="M8 5v14l11-7z"/>
        </svg>
        <button className="cursor" style={{fontSize: "inherit", color: 'red'}} onClick={onDelete}>x</button>
      </span>
    </li>
  )
}
