import React from "react";
import { LoaderComponent } from "../loader/loader";
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
  const getAudio = () => {
    return props.audios.find(
      (item: any) =>
        props.currentTime >= item.startOffset &&
        props.currentTime <= item.endOffset
    );
  };
  const playerRef = React.useRef<any>(null);
  const [audio, setAudio] = React.useState<any>(getAudio());
  const [isLoaded, setIsLoaded] = React.useState(false);
  // const getFrequency = () => {
  //   var audioContext = new AudioContext();
  //   var analyser = audioContext.createAnalyser();
  //   analyser.connect(audioContext.destination);
  //   //var source = audioContext.createMediaElementSource(audio);

  //   var freqDomain = new Float32Array(analyser.frequencyBinCount);
  //   analyser.getFloatFrequencyData(freqDomain);
  //   console.log(analyser.getFloatFrequencyData(freqDomain));
  // };
  const onVideoPlay = () => {
    if (props.isPlaying) {
      playerRef.current
        .play()
        .then(props.isPlaying)
        .catch(() => "");
    } else {
      playerRef.current.pause();
    }
  };
  const getUpdateTime = () => {
    const newAudio = getAudio();
    if (newAudio) {
      let startAt = newAudio?.startOffset >= 0 ? newAudio?.startOffset : 0;
      if (playerRef.current) {
        playerRef.current.currentTime = (props.currentTime - startAt) / 1000;
      }
      setAudio(newAudio);
    }
  };
  React.useEffect(() => {
    if (playerRef.current && isLoaded) {
      onVideoPlay();
    }
  }, [props.isPlaying, props.isMuted]);
  React.useEffect(() => {
    getUpdateTime();
  }, [props.currentTime, props.isMuted]);

  return (
    <div
      className={`${style["audio-player"]}
       ${!props.isMuted && style["audio-player-active"]}`}
    >
      {audio && (
        <div>
          <audio
            ref={playerRef}
            src={audio.path}
            muted={props.isMuted}
            onLoadStart={() => setIsLoaded(false)}
            onCanPlay={() => setIsLoaded(true)}
            preload="auto"
          />
          {isLoaded ? <img src="/img/audio.png" /> : <b>. . .</b>}
        </div>
      )}
    </div>
  );
};
