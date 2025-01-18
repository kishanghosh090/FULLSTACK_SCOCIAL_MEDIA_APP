import React from "react";
import { motion } from "framer-motion";
function CustomPopUpBox() {
  return (
    <div className="z-[100]  backdrop-blur-sm fixed top-0 h-[100%]  w-[100%] flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, transform: "scale(0)" }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        className="w-[90%] h-[70%] bg-gray-400 rounded-xl flex flex-col gap-4 px-2 py-3 overflow-y-auto"
      >
        <h1 className="text-center text-2xl text-black">
          <span>name's </span>comments
        </h1>
        <div className="bg-white flex gap-2 flex-col p-2 rounded-lg">
          <div className="flex gap-2 items-center border-b-1 p-1">
            <img src="" alt="" className="w-[30px] h-[30px] rounded-full" />
            <p>name</p>
          </div>
          <div>commant</div>
        </div>
        <div className="bg-white flex gap-2 flex-col p-2 rounded-lg">
          <div className="flex gap-2 items-center border-b-1 p-1">
            <img src="" alt="" className="w-[30px] h-[30px] rounded-full" />
            <p>name</p>
          </div>
          <div>commant</div>
        </div>
        <div className="bg-white flex gap-2 flex-col p-2 rounded-lg">
          <div className="flex gap-2 items-center border-b-1 p-1">
            <img src="" alt="" className="w-[30px] h-[30px] rounded-full" />
            <p>name</p>
          </div>
          <div>commant</div>
        </div>
        <div className="bg-white flex gap-2 flex-col p-2 rounded-lg">
          <div className="flex gap-2 items-center border-b-1 p-1">
            <img src="" alt="" className="w-[30px] h-[30px] rounded-full" />
            <p>name</p>
          </div>
          <div>commant</div>
        </div>
        <div className="bg-white flex gap-2 flex-col p-2 rounded-lg">
          <div className="flex gap-2 items-center border-b-1 p-1">
            <img src="" alt="" className="w-[30px] h-[30px] rounded-full" />
            <p>name</p>
          </div>
          <div>commant</div>
        </div>
        <div className="bg-white flex gap-2 flex-col p-2 rounded-lg">
          <div className="flex gap-2 items-center border-b-1 p-1">
            <img src="" alt="" className="w-[30px] h-[30px] rounded-full" />
            <p>name</p>
          </div>
          <div>commant</div>
        </div>
        <div className="bg-white flex gap-2 flex-col p-2 rounded-lg">
          <div className="flex gap-2 items-center border-b-1 p-1">
            <img src="" alt="" className="w-[30px] h-[30px] rounded-full" />
            <p>name</p>
          </div>
          <div>commant</div>
        </div>
      </motion.div>
    </div>
  );
}

export default CustomPopUpBox;
