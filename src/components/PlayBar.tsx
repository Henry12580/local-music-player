import React, { CSSProperties, useEffect, useRef, useState } from 'react'

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
    [showPause, setShowPause] = useState(false);

  useEffect( () => {
    audio = new Audio();
  }, []);

  useEffect( () => {
    audio.src = musicSrc;
    audio.onloadeddata = () => {
      const {duration} = audio;
      audio.volume = volume / 100;
      setDuration(duration);
      const dm = Math.floor(duration / 60), ds = Math.round(duration % 60)
      setDurationMin(dm < 10 ? '0' + dm : ''+dm);
      setDurationSec(ds < 10 ? '0' + ds : ''+ds);
      setCurrTime(0);
      setCurrPercent(0);
      if (playStart) {
        setPlaying(true);
        audio.play();
        setInterval(() => {
          const {currentTime} = audio;
          setCurrTime(currentTime);
          const cm = Math.floor(currentTime / 60), cs = Math.round(currentTime % 60);
          setCurrMin(cm < 10 ? '0' + cm : ''+cm);
          setCurrSec(cs < 10 ? '0' + cs : ''+cs);
          setCurrPercent(currentTime / duration * 100);
        }, 200);
      }
    };
    audio.onended = () => {
      setPlaying(false);
    };
  }, [musicSrc]);

  const rangeStyle: CSSProperties = {
    appearance: "none",/*清除系统默认样式*/
    width: "60vw",
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
    height: "0.5vw",
    width: '12vw',
    position: 'absolute',
    left: '-1vw',
    top: '6.5vw',
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
    if (audio) {
      const curTime = Number(event.target.value); // 实际时间 * 100
      audio.currentTime = curTime / 100;
      const {currentTime} = audio;
      setCurrTime(currentTime);
      const cm = Math.floor(currentTime / 60), cs = Math.round(currentTime % 60);
      setCurrMin(cm < 10 ? '0' + cm : ''+cm);
      setCurrSec(cs < 10 ? '0' + cs : ''+cs);
      setCurrPercent(currentTime / duration * 100);
    }
  }

  function changePlaying(event: any) {
    event.preventDefault();
    if (audio) {
      if (playing) {
        audio.pause();
        setPlaying(false);
      }
      else {
        audio.play();
        setPlaying(true);
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
        style={{width: '13vw', height: '13vw', position: 'relative'}}
        onMouseEnter={() => setShowPause(true)}
        onMouseLeave={() => setShowPause(false)}
      >
        {showPause ? 
          <svg className="cursor" 
            style={{position: 'absolute', height: '1.5rem', width: '1.5rem', left: '5vw', top: '4.5vw'}} 
            viewBox="10 6 10 12" 
            onClick={changePlaying}
          >
            <path fill="limegreen" d="M8 5v14l11-7z"/>
          </svg> : null
        }
        <img className={playing ? 'rotate-img' : ''} 
          src={musicCoverSrc} 
          style={{width: '13vw', height: '13vw', borderRadius: '6.5vw'}} 
        />
      </div>

      <div id="bar" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <span style={{fontSize: '0.9rem', width: '60vw', overflow: 'hidden'}}>{playStart ? musicName : '未播放音乐'}</span>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <input className='cursor' id="song-range" style={rangeStyle} name="range" type="range" min={0} max={duration * 100} value={currTime * 100} onChange={changeProgress} />
          <label htmlFor='range' style={{width: '17vw', fontSize: '0.8rem', marginLeft: '0.5vw'}}>{`${currMin}:${currSec}/${durationMin}:${durationSec}`}</label>
        </div>
      </div>

      <div className='cursor' id='volume' 
        style={{position: 'relative', height: '100%', width: '2rem'}}
        onMouseEnter={() => setShowVol(true)} 
        onMouseLeave={() => setShowVol(false)}
      >
        <div style={{position: 'absolute', top: '6vw'}} onClick={changeMuted}>
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
  )
}
