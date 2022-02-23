import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"


const Header = ({ siteTitle }) => {
  let data = useStaticQuery(graphql`
    query Navigation {
      allNavigationYaml {
        nodes {
          label
          url
        }
      }
    }
    `)
  return (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <div className="md:flex justify-center white space-x-4 text-xl">
        {data.allNavigationYaml.nodes.map((nav, index) => {
          return <Link key={index} className="no-underline p-4" to={nav.url}>{nav.label}</Link>
        })}
      </div>
    </div>
  </header>
)}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
