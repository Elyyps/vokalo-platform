import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { addVideoAPI } from "../../api/session";
import { LoaderComponent } from "../../components/cores/loader/loader";
import { VideoPlayerComponent } from "../../components/modules/video-player/video-player";
import { FieldAudioOverviewComponent } from "../../components/modules/field-audio-overview/field-audio-overview";
import { AddTagsComponent } from "../../components/modules/tags/add-tag";
import { TagsComponent } from "../../components/modules/tags/tags";
import { AccountContext } from "../../context/account";
import FilterContext from "../../context/filter";
import { getAPI } from "../../utils/getApi";
import style from "./recordings.module.scss";
import { addVideoTagsAPI } from "../../api/tags";

export const RecordingsPage = () => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [tags, setTags] = React.useState<any[]>([]);
  const [audios, setAudios] = React.useState<any[]>([]);
  const [video, setVideo] = React.useState<string>("");
  const [field, setField] = React.useState<any>();
  const [players, setPlayers] = React.useState<any>([]);
  const [startsAt, setStartsAt] = React.useState<any>(0);
  const { team, startDate, endDate } = React.useContext(FilterContext);
  const { getAccount } = React.useContext(AccountContext);
  const { id } = useParams();

  const getTags = async (session: any) => {
    const data = await getAPI("session/video-tags", session, "", "", "", {
      key: "sessionId",
      value: id,
    });
    setTags(data.videoTags);
  };
  const addTag = async (color: string, comment: string) => {
    if (comment) {
      getAccount().then(async (session: any) => {
        await addVideoTagsAPI(session, [
          {
            key: "sessionId",
            value: id,
          },
          {
            key: "comment",
            value: comment,
          },
          {
            key: "color",
            value: "%23" + color.substring(1),
          },
          {
            key: "tagTime",
            value: parseInt(startsAt),
          },
        ]);
        getTags(session);
      });
    }
  };
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
    console.log(newList);
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
  const onUpload = useMemo(
    () => async (files: any) => {
      setIsLoading(true);
      getAccount().then(async (session: any) => {
        const data = await addVideoAPI(session, files[0], id);
        if (data) {
          setIsLoading(false);
        }
      });
    },
    []
  );

  React.useEffect(() => {
    getAccount().then((session: any) => {
      getVideoData(session);
      getTags(session);
    });
  }, []);

  return (
    <div className={style["recordings"]}>
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
              tags={tags}
            />
            <TagsComponent tags={tags} />
          </div>
          {field && players && (
            <div
              className={` ${style["recordings-field-container"]} widget-container`}
            >
              <FieldAudioOverviewComponent
                fieldOverview={field}
                profiles={players}
                currentTime={parseInt(startsAt) * 1000}
                isPlaying={isPlaying}
              />
              <AddTagsComponent
                time={parseInt(startsAt) * 1000}
                onSave={addTag}
              />
            </div>
          )}
        </div>
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};
