import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"


const Features = ({section}) => {

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
			{ section.features.map((feature, index) => {

				const image = getImage(feature.imageLocal)
				return (
					<div key={index} className="">
							{ image && <p><GatsbyImage image={image} alt={feature.title} /></p>}
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