import React from "react";
import style from "./audio-player.module.scss";

interface IAudioComponent {
  path: string;
  startOffset: number;
  endOffset: number;
}
interface IAudioPlayerComponent {
  isPlaying: boolean;
  currentTime: number;
  isMuted?: boolean;
  audios: IAudioComponent[];
}

export const AudioPlayerComponent = (props: IAudioPlayerComponent) => {
  const playerRef = React.useRef<any>(null);
  const canvasRef = React.useRef<any>(null);

  const [audio, setAudio] = React.useState<any>();
  let analyser;
  let dataArray;

  // React.useEffect(() => {
  //   const audioContext = new AudioContext();

  //   analyser = audioContext.createAnalyser();
  //   analyser.connect(audioContext.destination);
  //   dataArray = new Uint8Array(analyser.frequencyBinCount);
  //   // analyser.getByteTimeDomainData(dataArray);

  //   console.log(dataArray);
  // }, [props.isMuted]);
  const toggleOscillator = () => {
    // if (!props.isMuted) {
    //   playerRef.current.suspend();
    // } else {
    //   playerRef.current.resume();
    // }
  };
  const getAudio = () => {
    return props.audios.find(
      (item: any) =>
        props.currentTime >= item.startOffset &&
        props.currentTime <= item.endOffset
    );
  };

  React.useEffect(() => {
    if (playerRef.current) {
      if (props.isPlaying) {
        playerRef.current
          .play()
          .then(props.isPlaying)
          .catch(() => "");
      } else {
        playerRef.current.pause();
      }
    }
  }, [props]);

  React.useEffect(() => {
    const newAudio = getAudio();
    setAudio(newAudio);

    if (props.currentTime && playerRef.current && audio) {
      playerRef.current.currentTime =
        (props.currentTime - audio?.startOffset) / 1000;
    }
  }, [props.currentTime]);
  return (
    <div
      className={`${style["audio-player"]}
       ${!props.isMuted && style["audio-player-active"]}`}
    >
      <audio ref={playerRef} src={"/Kalimba.mp3"} muted={props.isMuted} />
      {audio && (
        <div>
          <img src="/img/audio.png" />
          <canvas width={500} height={400} ref={canvasRef}></canvas>
        </div>
      )}
    </div>
  );
};
