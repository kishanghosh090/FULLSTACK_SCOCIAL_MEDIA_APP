import React from "react";
import { motion } from "framer-motion";
function ZoomPic(props) {
  return (
    <div className="z-[101]  left-0 backdrop-blur-sm fixed top-0 h-[100%]  w-[100%] flex justify-center items-center flex-col ">
      <motion.div
        initial={{ opacity: 0, transform: "translateY(-100px)" }}
        animate={{ opacity: 1, transform: "translateY(0)" }}
        className=" bg-gray-600 rounded-xl flex flex-col gap-4 px-1 py-2 overflow-y-auto  "
      >
        <div className="bg-white flex gap-2 flex-col px-1 rounded-lg">
          <img src={props.img} className="object-cover" />
        </div>
      </motion.div>
    </div>
  );
}

export default ZoomPic;
