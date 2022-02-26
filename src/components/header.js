import React, { useState, useEffect } from "react"
import yaml from "js-yaml"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"


const Header = ({ siteTitle, preview }) => {
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

	// all items
	const [allItems, setAllItems] = useState([]);


	useEffect(() => {
		if(preview){

			fetch(`${process.env.GATSBY_WP_URL}/api/navigation`,{
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
			setAllItems(data.allNavigationYaml.nodes)
		}
	}, [])

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
        {allItems.map((nav, index) => {
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
