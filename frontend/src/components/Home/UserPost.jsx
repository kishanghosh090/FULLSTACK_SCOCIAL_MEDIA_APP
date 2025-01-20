import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import ZoomPic from "../ZoomPic/ZoomPic.jsx";
import { useState } from "react";

export default function UserPost(postData) {
  const [isZoomPic, setIsZoomPic] = useState(false);
  const [zoomPicUrl, setZoomPicUrl] = useState("");
  return (
    <>
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
      <div className="pt-[1rem]  pb-20">
        {postData?.posts?.map((post, index) => {
          return (
            <Card className=" m-2 z-[5]" key={index}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className=" uppercase font-bold">{postData.data.usename}</p>
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
            </Card>
          );
        }) || "No Posts Available"}
      </div>
    </>
  );
}
