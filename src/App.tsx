/// <reference path="components/Direct.d.ts" />
import Directory from "./components/Directory";
import React, { useEffect, useState } from 'react'
import PlayList from './components/PlayList';
import PlayBar from "./components/PlayBar";

type PlaylistCtxType = {
  playHistory?: any[];
  playlist: string[];
  curdir: string,
  setCurdir: Function,
  setPlaylist: Function;
  playAll: Function;
  startPlay: Function;
  readSonglist: Function;
  currPlay: string;
  playSeq: 0 | 1 | 2 | 3; // 0 单曲 1 单曲循环 2 顺序 3 随机
  setPlaySeq: Function;
  playNext: Function;
  playLast: Function;
  dirList: string[];
  setDirList: Function;
}

export const PlaylistCtx = React.createContext<PlaylistCtxType>({
  playHistory: [],
  playlist: [],
  curdir: "",
  setCurdir: () => {},
  readSonglist: () => {},
  setPlaylist: () => {},
  playAll: () => {},
  startPlay: () => {},
  currPlay: "",
  playSeq: 1,
  setPlaySeq: () => {},
  playNext: () => {},
  playLast: () => {},
  dirList: [],
  setDirList: () => {},
});

type SongInfo = {
  musicIdx: number;
  musicCoverSrc: string;
  musicName: string;
};

const musicFileSuffixs: string[] = [".flac", ".mp3", ".wmc", ".wav"];
var playHistory: SongInfo[] = [];

export default function App() {
  const [playlist, setPlaylist] = useState<string[]>([]); // 当前播放列表
  const [currPlay, setCurrPlay] = useState(""); // 正在播放的歌曲名
  const [musicIdx, setMusicIdx] = useState(0); // 正在播放的歌曲序号
  const [curdir, setCurdir] = useState(""); // 当前目录
  const [musicSrc, setMusicSrc] = useState<string>(""); // 音乐流url
  const [playStart, setPlayStart] = useState<Boolean>(false); // 是否播放
  const [playSeq, setPlaySeq] = useState<0|1|2|3>(0); // 播放顺序
  const [dirList, setDirList] = useState<string[]>([]);
  const [musicCoverSrc, setMusicCoverSrc] = useState("music_cover.jpg"); // 音乐封面

  const ctxValue = {dirList, setDirList, playLast, curdir, setCurdir, playlist, readSonglist, setPlaylist, playAll, startPlay, currPlay, playSeq, setPlaySeq, playNext};

  useEffect(function() {
    if (curdir) {
      readSonglist();
    }
  }, [curdir]);

  function playNext() {
    if (playSeq === 0 || playSeq === 1) return;
    let nextIdx = musicIdx;
    if (playSeq === 2) {
      nextIdx = musicIdx+1 < playlist.length ? musicIdx+1 : 0;
    } else if (playSeq === 3) {
      playHistory.push({
        musicName: currPlay,
        musicIdx,
        musicCoverSrc,
      });
      while (nextIdx === musicIdx) {
        nextIdx = Math.floor(Math.random() * playlist.length);
      }
    }
    startPlay(playlist[nextIdx], nextIdx);
  }

  function playLast() {
    if (playSeq !== 3) {
      playHistory = [];
      if (playSeq === 2) {
        let preIdx = musicIdx-1 < 0 ? playlist.length-1 : musicIdx-1;
        startPlay(playlist[preIdx], preIdx);
      }
    }
    else if (playHistory.length) {
      const {musicIdx, musicName, musicCoverSrc} = playHistory.pop() as SongInfo;
      startPlay(musicName, musicIdx, musicCoverSrc);
    }
  }

  function playAll(dir: string) {
    let songlist: string[];
    if (curdir !== dir) {
      setCurdir(dir);
      songlist = readSonglist(dir);
    } else {
      songlist = playlist;
    }
    if (playSeq === 0 || 1 || 2) {
      startPlay(songlist[0], 0);
    }
  }

  function readSonglist(dir?: string): string[] {
    const songDir = dir ? dir : curdir;
    pathsUtil.open(songDir).then(res => {
      if (res.success) {
        const playls = res.payload.filter( (filename: string) => musicFileSuffixs.some( suffix => filename.endsWith(suffix)));
        setPlaylist(playls);
        return playls;
      } else {
        console.error(res.message);
      }
    });
    return [];
  }

  async function startPlay(musicName: string, musicIdx: number, musicCoverSrc?: string) {
    setCurrPlay(musicName);
    setMusicIdx(musicIdx);
    const songPath = curdir.endsWith('/') ? curdir + musicName : curdir + '/' + musicName;
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
      <PlaylistCtx.Provider value={ctxValue}>
        <Directory />
        <PlayList />
        <PlayBar musicName={currPlay} musicSrc={musicSrc} playStart={playStart} musicCoverSrc={musicCoverSrc} />
      </PlaylistCtx.Provider>
    </div>
  )
}