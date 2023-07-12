import React from 'react'
import bannerImg from '../../assets/UI/parul4.jpg'

const BannerImg = () => {
  return (
    <div className="w-full h-70vh relative bg-fixed bg-cover bg-center">
      <img
        className="w-full object-cover md:h-700 lg:h-700 xl:h-700 2xl:h-700 sm:h-400 md:h-auto"
        src={bannerImg}
        alt="your-banner"
      />
    </div>

    // <div className="flex flex-col items-center p-0 w-1440 h-88 left-0 top-0  w-full  lg:w-1440 lg:h-528">
    //   <img
    //     className="w-full object-cover md:h-700 lg:h-700 xl:h-700 2xl:h-700 sm:h-400 md:h-auto"
    //     src={bannerImg}
    //     alt="your-banner"
    //   />
    // </div>
  )
}

export default BannerImg
