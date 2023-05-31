import React, { CSSProperties, useContext, useEffect, useRef, useState } from 'react'
import { PlaylistCtx } from '../App';

type PlayBarProps = {
  musicName: string;
  musicSrc: string;
  playStart: Boolean;
  musicCoverSrc: string;
}

const playbarStyle: CSSProperties = {
  width: '96vw',
  height: "13vw",
  backgroundColor: "rgba(218,165,32, 0.8)",
  position: 'fixed',
  left: 0,
  bottom: 0,
  borderRadius: '5vw 5vw 0 0',
  display: 'flex',
  alignItems: 'center',
  padding: '2vw',
  justifyContent: 'space-between'
}

const soundIconStyle: CSSProperties = {
  fontSize: '1rem',
  width: '1.4rem',
  fill: 'green'
}

var audio: HTMLAudioElement;
var interval: any;

export default function PlayBar(props: PlayBarProps) {

  const {musicName, musicSrc, playStart, musicCoverSrc} = props;

  const [currTime, setCurrTime] = useState(0),
    [currPercent, setCurrPercent] = useState(0),
    [currMin, setCurrMin] = useState('00'),
    [currSec, setCurrSec] = useState('00'),
    [duration, setDuration] = useState(0),
    [durationMin, setDurationMin] = useState('00'),
    [durationSec, setDurationSec] = useState('00'),
    [playing, setPlaying] = useState(false),
    [showVol, setShowVol] = useState(false),
    [volume, setVolume] = useState(50),
    [muted, setMuted] = useState(false),
    {playSeq, setPlaySeq, playNext, playLast} = useContext(PlaylistCtx); 

  function nextPlay() {
    if (playSeq === 0) {
      return;
    } else if (playSeq === 1) {
      onSrcChange();
    } else {
      playNext();
    }
  }

  function lastPlay() {
    playLast();
  }

  useEffect( () => {
    audio = new Audio();
    window.onkeydown = function(event) {
      event.preventDefault();
      if (event.code === 'Space') {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    }
  }, []);

  useEffect(onSrcChange, [musicSrc]);

  function onSrcChange() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    setCurrTime(0);
    setCurrPercent(0);
    audio.src = musicSrc;
    audio.load();
    audio.onloadeddata = () => {
      const {duration} = audio;
      audio.volume = volume / 100;
      setDuration(duration);
      const dm = Math.floor(duration / 60), ds = Math.round(duration % 60)
      setDurationMin(dm < 10 ? '0' + dm : ''+dm);
      setDurationSec(ds < 10 ? '0' + ds : ''+ds);
      if (playStart) {
        audio.play();
        interval = setInterval(updateProgress, 200);
      }
    };
    audio.onplay = () => setPlaying(true);
    audio.onpause = () => setPlaying(false);
    audio.onended = onPlayEnded;
  }

  useEffect(() => {
    audio.onended = onPlayEnded;
  }, [playSeq]);

  function onPlayEnded() {
    if (playSeq === 0) {
      setPlaying(false);
    } else {
      nextPlay();
    }
  }

  function updateProgress() {
    const {currentTime, duration} = audio;
    setCurrTime(currentTime);
    const cm = Math.floor(currentTime / 60), cs = Math.round(currentTime % 60);
    setCurrMin(cm < 10 ? '0' + cm : ''+cm);
    setCurrSec(cs < 10 ? '0' + cs : ''+cs);
    setCurrPercent(currentTime / duration * 100);
  }
  
  const rangeStyle: CSSProperties = {
    appearance: "none",/*清除系统默认样式*/
    width: "58vw",
    background: "-webkit-linear-gradient(limegreen, limegreen) no-repeat, #ddd",/*设置左边颜色为#61bd12，右边颜色为#ddd*/
    backgroundSize: `${currPercent}%, 100%`,/*设置左右宽度比例*/
    height: "1vw",/*横条的高度*/
  };

  const volRangeStyle: CSSProperties = {
    appearance: 'none',
    rotate: "-90deg",
    visibility: showVol ? "visible" : "hidden",
    background: "-webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd",/*设置左边颜色为#61bd12，右边颜色为#ddd*/
    backgroundSize: `${volume}%, 100%`,
    height: "0.6vw",
    width: '12vw',
    position: 'absolute',
    left: '-1vw',
    top: '6vw',
  }

  const rotateImgStyle: CSSProperties = {
    width: '13vw', 
    height: '13vw', 
    borderRadius: '6.5vw',
    animation: playing? `rotate 10s linear infinite` : "none",
  }

  function changeVolume(event: any) {
    event.preventDefault();
    if (audio) {
      const vol = Number(event.target.value);
      audio.volume = vol / 100;
      setVolume(vol);
    }
  }

  function changeProgress(event: any) {
    event.preventDefault();
    if (audio && musicSrc) {
      const curTime = Number(event.target.value); // 实际时间 * 100
      audio.currentTime = curTime / 100;
      const {currentTime, duration} = audio;
      setCurrTime(currentTime);
      const cm = Math.floor(currentTime / 60), cs = Math.round(currentTime % 60);
      setCurrMin(cm < 10 ? '0' + cm : ''+cm);
      setCurrSec(cs < 10 ? '0' + cs : ''+cs);
      setCurrPercent(currentTime / duration * 100);
    }
  }

  function changePlaying(event: any) {
    event.preventDefault();
    if (audio && musicSrc) {
      if (playing) {
        audio.pause();
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      }
      else {
        audio.play();
        if (!interval) {
          interval = setInterval(updateProgress, 200);
        }
      }
    }
  }

  function changeMuted(event: any) {
    event.preventDefault();
    if (audio) {
      audio.muted = !muted;
      setMuted(!muted);
    }
  }

  return (
    <div style={playbarStyle}>

      <div 
        id='music-cover'
        style={{width: '13vw', height: '13vw', position: 'relative'}}
      >
        {!playing ? 
          <svg className="cursor" 
            style={{position: 'absolute', height: '1.4rem', width: '1.4rem', left: '5.1vw', top: '4.5vw', zIndex: '10'}} 
            viewBox="10 6 10 12" 
            onClick={changePlaying}
          >
            <path fill="limegreen" d="M8 5v14l11-7z"/>
          </svg> : 
          <svg className="cursor" 
            id='pause'
            style={{position: 'absolute', height: '2rem', width: '2rem', left: '3.4vw', top: '3.7vw', zIndex: '10'}} 
            viewBox="0 0 1024 1024" 
            onClick={changePlaying}
          >
            <path d="M640 832V192h128v640h-128zM256 192h128v640H256V192z" fill="limegreen" p-id="5126"></path>
          </svg>
        }
        <img
          src={musicCoverSrc} 
          style={rotateImgStyle} 
        />
      </div>

      <div>
        <div id="bar" style={{marginTop: '-2vw',display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <span style={{fontSize: '0.9rem', width: '58vw', height: '1.2rem', overflow: 'hidden'}}>{playStart ? musicName : '未播放音乐'}</span>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <input className='cursor' id="song-range" style={rangeStyle} name="range" type="range" min={0} max={duration * 100} value={currTime * 100} onChange={changeProgress} />
            <label htmlFor='range' style={{width: '16vw', fontSize: '0.8rem'}}>{`${currMin}:${currSec}/${durationMin}:${durationSec}`}</label>
          </div>
        </div>
        <div className="play-controls" style={{width: '4rem', left: '38.6vw'}}>
          <svg className='cursor last-next' onClick={lastPlay} fill='green' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1488"><path d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362zM238.945254 780.798397V451.684117v-164.562559c0-19.628152-5.904521-60.475733 17.057907-75.841215 25.523642-17.068744 59.747828 1.210165 59.747828 31.919454v493.676839c0 19.628152 5.915358 60.473927-17.047069 75.841215-25.53448 17.068744-59.758666-1.211971-59.758666-31.919454z" p-id="1489"></path></svg>
          <svg className='cursor last-next' onClick={nextPlay} fill='green' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1929"><path d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z" p-id="1930"></path></svg>
        </div>
        <div className='play-controls' style={{width: '5rem', right: '10vw'}}>
          <svg className="cursor play-seq" onClick={() => setPlaySeq(0)} fill={playSeq === 0 ? 'blue' : 'black'} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8310"><path d="M875.52 433.152q-7.168-1.024-12.8-10.24t-8.704-33.792q-5.12-39.936-26.112-58.88t-65.024-27.136q-46.08-9.216-81.408-37.376t-58.88-52.736q-22.528-21.504-34.816-15.36t-12.288 22.528l0 44.032 0 96.256q0 57.344-0.512 123.904t-0.512 125.952l0 104.448 0 58.368q1.024 24.576-7.68 54.784t-32.768 56.832-64 45.568-99.328 22.016q-60.416 3.072-109.056-21.504t-75.264-61.952-26.112-81.92 38.4-83.456 81.92-54.272 84.992-16.896 73.216 5.632 47.616 13.312l0-289.792q0-120.832 1.024-272.384 0-29.696 15.36-48.64t40.96-22.016q21.504-3.072 35.328 8.704t28.16 32.768 35.328 47.616 56.832 52.224q30.72 23.552 53.76 33.792t43.008 18.944 39.424 20.992 43.008 39.936q23.552 26.624 28.672 55.296t0.512 52.224-14.848 38.4-17.408 13.824z" p-id="9011"></path></svg>
          <svg className='cursor play-seq' onClick={() => setPlaySeq(1)} fill={playSeq === 1 ? 'blue' : 'black'} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6928"><path d="M361.5 727.8c-119.1 0-215.9-96.9-215.9-215.9 0-119.1 96.9-215.9 215.9-215.9 2.3 0 4.6-0.2 6.8-0.6v58.3c0 12.3 14 19.4 23.9 12.1l132.6-97.6c8.1-6 8.1-18.2 0-24.2l-132.6-97.6c-9.9-7.3-23.9-0.2-23.9 12.1v58.1c-2.2-0.4-4.5-0.6-6.8-0.6-39.8 0-78.5 7.9-115 23.4-35.2 15-66.8 36.3-94 63.5s-48.6 58.8-63.5 94c-15.5 36.5-23.4 75.2-23.4 115s7.9 78.5 23.4 115c15 35.2 36.3 66.8 63.5 94s58.8 48.6 94 63.5c36.5 15.5 75.2 23.4 115 23.4 22.1 0 40-17.9 40-40s-17.9-40-40-40z m576.7-330.9c-15-35.2-36.3-66.8-63.5-94s-58.8-48.6-94-63.5c-36.5-15.5-75.2-23.4-115-23.4-22.1 0-40 17.9-40 40s17.9 40 40 40c119.1 0 215.9 96.9 215.9 215.9 0 119.1-96.9 215.9-215.9 215.9-4.1 0-8.1 0.6-11.8 1.8v-60.8c0-12.3-14-19.4-23.9-12.1l-132.6 97.6c-8.1 6-8.1 18.2 0 24.2L629.9 876c9.9 7.3 23.9 0.2 23.9-12.1V806c3.7 1.2 7.7 1.8 11.8 1.8 39.8 0 78.5-7.9 115-23.4 35.2-15 66.8-36.3 94-63.5s48.6-58.8 63.5-94c15.5-36.5 23.4-75.2 23.4-115s-7.8-78.5-23.3-115zM512.8 660.6c22.1-0.1 39.9-18.1 39.8-40.2l-1.2-214.1c-0.1-22-18-39.8-40-39.8h-0.2c-22.1 0.1-39.9 18.1-39.8 40.2l1.2 214.1c0.1 22 18 39.8 40 39.8h0.2z" p-id="6929"></path></svg>
          <svg className='cursor play-seq' onClick={() => setPlaySeq(2)} fill={playSeq === 2 ? 'blue' : 'black'} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4159"><path d="M725.333333 170.666667V88.234667a21.333333 21.333333 0 0 1 34.986667-16.426667l175.786667 146.474667a21.333333 21.333333 0 0 1-13.696 37.717333H85.333333V170.666667h640zM85.333333 768h853.333334v85.333333H85.333333v-85.333333z m0-298.666667h853.333334v85.333334H85.333333v-85.333334z" p-id="4160"></path></svg>
          <svg className="cursor play-seq" onClick={() => setPlaySeq(3)} fill={playSeq === 3 ? 'blue' : 'black'} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="915"><path d="M914.2 705L796.4 596.8c-8.7-8-22.7-1.8-22.7 10V688c-69.5-1.8-134-39.7-169.3-99.8l-45.1-77 47-80.2c34.9-59.6 98.6-97.4 167.4-99.8v60.1c0 11.8 14 17.9 22.7 10l117.8-108.1c5.8-5.4 5.8-14.6 0-19.9L796.4 165c-8.7-8-22.7-1.8-22.7 10v76H758c-4.7 0-9.3 0.8-13.5 2.3-36.5 4.7-72 16.6-104.1 35-42.6 24.4-78.3 59.8-103.1 102.2L513 432l-24.3-41.5c-24.8-42.4-60.5-77.7-103.1-102.2C343 263.9 294.5 251 245.3 251H105c-22.1 0-40 17.9-40 40s17.9 40 40 40h140.3c71.4 0 138.3 38.3 174.4 99.9l47 80.2-45.1 77c-36.2 61.7-103 99.9-174.4 99.9H105c-22.1 0-40 17.9-40 40s17.9 40 40 40l142 0.1h0.2c49.1 0 97.6-12.9 140.2-37.3 42.7-24.4 78.3-59.8 103.2-102.2l22.4-38.3 22.4 38.3c24.8 42.4 60.5 77.8 103.2 102.2 33.1 18.9 69.6 30.9 107.3 35.4 3.8 1.2 7.8 1.8 11.9 1.8l15.9 0.1v55c0 11.8 14 17.9 22.7 10L914.2 725c5.9-5.5 5.9-14.7 0-20z" p-id="916"></path></svg>
        </div>
      </div>

      <div className='cursor' id='volume' 
        style={{position: 'relative', height: '100%', width: '2rem'}}
        onMouseEnter={() => setShowVol(true)} 
        onMouseLeave={() => setShowVol(false)}
      >
        <div style={{position: 'absolute', top: '5vw'}} onClick={changeMuted}>
          {
          !muted ? 
            <svg id="sound-on" className="icon" style={soundIconStyle} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="553">
              <path d="M143.36 737.28a81.92 81.92 0 0 1-81.92-81.92V368.64a81.92 81.92 0 0 1 81.92-81.92h163.84l171.6224-148.74624A81.92 81.92 0 0 1 614.4 199.8848v624.2304a81.92 81.92 0 0 1-135.5776 61.91104L307.2 737.28H143.36z m684.83072-515.4816A358.07232 358.07232 0 0 1 962.56 501.76a358.07232 358.07232 0 0 1-134.36928 279.9616 30.72 30.72 0 0 1-38.46144-47.9232 296.63232 296.63232 0 0 0 111.4112-232.0384c0-91.40224-41.472-175.9232-111.4112-232.0384a30.72 30.72 0 1 1 38.46144-47.9232z m-114.9952 121.18016C772.7104 382.09536 808.96 444.14976 808.96 512c0 67.85024-36.2496 129.90464-95.76448 169.02144a30.72 30.72 0 1 1-33.75104-51.32288C722.3296 601.4976 747.52 558.32576 747.52 512s-25.21088-89.51808-68.07552-117.69856a30.72 30.72 0 1 1 33.75104-51.32288z" p-id="2559"></path>
            </svg> 
          :
            <svg id="sound-off" className="icon" style={soundIconStyle} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="553">
              <path d="M594.39104 146.2272A81.92 81.92 0 0 1 614.4 199.8848v624.2304a81.92 81.92 0 0 1-135.5776 61.91104L307.2 737.28H143.36a81.92 81.92 0 0 1-81.92-81.92V368.64a81.92 81.92 0 0 1 81.92-81.92h163.84l171.6224-148.74624a81.92 81.92 0 0 1 115.56864 8.25344zM953.5488 381.66528a30.72 30.72 0 0 1 0 43.4176l-86.85568 86.8352 86.8352 86.85568a30.72 30.72 0 1 1-43.4176 43.4176l-86.8352-86.8352-86.8352 86.8352a30.72 30.72 0 0 1-43.4176-43.4176l86.8352-86.8352-86.8352-86.8352a30.72 30.72 0 1 1 43.4176-43.43808l86.8352 86.8352 86.8352-86.8352a30.72 30.72 0 0 1 43.4176 0z" p-id="2574"></path>
            </svg>
          }
        </div>
        <input id="vol-range" className='cursor' type="range" style={volRangeStyle} min='0' max='100' value={muted ? 0 : volume} onChange={changeVolume}></input>
      </div>

    </div>
  );
}
