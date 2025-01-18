import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";

export default function UserPost(postData) {

  return (
    <div className="pt-[1rem] px-3 pb-20">
      {postData?.posts?.map((post,index) => {
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
              />
            </CardBody>
            <CardFooter className="py-2 description">
              {post?.description || ""}
            </CardFooter>
          </Card>
        );
      }) || "No Posts Available"}
    </div>
  );
}
