import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from '../components/Image'

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
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
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