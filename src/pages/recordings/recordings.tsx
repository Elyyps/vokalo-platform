import React from "react";
import { AudioPlayerComponent } from "../../components/cores/audio-player/audio-player";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { VideoPlayerComponent } from "../../components/cores/video-player/video-player";
import style from "./recordings.module.scss";

export const RecordingsPage = () => {
  const list = [
    {
      name: "Alfred",
      isMuted: true,
      audio:
        "https://vokalo-public.s3.eu-north-1.amazonaws.com/video-samples/Ryberg-b6966515-c0c5-40f0-af20-aef32326be38.mp3",
      startsAt: 50,
      endsAt: 110,
    },
    {
      name: "Ben",
      isMuted: true,
      audio:
        "https://vokalo-public.s3.eu-north-1.amazonaws.com/video-samples/Rytter-45c31073-ecb2-4767-91ff-22560b3aff12.mp3",
      startsAt: 0,
      endsAt: 60,
    },
    {
      name: "Fred",
      isMuted: true,
      audio: "",
      startsAt: 50,
      endsAt: 110,
    },
    {
      name: "Gabriel",
      isMuted: true,
      audio: "",
      startsAt: 10,
      endsAt: 110,
    },
    {
      name: "Carslen",
      isMuted: true,
      audio:
        "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
      startsAt: 50,
      endsAt: 110,
    },
    {
      name: "Daniel",
      isMuted: true,
      audio: "",
      startsAt: 0,
      endsAt: 110,
    },
    {
      name: "Henry",
      isMuted: true,
      audio: "",
      startsAt: 10,
      endsAt: 110,
    },
    {
      name: "Alfred",
      isMuted: true,
      audio: "",
      startsAt: 0,
      endsAt: 110,
    },
    {
      name: "Gabriel",
      isMuted: true,
      audio: "",
      startsAt: 50,
      endsAt: 110,
    },
    {
      name: "Daniel",
      isMuted: true,
      audio: "",
      startsAt: 50,
      endsAt: 110,
    },
  ];
  const vid =
    "www.youtube.com/watch?v=55s3T7VRQSc&list=RD55s3T7VRQSc&start_radio=1&ab_channel=PlayingForChange";
  const videoLink =
    "https://vokalo-public.s3.eu-north-1.amazonaws.com/video-samples/SIF+U19+-+Haugesund+01+03+2022+(7-3).mp4";
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [audios, setAudios] = React.useState<any[]>(list);
  const [startsAt, setStartsAt] = React.useState<any>(0);

  const onAudioClicked = (index: number) => {
    const newList = audios.map((item: any, key: number) => {
      if (key === index) {
        item.isMuted = !item.isMuted;
      }
      return item;
    });
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
            startAt={startsAt}
            onClick={setIsPlaying}
            onChange={setStartsAt}
          />
        </div>
        <div
          className={` ${style["recordings-highlights-container"]} widget-container`}
        >
          <h6>All highlights</h6>
        </div>
        <div
          className={` ${style["recordings-audio-container"]} widget-container`}
        >
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
                startsAt={item.startsAt + parseInt(startsAt)}
                onClick={() =>
                  item.audio.length && isPlaying && onAudioClicked(key)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
