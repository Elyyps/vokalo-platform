import React from "react";
import { useParams } from "react-router-dom";
import { addVideoAPI } from "../../api/session";
import { LoaderComponent } from "../../components/cores/loader/loader";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { VideoPlayerComponent } from "../../components/cores/video-player/video-player";
import { FieldAudioOverviewComponent } from "../../components/modules/field-audio-overview/field-audio-overview";
import { AccountContext } from "../../context/account";
import FilterContext from "../../context/filter";
import { getAPI } from "../../utils/getApi";
import style from "./recordings.module.scss";

export const RecordingsPage = () => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [audios, setAudios] = React.useState<any[]>([]);
  const [video, setVideo] = React.useState<string>("");
  const [field, setField] = React.useState<any>();
  const [players, setPlayers] = React.useState<any>([]);
  const [startsAt, setStartsAt] = React.useState<any>(0);
  const { team, startDate, endDate } = React.useContext(FilterContext);
  const { getAccount } = React.useContext(AccountContext);
  const { id } = useParams();

  const getFieldData = async (session: any) => {
    const data = await getAPI(
      "session",
      session,
      team && team.id,
      startDate,
      endDate,
      [{ key: "sessionId", value: id }]
    );
    return data;
  };
  const getPlayerAudio = (players: any[], list: any[]) => {
    const newList = list.map((item: any, index) => {
      const profile = players.find(
        (player: any) => player.id === item.profile.id
      );
      if (profile) {
        item.profile = profile;
      }
      return { ...item, isMuted: true };
    });
    setPlayers(newList);
  };
  const getVideoData = async (session: any) => {
    const data = await getAPI("session/video-audio", session, "", "", "", {
      key: "sessionId",
      value: id,
    });
    const fieldData = await getFieldData(session);
    setField(fieldData.sessionAggregations[4].data);
    getPlayerAudio(
      fieldData.sessionAggregations[4].profiles,
      data.videoSyncData.profileAudioRecordingData
    );
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
          <div
            className={` ${style["recordings-field-container"]} widget-container`}
          >
            {field && players && (
              <FieldAudioOverviewComponent
                fieldOverview={field}
                profiles={players}
                currentTime={parseInt(startsAt) * 1000}
                isPlaying={isPlaying}
              />
            )}
          </div>
          {/* <div
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
          </div> */}
        </div>
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};
