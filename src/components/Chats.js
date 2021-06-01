import React, {useRef, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import {useAuth} from "../contexts/AuthContext"
import axios from "axios";

const Chats = () => {
const [loading, setLoading] = useState(true);
const history = useHistory();
const {user} = useAuth();
console.log(user);

const getFile = async (url)=> {
  const response = await fetch(url);
  const data = await response.blob();

  return new File([data], "userPhoto.jpg", {type: "image/jpeg"})
}

const handleLogout = async () => {
  await auth.signOut();
  history.push('/')
}

useEffect(() => {
  if(!user || user === null) {
    history.push('/');

    return;
  }

  axios.get('https://api.chatengine.io/users/me', {
    headers: {
      "project-id": "af77d5b5-95f3-43d0-b157-fa222ec23a35",
    'user-name': user.email,
    'user-secret': user.uid,
    }
  }).then(()=> {
    setLoading(false);
  })
  .catch(()=> {
    let formdata = new FormData();
    formdata.append('email', user.email);
    formdata.append('username', user.email);
    formdata.append('secret', user.uid);

    getFile(user.photoURL)
    .then((avatar) => {
      formdata.append('avatar', avatar, avatar.name)
    axios.put('https://api.chatengine.io/users/', formdata,
    {headers: 
      { "private-key": "2a9900df-ea49-48ec-81ef-da6529c15ada" }
    })
    })
    .then(() => {setLoading(false)})
    .catch((error) => console.log(error))
  })

}, [user, history])

if(!user || loading) return 'loading...';

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">React Chat</div>
        <div className="logout-tab" onClick={handleLogout}>logout</div>
      </div>

      <ChatEngine height="calc(100vh-66px)" projectID="af77d5b5-95f3-43d0-b157-fa222ec23a35" userName={user.email} userSecret={user.uid} />
    </div>
  );
};

export default Chats;
