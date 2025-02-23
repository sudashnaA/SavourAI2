import { useEffect, useState} from 'react';
import axios from 'axios';

const useGetData = (url) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + url, {
          headers: {
            'Authorization': localStorage.getItem('jwt'),
          }
        });
        setData(response.data);
      } catch (error) {
        setErrors(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    setData,
    errors,
    loading,
  };
};

export default useGetData;