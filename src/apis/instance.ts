import axios from 'axios';

export const getUserListInfo = async (uri: string) => {
  const response = await axios.get(uri);
  return response.data;
};
