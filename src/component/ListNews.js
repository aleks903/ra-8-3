import React, { Fragment, useContext, useState, useEffect } from 'react';
import useJsonFetch from '../hooks/useJsonFetch.js';
import AuthContext from '../contexts/AuthContext.js';
import ItemNews from './ItemNews.js';

export default function ListNews() {
  const {token, profile, url, handleLogin, handleLogout} = useContext(AuthContext);
  const [loadNews, setLoadNews] = useState(false);
  const [getFetch, setGetFetch] = useState({});
  const [data, loading] = useJsonFetch(getFetch);

  const [errorMsg, setErrorMsg] = useState();

  if (profile) {
    console.log('zapros news');
  }
    
  useEffect(() => {
    console.log(data);
    if(data) {
    if (data.status === 200) {
      console.log(data.resolve);
    } else if (data.status === 401) {
      handleLogout;
    }
    setErrorMsg(data.resolve.message);
    }
    if(profile && !loadNews) {
      setGetFetch({
        url: `${url}private/news`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        timeStamp: new Date(),
      });
      setLoadNews(true);
    }
  }, [data, profile]);
  console.log(data);
  return (
    <Fragment>
      <div className="news-list">
        {profile && <Fragment>
          {data && data.resolve.map((item) => <ItemNews key={item.id} news={item} />)}
        </Fragment>
        }
        {!profile && <Fragment>
          <div className="font">
            <h2>Neto Social</h2>
            <p>Facebook and VK killer.</p>
          </div>
          </Fragment>
        }
        {/* {!profile && <AuthForm onSub={handleLogin} />} */}
      </div>
      
    </Fragment>
  )
}
  