import axios from "axios";
import { ITag } from "../types/cores/tag";
import { getFilterUrl } from "../utils/getFilterUrl";
const API_URL = process.env.REACT_APP_STAGE_API_URL;

export const addVideoTagsAPI = async ({ accessToken }: any, filters: any[]) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };

  let filtersList = "";
  filters.forEach((filter) => {
    return (filtersList = filtersList.concat(
      filter.value ? "&" + filter.key + "=" + filter.value : ""
    ));
  });
  return await axios
    .post(`${API_URL}session/video-tag?` + filtersList, {}, config)
    .then((response: any) => response.data)
    .catch(console.log);
};
