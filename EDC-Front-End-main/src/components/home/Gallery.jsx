import React from 'react'

import image1 from '../../assets/UI/image1.png'
import image2 from '../../assets/UI/image2.png'
import image3 from '../../assets/UI/image3.png'
import image4 from '../../assets/UI/image4.png'
import image5 from '../../assets/UI/image5.png'
import image6 from '../../assets/UI/image6.png'

const GalleryCard = (props) => {
  const { image } = props
  return (
    <div className="w-80 h-72 rounded-sm">
      <img src={image} style={{ width: 320, height: 288 }} alt=''></img>
    </div>
  )
}

const Gallery = () => {
  const text = 'Gallery'

  return (
    <>
      <div className="min-h-screen my-10 md:w-full sm:w-auto">
        <div className="w-full sm:w-auto">
          <div className="md:w-[1040px] w-full flex justify-start sm:justify-center mx-auto p-5 items-start">
            <h2 className="font-bold text-2xl text-black">{text}</h2>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="mx-auto max-w-5xl sm:justify-center">
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5 sm:justify-center">
                <GalleryCard image={image1} />
                <GalleryCard image={image2} />
                <GalleryCard image={image3} />
                <GalleryCard image={image4} />
                <GalleryCard image={image5} />
                <GalleryCard image={image6} />
              </div>
            </div>
            <div className="galleryBtn">
              <button className="mt-5 flex items-center justify-center font-bold text-white tracking-wider  w-[184px] h-[40px] bg-blue-500 rounded-md">
                Submit your Idea
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Gallery
