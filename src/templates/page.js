import * as React from "react"
import { graphql } from 'gatsby' 

import Layout from "../components/layout"
import Seo from "../components/seo"

// we import all sections loadable component
// I haven't check if this lazy loading works though :D
import Sections from '../sections/Sections'

const Page = ({data}) => (
  <Layout>
    <Seo title="Home" />
    { 
      // We loop through all the sections for a given page
      // most important field is the section type
      // it compares it with the imported Sections Array
      data.Page.sections.map( (section, index) => {
          // we are checking if section exist in ../sections/Sections.js file
          // it needs to be a type of object (Loadable Component)
          if( typeof Sections[section.type] === 'object') {
            return (
              // if we have such section we create React Component for it
              // and we pass all the section data and page data to it
              React.createElement(Sections[section.type], { key: index, section, page: data.Page}) 
            )
          } else {
            // if we don't have such a section yet defined 
            // then make a note of missing section component
            // should be visible only in development I guess (TODO)
            return <p key={index}>Missing {section.type} Component </p>
          }
      })
    }
  </Layout>
)


export const query = graphql`
fragment section on SectionsYaml {
  type
  content
  bgcolor
  textColor
  imagePosition
  bgimgLocal {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
  bgimgAlt
  imageLocal {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
  imageAlt
  inlineImages {
    imageLocal {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
  }
}
query PageQuery($databaseId: Int!) {
  Page: pagesYaml(databaseId: {eq: $databaseId}) {
    databaseId
    title
    date
    thumbnail
    url
    sections {
      ...section
    }
  }
}
`;

export default Page
