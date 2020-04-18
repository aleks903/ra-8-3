import React, { Fragment, useContext, useState, useEffect } from 'react';
import useJsonFetch from '../hooks/useJsonFetch.js';
import AuthContext from '../contexts/AuthContext.js';
import AuthForm from './AuthForm.js';

export default function ToolbarFunctional() {
  const {token, profile, url, handleLogin, handleLogout} = useContext(AuthContext);
  const [getFetch, setGetFetch] = useState({});
  const [data, loading] = useJsonFetch(getFetch);

  const [errorMsg, setErrorMsg] = useState();


  const handleSubmit = (objLogin) => {
    setGetFetch({
      url: `${url}auth`,
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        login: objLogin.login,
        password: objLogin.password,
      }),
      timeStamp: new Date(),
    });
  };
  
  useEffect(() => {
    console.log(data);
    if(data) {
    if (data.status === 200) {
      if(!token) {
        console.log(data.resolve.token);
        handleLogin(data.resolve.token);
        setErrorMsg('');
        
        return;
      }
    }
    setErrorMsg(data.resolve.message);
    }
    
  }, [data]);
  
  return (
    <Fragment>
      <div className="toolbar">
        <p>Neto Social</p>
        {profile && <div>
          <p>Hello, {profile.name}</p>
          <img src={profile.avatar} />
          <button onClick={handleLogout}>Logout</button>
          {/* <button onClick={handleFetch}>Fetch</button> */}
        </div>
        }
        {!profile && <AuthForm onSub={handleSubmit} />}
        {/* {!profile && <AuthForm onSub={handleLogin} />} */}
        {errorMsg && errorMsg}
      </div>
      
    </Fragment>
  )
}
  