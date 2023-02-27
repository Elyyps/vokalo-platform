import React, { HTMLProps, RefObject, useEffect, useRef } from "react";
import useMeasure from "react-use-measure";
import style from "./audio-player.module.scss";

export type AudioVisualizerProps = HTMLProps<HTMLDivElement> & {
  audio: RefObject<HTMLAudioElement>;
  amplitude?: number;
  isMuted?: boolean;
};

function RealAudioVisualizer({
  audio,
  isMuted,
  ...props
}: AudioVisualizerProps) {
  const [container, bounds] = useMeasure();
  const canvas = useRef<HTMLCanvasElement | any>();

  useEffect(() => {
    if (!canvas.current) return;
    if (!audio.current) return;

    let animationFrame: number;
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    const analyser = audioContext.createAnalyser();
    const context = canvas.current.getContext("2d");
    const source = audioContext.createMediaElementSource(audio.current);
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    audioContext.resume();
    const getAmplitude = (value: number) => {
      if (value >= 150 && value < 170) {
        return Math.PI * (value / 300) * 1;
      } else if (value >= 170 && value < 210) {
        return Math.PI * (value / 300) * 1.5;
      } else if (value >= 210) {
        return 0;
      }
    };
    function render() {
      const frequencyBinCountArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(frequencyBinCountArray);
      context.clearRect(0, 0, canvas.current.width, canvas.current.height);
      context.lineWidth = 3;
      context.strokeStyle = "#06f";
      context.beginPath();
      const startingPoint = 0.5 * Math.PI;
      if (window.innerWidth < 1272) {
        context.arc(
          21,
          21,
          20,
          startingPoint,
          frequencyBinCountArray[0] > 0
            ? getAmplitude(frequencyBinCountArray[1])
            : startingPoint
        );
      } else {
        context.arc(
          24,
          24,
          23,
          startingPoint,
          frequencyBinCountArray[0] > 0
            ? (frequencyBinCountArray[1] / 1000) * Math.PI
            : startingPoint
        );
      }
      context.stroke();
      animationFrame = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      analyser.disconnect();
      source.disconnect();
    };
  }, [audio, canvas]);

  return (
    <div ref={container} {...props} className={style["audio-player-canvas"]}>
      <canvas ref={canvas} height={bounds.height} width={bounds.width} />
    </div>
  );
}

export default function AudioVisualizer(props: AudioVisualizerProps) {
  if (window.AudioContext || (window as any).webkitAudioContext) {
    return <RealAudioVisualizer {...props} />;
  } else {
    return <>Your browser doesn&apos;t support audio contexts</>;
  }
}
