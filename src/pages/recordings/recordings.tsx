import React from "react";
import { useParams } from "react-router-dom";
import { addVideoAPI } from "../../api/session";
import { AudioPlayerComponent } from "../../components/cores/audio-player/audio-player";
import { LoaderComponent } from "../../components/cores/loader/loader";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { VideoPlayerComponent } from "../../components/cores/video-player/video-player";
import { AccountContext } from "../../context/account";
import { getAPI } from "../../utils/getApi";
import style from "./recordings.module.scss";

export const RecordingsPage = () => {
  const list = [
    {
      path: "https://vokalo-prod.s3.eu-north-1.amazonaws.com/clubs/S1FBOK/sessions/96dfde02-cf46-4d63-906e-6947d9dba62d/recordings/devices/ecfdd829-7e27-4349-916a-4de5f762086f/a69a2cac-8701-444a-883e-13d31043cbee/a69a2cac-8701-444a-883e-13d31043cbee.mp3?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCmV1LW5vcnRoLTEiRzBFAiAFOJR14l6qItJW7ATGttYikWxsYDEuKAqGE%2BK%2BbSYOzgIhAKmqhJNjxsxa%2B8cJuttj8aw6LQNEhqwaASVVPZUzoUhYKu4DCEUQARoMMDY1MTEwMDQwNzA3IgxOCdimnK1hpo9jURsqywOLZ41VbALCQK82x2NXIOm07Y%2B5zC6zYnK5V3Z9Lhy1haIkjn9khfQuJTBvrEuvwAQDbf3JfMpJ0d3l8e%2Fj6eFsjbgSrm5E6Y%2Bx8461ehAzUCNxF8QJtpzhhEXuVdfVDSVP%2Fxo6bWdjpRtm9LxthfP0tBBlfpFT%2FFWWEh1nQx9C5%2FwAEPkuSUErRvEnHe7wUrqc6qI5agR1TUNoyW%2FjCvpyaGbv52VH6CpBy8us1wfoRra2lpKSdjdT8qZ2kCOql34glRcx5IiHW%2FGw4FQjexRyC7j81GkOWmcyjUohR4JPA6XQAx6ypNHRxrI0RUwHKVcrEVcLNP6q7bF8WAHmJbaoVPERwYYMt1%2F1lX2uLAoEmRZG3%2FdoTsWGLoyvQjWFBMLgQKO13GYGrRVeyYh8SCqPgT6H6zY2nz5qorf1sjbyamyk7IBUBRgoH8fm7t2GRRU0675xeTJVhnPjUZ3bYK%2F8xdA2qe5xueS5A7ociJlXm4jpWtr4VaCrcidnzqqcGVrg%2F2OUjmB8PkmXh78ixm%2BHMLEVyWd9QuEj%2BbfHt4Y%2BsHTQ1plkdG345LRbMHFGclyfnUHUJkm%2FJQrQZvnRDu%2FxbR0U%2BfJcVPdEv%2B0wl8y%2FmgY6pQGPQct09VuRdnGjutEqN%2F9z58sNsPNfZ%2B%2B8uS7O3x8egmm8HvH48HMFUoIwBFgYpGgpzeUPGq6Y%2F9%2FmUfa%2FLxg8Rpo9DA8x2twELZaaT0Th89wZ8bUvog2Jhp1%2BLZs7jvcXqepEYvKGyYP%2FafL6pbZArm1JnXswCOJJtZO4Pem0B%2FpfC7lGkMRkWMQZQBR6eS6EcNYkJ2EKgYe3TM6ARD34w1pgLZ0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221019T130829Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=ASIAQ6KG4MCBQNLQJERS%2F20221019%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=cd6d313af4c84bf232044c7847ffc9b7f2be24f7f36893fe3e18bc2d66ecd65e",
      startOffset: 2241,
      endOffset: 300000,
    },
    {
      path: "http://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
      startOffset: 310000,
      endOffset: 800000,
    },
  ];
  const vid =
    "www.youtube.com/watch?v=55s3T7VRQSc&list=RD55s3T7VRQSc&start_radio=1&ab_channel=PlayingForChange";
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [audios, setAudios] = React.useState<any[]>([]);
  const [video, setVideo] = React.useState<string>("");
  const [startsAt, setStartsAt] = React.useState<any>(0);
  const { getAccount } = React.useContext(AccountContext);
  const { id } = useParams();

  const getVideoData = async (session: any) => {
    const data = await getAPI("session/video-audio", session, "", "", "", {
      key: "sessionId",
      value: id,
    });
    setVideo(data.videoSyncData.videoData.path);
    setAudios(data.videoSyncData.profileAudioRecordingData);
  };
  const onUpload = async (files: any) => {
    console.log(files);
    // getAccount().then(async (session: any) => {
    //   const data = await addVideoAPI(session, files[0], id);
    // });
  };

  React.useEffect(() => {
    getAccount().then((session: any) => {
      getVideoData(session);
    });
  }, []);
  return (
    <div className={style["recordings"]}>
      <PageHeaderComponent
        hasReturn
        route="sessions"
        title={"Video sync"}
        list={[]}
        onSelect={() => ""}
      />
      {video || audios ? (
        <div className={style["recordings-container"]}>
          <div className={style["recordings-video"]}>
            <VideoPlayerComponent
              src={video}
              hasControl
              startAt={startsAt}
              onClick={setIsPlaying}
              onChange={setStartsAt}
              onUpload={onUpload}
            />
          </div>
          {/* <div
          className={` ${style["recordings-highlights-container"]} widget-container`}
        >
          <h6>All highlights</h6>
        </div> */}
          <div
            className={` ${style["recordings-audio-container"]} widget-container`}
          >
            <h6>Audios </h6>
            <div
              className={` ${style["recordings-audio"]} ${
                isPlaying && style["recordings-audio-playing"]
              } `}
            >
              {/* <AudioPlayerComponent
              audios={list}
              currentTime={parseInt(startsAt) * 1000}
              isPlaying={isPlaying}
            /> */}
              {audios.map((item: any, key: number) => (
                <AudioPlayerComponent
                  key={key}
                  audios={item.audioRecordingData}
                  currentTime={parseInt(startsAt) * 1000}
                  isPlaying={isPlaying}
                  name={item.profile.firstName}
                  // startOffset={
                  //   parseInt(startsAt) * 1000 +
                  //   getAudio(item.audioRecordingData).startOffset
                  // }
                  // onClick={() =>
                  //   item.path.length && isPlaying && onAudioClicked(key)
                  // }
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};
