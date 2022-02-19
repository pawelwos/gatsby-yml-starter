import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlogList = ({section}) => {
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
            gatsbyImageData(layout: FIXED, width: 400, placeholder: BLURRED)
          }
        }
      }
    }
  }
  `)

  return (
    <div className='p-4'>
    <div dangerouslySetInnerHTML={{__html: section.intro}}></div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        { data.Posts.nodes.map(post => {

          const thumbnail = getImage(post.thumbnailLocal)
          return (    
            <div key={post.databaseId}>
              { thumbnail && <p><Link to={post.url}><GatsbyImage width={400} image={thumbnail} alt={post.title} /></Link></p> }
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