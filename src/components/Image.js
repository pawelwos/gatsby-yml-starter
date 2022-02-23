import React from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Image = ({image, alt, className = 'absolute inset-0 z-0', style, width }) => {
  console.log(image)
	const imgStyles = {
		'width': '100%',
		'height': '100%',
		'object-fit': 'cover'
	}

	return (
		<>
		{
			typeof(image) === 'string' && image.includes('http') ?  
			<img src={image} style={{...imgStyles, ...style}} className={className} width={width} />
			: 
			<GatsbyImage style={style} className={className} image={getImage(image)} width={width} alt={alt} />
		}
		</>
	)	
}
export default Image