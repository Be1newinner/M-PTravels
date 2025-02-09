import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoPlayCircleOutline } from "react-icons/io5";

export default function Journey() {
  const [isVideo, setIsVideo] = useState(false);

  function handleVideo() {
    setIsVideo(!isVideo);
  }
  return (
    <>
      <div className="bg-[#ECECF2] px-20 max-md:px-2 max-lg:px-10 max-xl:px-12 py-10  flex justify-center">
        <div className="w-full rounded-2xl h-full py-10 shadow-xl text-center bg-gray-50">
          <div className="w-full max-sm:text-2xl max-2xl:text-4xl text-5xl">
            <h4 className=" px-80 max-md:px-2 max-lg:px-8 max-xl:px-40 max-2xl:px-64 font-medium ">
              Where Your Journey Begins with Quality and Reliability
            </h4>
            <p className="text-lg max-xl:text-sm max-2xl:text-base text-gray-700 py-8 max-md:py-5 px-64 max-sm:px-2 max-lg:px-8 max-xl:px-32 max-2xl:px-40">
              Lorem ipsum dolor sit amet consectetur. Nibh vivamus quis risus
              augue odio eget donec leo phasellus. Auctor est aliquam commodo
              enim auctor libero. Cras sed sagittis id in ridiculus amet vel
              euismod. Eu nunc lacus dui natoque. Consequat aenean tristique
              accumsan dictum augue.
            </p>
          </div>
          <div className="w-full relative px-10 ">
            <img
              src="blog-banner.png"
              alt="Blog Banner"
              className="rounded-3xl max-sm:rounded-2xl"
            />
            <button
              onClick={handleVideo}
              className="absolute text-white text-8xl max-sm:text-2xl transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            >
              <IoPlayCircleOutline />
            </button>
          </div>
        </div>
      </div>

      {isVideo && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center flex-col justify-center">
          <div className="max-w-4xl bg-white px-10 py-5 rounded-xl">
            <div className="flex items-end justify-between text-3xl font-medium w-full py-4 ">
              <p>Classical Optical Glasses</p>
              <IoClose
                onClick={handleVideo}
                className="h-5 w-5 cursor-pointer"
              />
            </div>
            <video
              src="airline-ad.mp4"
              controls
              alt="airline-ad"
              className="rounded-xl"
            ></video>
          </div>
        </div>
      )}
    </>
  );
}
