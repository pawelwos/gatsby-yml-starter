import React, { useEffect, useState } from 'react'
import yaml from "js-yaml"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from '../components/Image'

const BlogList = ({section, preview}) => {
  let data = useStaticQuery(graphql`
  query allPostsYaml {
    Posts: allPagesYaml(filter: {type: {eq: "post"}}) {
      nodes {
        databaseId
        title
        excerpt
				date
        url
        thumbnailLocal {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
  }
  `)

	// all items
	const [allItems, setAllItems] = useState([]);


	useEffect(() => {
		if(preview){

			fetch(`${process.env.GATSBY_WP_URL}/api/pages`,{
				method: 'POST',
				headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
				}
			})
			.then(res => res.text())
			.then(
				(result) => {
					if (result.includes('error')) {
					} else {
						let pages = yaml.load(result);
						pages = pages.filter(page => {
							return page.type === 'post'
						})
						setAllItems(pages)
					}
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					console.log(error)
				}
			)
			
		} else {
			setAllItems(data.Posts.nodes)
		}
	}, [])

  return (
    <div className='p-4'>
    <div dangerouslySetInnerHTML={{__html: section.intro}}></div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        { allItems.map(post => {
          let thumbnail
          if(post.thumbnailLocal)
          thumbnail = post.thumbnailLocal
          else
          thumbnail = post.thumbnail
          return (    
            <div key={post.databaseId}>
              { thumbnail && <div className="mb-4 relative pt-[50%]"><Link to={post.url}><Image width={400} image={thumbnail} alt={post.title} /></Link></div> }
              <h2 className='mb-2'><Link to={post.url}>{post.title}</Link></h2>
              <h3 className='text-gray-400 text-xs'>{post.date}</h3>
              <p dangerouslySetInnerHTML={{__html: post.excerpt}}></p>
              <p>
                <Link to={post.url}>Read more</Link>
              </p>
            </div>
          )
        
        }) }
      </div>
    </div>
  )
}

export default BlogList