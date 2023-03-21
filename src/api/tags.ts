import axios from "axios";
const API_URL = process.env.REACT_APP_STAGE_API_URL;

const getURL = (filters: any[]) => {
  let filtersList = "";
  filters.forEach((filter) => {
    return (filtersList = filtersList.concat(
      filter.value ? "&" + filter.key + "=" + filter.value : ""
    ));
  });
  return filtersList;
};
export const addVideoTagsAPI = async (
  { accessToken }: any,
  profilesID: string[],
  filters: any[]
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };
  return await axios
    .post(`${API_URL}session/video-tag?` + getURL(filters), profilesID, config)
    .then((response: any) => response.data)
    .catch(console.log);
};

export const editVideoTagsAPI = async (
  { accessToken }: any,
  filters: any[]
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };
  return await axios
    .put(`${API_URL}session/video-tag?` + getURL(filters), {}, config)
    .then((response: any) => response.data)
    .catch(console.log);
};
export const deleteVideoTagAPI = async (
  { accessToken }: any,
  filters: any[]
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };
  return await axios
    .delete(`${API_URL}session/video-tag?` + getURL(filters), config)
    .then((response: any) => response.data)
    .catch(console.log);
};
