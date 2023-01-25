import React from "react";
import { useParams } from "react-router-dom";
import { addVideoAPI } from "../../api/session";
import { AudioPlayerComponent } from "../../components/cores/audio-player/audio-player";
import { LoaderComponent } from "../../components/cores/loader/loader";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { VideoPlayerComponent } from "../../components/cores/video-player/video-player";
import { FieldOverviewComponent } from "../../components/modules/field-overview/field-overview";
import { AccountContext } from "../../context/account";
import FilterContext from "../../context/filter";
import { getAPI } from "../../utils/getApi";
import style from "./recordings.module.scss";

export const RecordingsPage = () => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [audios, setAudios] = React.useState<any[]>([]);
  const [video, setVideo] = React.useState<string>("");
  const [players, setPlayers] = React.useState<any>([]);
  const [startsAt, setStartsAt] = React.useState<any>(0);
  const { team, startDate, endDate } = React.useContext(FilterContext);
  const { getAccount } = React.useContext(AccountContext);
  const { id } = useParams();

  const getVideoData = async (session: any) => {
    const data = await getAPI("session/video-audio", session, "", "", "", {
      key: "sessionId",
      value: id,
    });

    //console.log(data.videoSyncData.profileAudioRecordingData);
    setVideo(data.videoSyncData.videoData.path);
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
  const getSessionDetails = async (session: any) => {
    const data = await getAPI(
      "session",
      session,
      team && team.id,
      startDate,
      endDate,
      [{ key: "sessionId", value: id }]
    );
    // console.log(data.sessionAggregations[4]);
    setPlayers(data.sessionAggregations[4]);
  };
  React.useEffect(() => {
    getAccount().then((session: any) => {
      getVideoData(session);
      getSessionDetails(session);
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
              <div className="widget-container">
                <VideoPlayerComponent
                  src={video}
                  hasControl
                  startAt={startsAt}
                  onClick={(playing) => setIsPlaying(!playing)}
                  onChange={setStartsAt}
                  onUpload={onUpload}
                />
              </div>
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
          <div
            className={` ${style["recordings-highlights-container"]} widget-container`}
          >
            {players.data && players.profiles && (
              <FieldOverviewComponent
                fieldOverview={players.data}
                profiles={players.profiles}
                isAudio
              />
            )}
          </div>
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
