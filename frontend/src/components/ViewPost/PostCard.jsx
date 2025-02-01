import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";

import { BiSolidLike } from "react-icons/bi";
import axios from "axios";
import CustomPopUpBox from "../CustomPopUpBox/CustomPopUpBox.jsx";
import { useEffect, useState } from "react";

import { FaRegComments } from "react-icons/fa";
import ZoomPic from "../ZoomPic/ZoomPic.jsx";
import { use } from "react";

export default function PostCard({ postData, userData }) {
  const navigate = useNavigate();
  const [isZoomPic, setIsZoomPic] = useState(false);
  const [zoomPicUrl, setZoomPicUrl] = useState("");
  const [likeColor, setLikeColor] = useState([]);
  const [close, setClose] = useState(false);
  const [postIdForCommant, setPostIdForCommant] = useState("");
  const [commentData, setCommentData] = useState([]);
  useEffect(() => {
    setLikeColor(postData);
  });
  const likeHandle = (postCardId) => {
    axios
      .put(`/api/v1/post/likeOrUnlikePost`, {
        whichPostToLike: postCardId,
      })
      .then((res) => {
        console.log(res.data.data);
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFollow = () => {};

  return (
    <>
      {close && (
        <div>
          <button
            onClick={() => setClose(false)}
            className="btn fixed left-4 top-4 rounded-lg px-2 py-1 text-white  bg-red-600 z-[101]"
          >
            close
          </button>
          <CustomPopUpBox postId={postIdForCommant} data={commentData} />
        </div>
      )}
      {isZoomPic && (
        <div>
          <button
            onClick={() => setIsZoomPic(false)}
            className="btn fixed left-4 top-4 rounded-lg px-2 py-1 text-white  bg-red-600 z-[102]"
          >
            close
          </button>
          <ZoomPic img={zoomPicUrl} />
        </div>
      )}
      <div className="pt-[6rem] px-3 pb-20">
        {postData?.map((post, index) => {
          return (
            <Card className="py-4 m-2 z-[5] px-2" key={post._id}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <NavLink
                  to={`/viewPost/${post?.user._id}`}
                  className="cardOwer flex justify-center items-center gap-3 bg-slate-100 w-full py-2 rounded-3xl cursor-pointer"
                >
                  <Image
                    alt="Card background"
                    className="object-cover rounded-full"
                    src={`${post?.user.avatar || ""}`}
                    width={50}
                    height={50}
                  />
                  <p className=" uppercase font-bold">{post?.user.userName}</p>
                </NavLink>
                <div className="cardTitle mt-2">{post?.title || ""}</div>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={post.image}
                  width={270}
                  onClick={() => {
                    setIsZoomPic(true);
                    setZoomPicUrl(post.image);
                  }}
                />
              </CardBody>
              <CardFooter className="py-2 description">
                {post?.description || ""}
              </CardFooter>
              <div className="footer flex justify-between px-2">
                <button
                  onClick={() => likeHandle(post?._id)}
                  className="like m-3 text-2xl text-red flex justify-start items-center"
                >
                  <BiSolidLike
                    style={{
                      color: `${
                        likeColor[index]?.likes?.includes(likeColor[index]._id)
                          ? "red"
                          : ""
                      }`,
                    }}
                  />
                  <span className="ml-2">{}</span>
                </button>
                <button
                  className="comment text-3xl"
                  onClick={() => {
                    setClose(true);
                    setPostIdForCommant(post?._id);
                    setCommentData(post?.comments);
                  }}
                >
                  <FaRegComments />
                </button>
                <button
                  onClick={() => {
                    handleFollow(post?.user?._id);
                  }}
                  className={` px-2 h-9  text-white rounded-3xl bg-purple-700`}
                >
                  Follow
                </button>
              </div>
            </Card>
          );
        }) || "no posts found"}
      </div>
    </>
  );
}
