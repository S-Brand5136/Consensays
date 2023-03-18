import {useState} from 'react';
import axios from "axios";

export const useAxios = () => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (params) => {
    try {
      setLoading(true)
      const result = await axios.request(params);
      setResponse(result.data);
      return result.data
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {fetchData, response, error, loading};
}

