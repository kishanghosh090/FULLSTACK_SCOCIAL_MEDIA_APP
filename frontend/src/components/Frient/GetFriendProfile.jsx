import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserPost from "../Home/UserPost";
import BackNavigation from "../BackNavigationBar/BackNavigation";

function GetFriendProfile() {
  const [close, setClose] = useState(false);
  const [data, setData] = React.useState([]);
  const [posts, setPosts] = useState([]);
  const navigator = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/api/v1/user/friendProfile/${id}`)
      .then((res) => {
        if (res.data.message === "you want get your profile") {
          navigator("/Home", { replace: true });
          return;
        } else {
          setClose(true);
          setData(res.data.data);
          setPosts(res.data.data.posts);
        }
      })
      .catch((err) => {});
  }, []);
  return (
    <div>
      {close && (
        <div>
          <BackNavigation data={data.userName} />
          <div className="h-full bg-slate-100 flex flex-col gap-2 p-2 transition-opacity z-[5]">
            <Card className="py-4 mt-[5rem] relative bg-white dark:text-black flex flex-col items-center justify-center">
              <CardBody className="overflow-visible py-2 flex justify-center items-center p-5 z-[5]">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={`${data.avatar}`}
                  width={270}
                  height={250}
                  classNames="bg-cover"
                  onClick={() => {
                    setZoomPicUrl(`${data.avatar}`);

                    setIsZoomPic(true);
                  }}
                />
              </CardBody>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center justify-center z-[5]">
                <p className="text-tiny  font-medium text-[1rem]">
                  {data.email}
                </p>
              </CardHeader>
              <CardFooter className="mt-4 flex items-center  justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden  before:rounded-xl rounded-large bottom-1 shadow-small z-[5]-10 w-[50%]">
                <p className=" text-black  font-bold z-[5] text-center w-full">
                  {data.userName}
                </p>
              </CardFooter>
            </Card>

            {/* activity */}
            <div className="activity pb-[7rem]">
              <h1 className="text-[1.2rem] text-center m-3 font-bold">
                {data.userName}'s Activity
              </h1>
              <UserPost posts={posts} data={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetFriendProfile;
