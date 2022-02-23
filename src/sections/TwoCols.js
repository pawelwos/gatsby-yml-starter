import React from 'react'
import JsxParser from 'react-jsx-parser'
import { Link } from "gatsby"
import Image from '../components/Image'

const TwoCols = ({section}) => {
  let image
  if(section.imageLocal)
  image = section.imageLocal
  else
  image = section.image
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 justify-center items-center auto-rows-auto gap-4 mb-6' style={{'backgroundColor': section.bgcolor}}>
      <div className={`p-8 ${section.imagePosition === 'right' ? 'order-2' : 'order-1'} ${section.textColor}`}>
        <JsxParser
          components={{Link}}
          jsx={section.content}
        />
      </div>
      <div className={`relative min-h-[400px] h-full ${section.imagePosition === 'right' ? 'order-1' : 'order-2'}`}>
        <Image className='absolute inset-0 w-full h-full' image={image} alt={section.imageAlt} />
      </div>
    </section>
  )
}

export default TwoCols