import React from 'react'
import JsxParser from 'react-jsx-parser'
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const TwoCols = ({section}) => {
  const image = getImage(section.imageLocal)
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 p-8 justify-center items-center auto-rows-auto gap-4' style={{'backgroundColor': section.bgcolor}}>
      <div className={`${section.imagePosition === 'right' ? 'order-2' : 'order-1'}`}>
        <JsxParser
          components={{Link}}
          jsx={section.content}
        />
      </div>
      <div className={`relative min-h-[400px] h-full ${section.imagePosition === 'right' ? 'order-1' : 'order-2'}`}>
        <GatsbyImage className='absolute inset-0' image={image} alt={section.imageAlt} />
      </div>
    </section>
  )
}

export default TwoCols