import React from "react";
import { AudioPlayerComponent } from "../../components/cores/audio-player/audio-player";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { VideoPlayerComponent } from "../../components/cores/video-player/video-player";
import style from "./recordings.module.scss";

export const RecordingsPage = () => {
  const list = [
    { name: "Alfred", isMuted: true, hasAudio: false, audio: "" },
    {
      name: "Ben",
      isMuted: true,
      hasAudio: true,
      audio:
        "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    },
    { name: "Fred", isMuted: true, hasAudio: false, audio: "" },
    { name: "Gabriel", isMuted: true, hasAudio: false, audio: "" },
    {
      name: "Carslen",
      isMuted: true,
      hasAudio: true,
      audio:
        "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    },
    { name: "Daniel", isMuted: true, hasAudio: false, audio: "" },
    { name: "Henry", isMuted: true, hasAudio: true, audio: "" },
    { name: "Alfred", isMuted: true, hasAudio: true, audio: "" },
    { name: "Gabriel", isMuted: true, hasAudio: false, audio: "" },
    { name: "Daniel", isMuted: true, hasAudio: false, audio: "" },
  ];
  const vid =
    "www.youtube.com/watch?v=55s3T7VRQSc&list=RD55s3T7VRQSc&start_radio=1&ab_channel=PlayingForChange";
  const videoLink =
    "//vokalo-public.s3.eu-north-1.amazonaws.com/video-samples/SIF+U19+-+Haugesund+01+03+2022+(7-3).mp4";
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [startsAt, setStartsAt] = React.useState<number>(0);
  const [audios, setAudios] = React.useState<any[]>(list);

  const onAudioClicked = (index: number) => {
    const newList = audios.map((item: any, key: number) => {
      if (key === index) {
        item.isMuted = !item.isMuted;
      }
      return item;
    });
    console.log(newList);
    setAudios(newList);
  };
  return (
    <div className={style["recordings"]}>
      <PageHeaderComponent title={"Video sync"} list={[]} onSelect={() => ""} />
      <div className={style["recordings-container"]}>
        <div className={style["recordings-video"]}>
          <VideoPlayerComponent
            src={videoLink}
            hasControl
            startAt={36}
            onClick={setIsPlaying}
          />
        </div>
        <div className={"widget-container"} style={{ width: "32%" }}>
          All highlights
        </div>
        <div className={"widget-container"} style={{ width: "100%" }}>
          <h6>Audios</h6>
          <div
            className={` ${style["recordings-audio"]} ${
              isPlaying && style["recordings-audio-playing"]
            } `}
          >
            {audios.map((item: any, key: number) => (
              <AudioPlayerComponent
                key={key}
                {...item}
                onClick={() =>
                  item.hasAudio && isPlaying && onAudioClicked(key)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
