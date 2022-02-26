import React, { useEffect, useState } from 'react'
import yaml from "js-yaml"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import Sections from '../sections/Sections'

export default function Preview() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sections, setSections] = useState([]);

	// we are loading YAML file here using AJAX function in WP

	useEffect(() => {
		if(typeof window !== 'undefined'){
			const queryString = window.location.search
			const urlParams = new URLSearchParams(queryString)

			fetch(`${process.env.GATSBY_WP_URL}/wp-admin/admin-ajax.php`,{
				method: 'POST',
				credentials: 'include',
				headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'X-WP-Nonce' : urlParams.get('_wpnonce')
				},
				body: "action=my_preview&id="+urlParams.get('id')+"&_wpnonce="+urlParams.get('_wpnonce'),
			})
      .then(res => res.text())
      .then(
        (result) => {
					if (result.includes('error')) {
						setIsLoaded(true)
						setError({'message': result})
					} else {
						setIsLoaded(true)
						const sections = yaml.load(result);
						setSections(sections)
					}
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
			
		}
	}, [])
	if (error) {
		return <h2>Error: {error.message}</h2>;
	} else if (!isLoaded) {
		return <h2>Loading...</h2>;
	} else {
		return (
			<Layout>
				<Helmet
					title="Page Preview"
				>
				</Helmet>
				{ 
					sections.map( (section, index) => {

							if( typeof Sections[section.type] === 'object') {
								return (
									React.createElement(Sections[section.type], { key: index, section, preview: true}) 
								)
							} else {
								return <p key={index}>Missing {section.type} Component </p>
							}
					})
				}
			</Layout>
		)
	}

}
