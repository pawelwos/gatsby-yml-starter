import React from "react"
import JsxParser from 'react-jsx-parser'
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import  Highlight from "../components/highlight"


export default function Simple ({section}) {

  // We grap all the inline images from GraphQL and
  // we will pass them to JsxParser...

  let inlineImages = {}
  if(section.inlineImages)
  section.inlineImages.map((image, index) => {
    return inlineImages['image'+index] = getImage(image.imageLocal)
  })

  const bgimg = section.bgimgLocal

  return (
    <section className={`simple p-4 relative mb-4 ${ bgimg ? 'pt-96' : ''}`} style={{backgroundColor: section.bgcolor}}>
      { bgimg && (
        <>
        <GatsbyImage style={{"position": 'absolute', 'zIndex': 1}} className="inset-0" image={getImage(bgimg)} alt={section.bgimgAlt} />
        <div className={`absolute inset-0 z-10 bg-black bg-opacity-75`}></div>
        </>
      )}
      <div className="container mx-auto relative z-20">
        <div className={`inner py8 mx-auto ${section.textColor}`}>
            <JsxParser
              bindings={inlineImages}
              components={{Link, GatsbyImage, Highlight}}
              jsx={section.content}
            />
        </div>
      </div>
    </section>
  )
}