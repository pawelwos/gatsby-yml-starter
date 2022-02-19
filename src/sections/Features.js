import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const Features = ({section}) => {

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
			{ section.features.map((feature, index) => {
				let image
				if(feature.imageLocal)
				image = getImage(feature.imageLocal)
				return (
					<div key={index} className="">
							{ image && <div className='mb-4'><GatsbyImage image={image} alt={feature.title} /></div>}
							<h2>{feature.title}</h2>
							<p>{feature.intro}</p>
							{feature.link && <p><a href={feature.link}>External Link</a></p>}
					</div>
				)
			}) }
		</div>
	)
}
export default Features