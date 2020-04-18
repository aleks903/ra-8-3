import React, { useState, useEffect } from 'react';
import useStorage from '../hooks/useStorage.js';
import useJsonFetch from '../hooks/useJsonFetch.js';
import AuthContext from '../contexts/AuthContext.js';

export default function AuthProvider(props) {
  const { url } = props;
  const [token, setToken] = useStorage(localStorage, 'token');
  const [profile, setProfile] = useStorage(localStorage, 'profile', true);

  // const [errorMsg, setErrorMsg] = useState();

  const [getFetch, setGetFetch] = useState({});
  const [data, loading] = useJsonFetch(getFetch);


  const handleLogin = (objLogin) => {
    console.log(objLogin);
    setToken(objLogin);
    setGetFetch({
      url: `${url}private/me`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${objLogin}`,
      },
      timeStamp: new Date(),
    });
  };

  const handleLogout = () => {
    setProfile(null);
    setToken(null);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      if (data.status === 200) {
        setProfile(data.resolve);
      }
    }
  }, [data])

  return (
    <AuthContext.Provider value={{handleLogin, handleLogout, url, token, profile}}>
      {props.children}
    </AuthContext.Provider>
  )
}
