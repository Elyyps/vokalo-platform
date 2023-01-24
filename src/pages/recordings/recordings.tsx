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
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
    setVideo(
      "/FC5N07/sessions/23648327-cf2c-4e69-9e98-217100c553ca/video/session.mp4"
    );
    // setVideo(data.videoSyncData.videoData.path);
    setAudios(data.videoSyncData.profileAudioRecordingData);
  };
  const onUpload = async (files: any) => {
    setIsLoading(true);
    getAccount().then(async (session: any) => {
      const data = await addVideoAPI(session, files[0], id);
      if (data) {
        setIsLoading(false);
      }
    });
  };

  React.useEffect(() => {
    getAccount().then((session: any) => {
      getVideoData(session);
    });
  }, [isLoading]);
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
            {!isLoading ? (
              <VideoPlayerComponent
                src={video}
                hasControl
                startAt={startsAt}
                onClick={setIsPlaying}
                onChange={setStartsAt}
                onUpload={onUpload}
              />
            ) : (
              <div
                className="widget-container"
                style={{
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LoaderComponent />
              </div>
            )}
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
            <div className={style["recordings-audio"]}>
              {audios.map((item: any, key: number) => (
                <AudioPlayerComponent
                  key={key}
                  audios={item.audioRecordingData}
                  currentTime={parseInt(startsAt) * 1000}
                  isPlaying={isPlaying}
                  name={item.profile.firstName}
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
