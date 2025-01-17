import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import PostCard from "./PostCard";
import axios from "axios";
import { getMessageError, getMessageSuccess } from "../../hooks/Popups.jsx";
import { Toaster } from "react-hot-toast";

import BottomNav from "../BottomNav/BottomNav.jsx";

function ViewPost() {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/user`)
      .then((res) => {
        // console.log(res.data.data);

        setUserData(res.data.data);
        setUserData(res.data.data);
        getMessageSuccess(res.data.message);
        return;
      })
      .catch((err) => {
        getMessageError(err.response.data.message);
        console.log(err);
        return;
      });
    axios
      .get(`/api/v1/post/getAllPost`)
      .then((res) => {
        setPostData(res.data.data);
        getMessageSuccess(res.data.message);
        return;
      })
      .catch((err) => {
        getMessageError(err.response.data.message);
        console.log(err);
        return;
      });
  }, []);

  return (
    <div>
      <Toaster />
      <Header data={userData} />
      <div>
        <PostCard postData={postData} />
      </div>
      <BottomNav />
    </div>
  );
}

export default ViewPost;
