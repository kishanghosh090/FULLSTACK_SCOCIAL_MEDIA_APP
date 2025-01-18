import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import PostCard from "./PostCard";
import axios from "axios";
import { getMessageError, getMessageSuccess } from "../../hooks/Popups.jsx";
import { Toaster } from "react-hot-toast";

import BottomNav from "../BottomNav/BottomNav.jsx";
import Loader from "../Loader/Loader.jsx";

function ViewPost() {
  const [isOpen, setIsOpen] = useState(false);
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/user`)
      .then((res) => {
        setIsOpen(true);
        setUserData(res.data.data);
        setUserData(res.data.data);
        getMessageSuccess(res.data.message);
        return;
      })
      .catch((err) => {
        setIsOpen(true);
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
    <>
      {!isOpen && <Loader />}
      {isOpen && (
        <div>
          <Toaster />
          <Header data={userData} />
          <div>
            <PostCard postData={postData} />
          </div>
          <BottomNav />
        </div>
      )}
    </>
  );
}

export default ViewPost;
