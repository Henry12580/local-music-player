/// <reference path="App.d.ts" />
import React from 'react';
import {useState, useEffect, useRef} from 'react';

export default function App() {
  const [dirList, setDirList] = useState<string[]>([]);

  useEffect( () => {
    pathsUtil.read().then( response => {
      if (response.success) {
        console.log(response.payload);
        setDirList(response.payload);
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
  }

  return (
    <div>
      <h2>Directories list:</h2>
      <ol>
        {
          dirList.map( (dir: string, idx: number) => <li key={idx}>{dir.toString()}</li> )
        }
      </ol>
      <input ref={inputRef}></input>
      <button onClick={addDirectory}>Add to directory list</button>
    </div>
  )
}