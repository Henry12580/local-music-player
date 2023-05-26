/// <reference path="Direct.d.ts" />
import React, { useContext } from 'react';
import {useState, useEffect, useRef} from 'react';
import DirItem from './DirItem';
import { PlaylistCtx } from '../App';

export default function Directory() {
  const {setCurdir, dirList, setDirList} = useContext(PlaylistCtx);

  useEffect( () => {
    pathsUtil.read().then( response => {
      if (response.success) {
        const dirlist = response.payload;
        setDirList(dirlist);
        if (dirlist.length) {
          setCurdir(dirlist[0])
        }
      } else {
        alert(response.message);
      }
    }, err => {
      alert(err);
    });
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  async function addDirectory() {
    if (!inputRef.current?.value) {
      alert("Input cannot be null!");
      return;
    }
    const response1: ResponseFormat<number> = await pathsUtil.add(inputRef.current.value);
    if (response1.success) {
      const response2: ResponseFormat<string[]> = await pathsUtil.read();
      if (response2.success) {
        setDirList(response2.payload);
      } else {
        alert(response2.message);
      }
    } else {
      alert(response1.message);
    }
    inputRef.current.value = '';
  }
  
  const updateDirList = () => {
    pathsUtil.read().then( resp => {
      if (resp.success) {
        setDirList(resp.payload);
      } else {
        alert(resp.message);
      }
    })
  }

  return (
    <div style={{width: "inherit", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{fontSize: '1.3rem', alignSelf: 'start'}}>Directories list:</div>
      <div style={{width: 'inherit', display: 'flex', flexDirection: 'column', border: `${dirList.length ? 1 : 0}px solid gray`}}>
        {
          dirList.map( (dir: string, idx: number) => <DirItem key={idx} dir={dir} updateDirList={updateDirList}/>)
        }
      </div>
      <div style={{fontSize: "1rem", width: 'inherit', display: 'flex', marginTop: '1px'}}>
        <input style={{fontSize: "inherit", flexGrow: 1}} ref={inputRef}></input><span style={{display: 'inline-block', width: '1px'}}/>
        <button className="cursor" style={{fontSize: "inherit", color: 'black', backgroundColor: 'goldenrod'}} onClick={addDirectory}>Add to directory list</button>
      </div>
    </div>
  )
}