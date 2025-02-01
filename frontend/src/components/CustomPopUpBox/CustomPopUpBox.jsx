import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import axios from "axios";
function CustomPopUpBox({ postId, data }) {
  const [commentData, setCommentData] = useState({
    comment: "",
  });

  const handleSubmit = (e, postId) => {
    e.preventDefault();
    console.log(postId);
    axios
      .post(`/api/v1/post/commentPost/${postId}`, {
        commentText: commentData.comment,
      })
      .then((res) => {
        setCommentData({
          comment: "",
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addComment = () => {};

  return (
    <div className="z-[100]  backdrop-blur-sm fixed top-0 h-[100%]  w-[100%] flex justify-center items-center flex-col">
      <motion.div
        initial={{ opacity: 0, transform: "scale(0)" }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        className="w-[90%] h-[70%] bg-gray-400 rounded-xl flex flex-col gap-4 px-2 py-3 overflow-y-auto "
      >
        <h1 className="text-center text-2xl text-black">
          <span>name's </span>comments
        </h1>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white flex gap-2 flex-col p-2 rounded-lg"
            >
              <div className="flex gap-2 items-center border-b-1 p-1">
                <img
                  src={item.user?.avatar}
                  alt=""
                  className="w-[30px] h-[30px] rounded-full"
                />
                <p>{item.user.userName}</p>
              </div>
              <div>{item.text}</div>
            </div>
          );
        }) || "no comments"}
      </motion.div>
      <div className="mt-4">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            handleSubmit(e, postId);
          }}
        >
          <input
            type="text"
            placeholder="write a commant"
            className="bg-slate-200 w-full px-2 py-3 rounded-full"
            value={commentData.comment}
            onChange={(e) => {
              setCommentData({ ...commentData, comment: e.target.value });
            }}
          />
          <Button type="submit" color="primary">
            send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CustomPopUpBox;
