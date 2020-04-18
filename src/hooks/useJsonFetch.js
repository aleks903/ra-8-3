import {useState, useEffect} from 'react';

export default function useJsonFetch(props) {
  const {url, method, headers, body, timeStamp} = props;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log(headers);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
        });

        // if (!response.ok) {
        //   console.log(response.status, response.body);
        //   setError(response.statusText);
        //   // throw new Error(response.statusText);
        // }
        
        const resolve = await response.json();
        console.log(resolve);
        setData({
          resolve,
          status: response.status,
        });
        // setStatus();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    if (url) {
      fetchData();
    }
    
  },[url, body, timeStamp]);

  return [data, loading];
}
