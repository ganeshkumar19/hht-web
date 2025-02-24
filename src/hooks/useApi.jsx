import axios from 'axios';

export const useApi = () => {
  const sendRequest = async ({ url, method, body, headers }) => {
    try {
      const response = await axios({ url, method, data: body, headers });
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response ? error.response.data : error };
    }
  };

  return sendRequest;
};
