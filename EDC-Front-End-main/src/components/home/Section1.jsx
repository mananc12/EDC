import React from 'react'
import sampleVideo from '../../assets/sample.mp4'
import thumbnail from '../../assets/UI/thumbnail.png'
// import PlayBtn from "../assets/icons/playButton.png";
import Grid from './Grid'
const Section1 = () => {
  const VideoPlayer = () => {
    return <video src={sampleVideo} controls poster={thumbnail} className="videoSample"></video>
  }

  return (
    <>
      {/* <div className="w-full  bg-white h-[500px] flex justify-center items-center">
        <div className="relative w-[1125px] justify-center flex items-center h-[378px]">
          <div className="md:flex flex-row bg-white z-10 sm:grid justify-center items-center  ">
            <div className="w-[456px] h-[342px] shadow-md p-2 flex justify-center items-center  md:mr-10">
              <VideoPlayer className="" />
            </div>
            <div className="w-[585px] h-[240px] ">
              <div className="flex items-center font-sans font-bold text-3xl leading-12 py-2 tracking-tight text-black">
                Leaders in Entrepreneurship
              </div>
              <div className="font-sans font-normal text-base leading-8 tracking-wider text-[#919FAE]">
                <p>
                  We believe, innovation is the foundation for any entrepreneurial process. Our focus is to facilitate
                  and assist the students significantly by providing resources and appropriate mentoring to transform
                  their potential into business leaders of tomorrow.
                </p>
              </div>
              <button className="mt-5 flex items-center justify-center font-bold text-white tracking-wider  w-[184px] h-[40px] bg-blue-500 rounded-md">
                Submit your Idea
              </button>
            </div>
          </div>
          <div className="absolute z-0 bottom-0 left-1">
            <Grid />
          </div>
        </div>
      </div> 
 */}

      <div className="sm:w-[auto] sm:h-[auto]  md:p-0 p-4 md:w-full bg-white md:h-[full] flex justify-center items-center ">
        <div className="relative md:w-full justify-center flex items-center md:h-[378px]">
          <div className="md:flex flex-row bg-white z-10 sm:grid justify-center items-center  ">
            <div className=" md:w-[456px] md:h-[342px] sm:w-[auto] sm:h-[auto] shadow-md p-2 md:flex  sm:gird justify-center items-center  md:mr-10">
              <VideoPlayer className="" />
            </div>
            <div className="md:w-[585px] md:h-[240px] sm:grid sm:justify-center ">
              <div className="md:flex  md:justify-start  sm:justify-center items-center font-sans font-bold text-3xl leading-12 py-2 tracking-tight text-black">
                Leaders in Entrepreneurship
              </div>
              <div className="font-sans font-normal text-base leading-8 tracking-wider text-[#919FAE]">
                <p>
                  We believe, innovation is the foundation for any entrepreneurial process. Our focus is to facilitate
                  and assist the students significantly by providing resources and appropriate mentoring to transform
                  their potential into business leaders of tomorrow.
                </p>
              </div>
              <button className="mt-5 flex items-center justify-center font-bold text-white tracking-wider  w-[184px] h-[40px] bg-blue-500 rounded-md">
                Submit your Idea
              </button>
            </div>
          </div>
          <div className="absolute z-0 bottom-0 left-48">
            <Grid />
          </div>
        </div>
      </div>
    </>
  )
}

export default Section1
