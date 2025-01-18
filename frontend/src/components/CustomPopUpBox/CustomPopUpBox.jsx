import React from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
function CustomPopUpBox(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
      <div className="mt-4">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="write a commant"
            className="bg-slate-200 w-full px-2 py-3 rounded-full"
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
