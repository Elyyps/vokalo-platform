import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { LoaderComponent } from "../../components/cores/loader/loader";
import { VideoPlayerComponent } from "../../components/modules/video-player/video-player";
import { FieldAudioOverviewComponent } from "../../components/modules/field-audio-overview/field-audio-overview";
import { AddTagsComponent } from "../../components/modules/tags/add-tag";
import { TagsComponent } from "../../components/modules/tags/tags";
import { AccountContext } from "../../context/account";
import FilterContext from "../../context/filter";
import { getAPI } from "../../utils/getApi";
import style from "./recordings.module.scss";
import {
  addVideoTagsAPI,
  deleteVideoTagAPI,
  editVideoTagsAPI,
} from "../../api/tags";
import { ITag } from "../../types/cores/tag";
import { useCookies } from "react-cookie";
import { addVideoAPI } from "../../api/session";

export const RecordingsPage = () => {
  const playerRef = React.useRef<any>();
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [tags, setTags] = React.useState<any[]>([]);
  const [audios, setAudios] = React.useState<any[]>([]);
  const [video, setVideo] = React.useState<string>("");
  const [field, setField] = React.useState<any>();
  const [players, setPlayers] = React.useState<any>([]);
  const [startsAt, setStartsAt] = React.useState<any>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { team, startDate, endDate } = React.useContext(FilterContext);
  const { getAccount } = React.useContext(AccountContext);
  const [cookies] = useCookies(["coach"]);
  const { id } = useParams();

  const getActivePlayersId = () => {
    const playersID = players
      .map((player: any) => {
        if (!player.isMuted && player.profile.id) return player.profile.id;
      })
      .filter((id: string) => id);
    return playersID;
  };
  const onTagClicked = (tag: ITag) => {
    playerRef.current.currentTime = tag.tagTime;
    const newPlayers = players.map((player: any) => {
      if (tag.profileIds && tag.profileIds.includes(player.profile.id)) {
        player.isMuted = false;
      } else {
        player.isMuted = true;
      }

      return player;
    });
    setPlayers(newPlayers);
  };
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
        await addVideoTagsAPI(session, getActivePlayersId(), [
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
  const onDelete = (tagId: string) => {
    getAccount().then(async (session: any) => {
      await deleteVideoTagAPI(session, [
        {
          key: "sessionId",
          value: id,
        },
        {
          key: "videoTagId",
          value: tagId,
        },
      ]);
      getTags(session);
    });
  };
  const onEdit = (tag: ITag) => {
    getAccount().then(async (session: any) => {
      await editVideoTagsAPI(session, getActivePlayersId(), [
        {
          key: "sessionId",
          value: id,
        },
        {
          key: "videoTagId",
          value: tag.id,
        },
        {
          key: "comment",
          value: tag.comment,
        },
        {
          key: "color",
          value: "%23" + tag.color.substring(1),
        },
        {
          key: "tagTime",
          value: tag.tagTime,
        },
      ]);
      getTags(session);
    });
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
      {(video || audios) && (
        <div className={style["recordings-container"]}>
          <div className={style["recordings-video"]}>
            {!isLoading ? (
              <VideoPlayerComponent
                src={video}
                hasControl
                isPlaying={isPlaying}
                startAt={startsAt}
                playerRef={playerRef}
                onClick={setIsPlaying}
                onChange={setStartsAt}
                onUpload={onUpload}
                tags={tags}
              />
            ) : (
              <div className="widget-container" style={{ minHeight: "400px" }}>
                <LoaderComponent />
              </div>
            )}
            <TagsComponent
              tags={tags}
              onDelete={onDelete}
              onEdit={onEdit}
              onClick={onTagClicked}
            />
          </div>
          {field && players && (
            <div
              className={` ${style["recordings-field-container"]} widget-container`}
            >
              <FieldAudioOverviewComponent
                fieldOverview={field}
                profiles={players}
                isCoach={cookies.coach?.value}
                currentTime={parseInt(startsAt) * 1000}
                isPlaying={isPlaying}
                onChange={setPlayers}
              />
              <AddTagsComponent
                time={parseInt(startsAt) * 1000}
                onSave={addTag}
                onClick={() => playerRef.current.pause()}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
