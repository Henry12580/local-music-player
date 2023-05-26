import React, { CSSProperties, useContext, useState } from "react";
import { PlaylistCtx } from "../App";

type DirItemPropType = {
  dir: string;
  updateDirList: Function;
};


export default function DirItem(prop: DirItemPropType) {
  const [selected, setSelected] = useState(false);
  const {setCurdir, playAll} = useContext(PlaylistCtx);
  const onDelete = async () => {
    const deleteResp = await pathsUtil.delete([prop.dir]);
    if (deleteResp.success) {
      prop.updateDirList();
    } else {
      console.error(deleteResp.message);
    }
  }

  function onPlay() {
    playAll(prop.dir);
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

  function onRead() {
    setCurdir(prop.dir);
  }

  return (
    <div
      onMouseEnter={() => setSelected(true)} 
      onMouseDown={() => setSelected(true)}
      onMouseLeave={() => setSelected(false)}
      style={{position: 'relative', backgroundColor: selected ? 'gold' : 'transparent'}}
    >
      <span>{prop.dir}</span>
      <span style={buttonStyle}>
        <svg className="cursor" style={{height: '1rem', width: '1rem', margin: '0 auto -0.1rem 2vw'}} viewBox="10 6 10 12" onClick={onPlay}>
          <path fill="limegreen" d="M8 5v14l11-7z"/>
        </svg>
        <button className="cursor" style={{fontSize: "inherit", color: 'blue'}} onClick={onRead}>Read</button>
        <button className="cursor" style={{fontSize: "inherit", color: 'red'}} onClick={onDelete}>x</button>
      </span>
    </div>
  )
}