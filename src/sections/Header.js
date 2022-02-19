import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Header = ({section}) => {

  let bgimg
  if(section.bgimgLocal)
  bgimg = section.bgimgLocal

  return (
    <section className='relative bg-purple-800 white px-8 py-24 mb-6'>
      { bgimg && (
        <>
        <GatsbyImage className="absolute z-0 inset-0 w-full h-full" image={getImage(bgimg)} alt={section.title} />
        <div className={`absolute inset-0 z-10 bg-black bg-opacity-75`}></div>
        </>
      )}
      <h1 className='relative z-10 mb-0 text-center'>{section.title}</h1>
    </section>
  )
}

export default Header